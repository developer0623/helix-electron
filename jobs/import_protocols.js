import superagent from 'superagent';
import Parser from 'markdown-parser';
import MarkdownIt from 'markdown-it';
import _ from 'lodash';

const md = new MarkdownIt();

function getProtocols() {
  return new Promise((resolve, reject) => {
      superagent('GET', 'https://protocols.scienceexchange.com/api/v1/protocols')
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
  });
}

console.log("Getting Protocols from Science Exchange");

var parser = new Parser();

getProtocols()
.then((protocols) => {
  console.log("We got protocols!")
  console.log(protocols.length + " protocols found");
  var protocol = protocols[124];
  console.log(protocol.id);
  var tokens = md.parse(protocol.description);
  var started = false;
  var steps = false;

  _.each(tokens, (token) => {
    if(started  && steps) {
      console.log(token.type)
    }
      if(started  && steps && token.type=='inline') {
        console.log(token.content)
        console.log('**************')
      }
      if(!started && token.content == 'Procedure') {
        started = true
      }
      if(!steps && token.type == 'paragraph_open') {
        //started = false;
        steps = true;
      }
      if(steps && token.type == 'paragraph_close') {
        //started = false;
        steps = false;
      }
      if(started && token.type == 'heading_open') {
        started = false
      }

  })
})
.catch((err) => {
  console.log("Failed Getting Protocols from Science Exchange: " + err);
})
