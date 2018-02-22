import superagent from 'superagent';
import config from '../src/config';
import connections from '../src/connection';
import _ from 'lodash';
import AWS from 'aws-sdk';
import Fs from 'fs';
import async from 'async';

import Lab from '../app/models/lab';
import LabJournalArticle from '../app/models/lab_journal_article';
import JournalArticle from '../app/models/journal_article';

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const awsRegion = process.env.AWS_REGION;

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: awsRegion
})

function parseEntry(entry) {
  return new Promise((resolve, reject) => {
    const referenceId = entry["pii"];
    const fileName = entry["pii"] + '.mp3';
    const abstractText = entry["dc:description"];
    const title = entry["dc:title"];
    const publication = entry["prism:publicationName"];
    const keywords = entry["authkeywords"];
    const author = entry["dc:creator"];

    if(!_.isEmpty(abstractText)) {
      //we should be checking whether this article has already been parsed
      JournalArticle.findOne({reference_id: referenceId})
      .then((journalArticle) => {
        if(!journalArticle) {
          convertToMP3(abstractText)
          .then((audioStream) => {
            var s3 = new AWS.S3();

            s3.putObject({
              Bucket: `${process.env.AWS_BUCKET_NAME}/abstracts`,
              Key: fileName,
              Body: audioStream,
                ACL: 'public-read'
            }, (err, data) => {
              if(err) {
                return reject(err);
              }
              const journalArticle = new JournalArticle();

              journalArticle.title = title;
              journalArticle.reference_id = referenceId;
              journalArticle.publication = publication;
              journalArticle.author = author;
              journalArticle.filename = fileName;

              journalArticle.save()
              .then(() => {
                resolve(journalArticle);
              })
              .catch((err) => {
                reject(err);
              });
            });
          })
          .catch((err) => {
            reject(err);
          });
        } else {
          resolve(journalArticle);
        }
      })
      .catch((err) => {
        reject(err);
      });
    } else {
      reject(new Error("Abstract is Empty"));
    }
  });
}
function convertToMP3(textToConvert) {
  return new Promise((resolve, reject) => {
    let params = {
        'Text': textToConvert,
        'OutputFormat': 'mp3',
        'VoiceId': 'Kimberly'
    }
    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
          reject(err);
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
              resolve(data.AudioStream);
            } else {
              reject(new Error("AudioStream not instanceof Buffer"));
            }
        } else {
          reject(new Error("Unknown Error Converting Text to Speech"));
        }
    });
  });
}

function getAbstracts(keywords) {
  return new Promise((resolve, reject) => {
      const fields = 'pii,pubType,pub-date,prism:abstract,dc:title,dc:creator,prism:publicationName,prism:coverDate,dc:description,prism:doi,authkeywords';

      let query = ''
      _.map(keywords.split(','), (keyword) => {
        if(_.isEmpty(query)) {
          query += _.trim(keyword);
        } else {
          query += " | " + _.trim(keyword);
        }
      });

      superagent('GET', 'http://api.elsevier.com/content/search/scidir?field=' + fields + '&query=' + query + '&apiKey=58569a560bacb46a9b7dc2baaee6382f')
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
  });
}
var AbstractProcessor = {
  load: function() {
    return new Promise((resolve, reject) => {

      console.log("Start Finding Abstracts");

      Lab.find({})
      .then((labs) => {
        async.eachSeries(labs, (lab, callback) => {
          if(!_.isEmpty(lab.keywords)) {
            getAbstracts(lab.keywords)
            .then((results) => {

              const entries = results["search-results"]["entry"];

              async.eachSeries(entries, (entry, callback) => {

                parseEntry(entry)
                .then((journalArticle) => {
                  //associate journal article with lab
                  LabJournalArticle.findOne({ lab: lab, journal_article: journalArticle })
                  .then((labJournalArticle) => {
                    if(!labJournalArticle) {
                      const labJournalArticle = new LabJournalArticle();

                      labJournalArticle.lab = lab;
                      labJournalArticle.journal_article = journalArticle;

                      labJournalArticle.save()
                      .then(() => {
                        callback();
                      })
                      .catch((err) => {
                        console.log("Failed to Save to Lab: " + err);

                        callback(err);
                      });
                    } else {
                      callback()
                    }
                  })
                  .catch((err) => {
                    callback(err);
                  });
                })
                .catch((err) => {
                  console.log("Failed to Parse: " + err);

                  callback();
                })
              }, (err) => {
                if(err) {
                  reject(err);
                }

                resolve();
              });
            })
            .catch((err) => {
              reject(err);
            });
          } else {
            resolve();
          }
        }, (err) => {
          if(err) {
            reject(err);
          }

          resolve();
        });
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
}
console.log(config.mongo_url);
connections.createConnection(config.mongo_url, config.rabbit_url);

AbstractProcessor.load()
.then(() => {
  console.log("Finished");
})
.catch((err) => {
  console.log(err);
});
