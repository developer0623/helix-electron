import AWS from 'aws-sdk';
import Lab from '../../app/models/lab';

const SESSION_NAME = 'HelixAI-IAM-ROLE-SESSION';

const accessKeyId =  process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const awsRegion = process.env.AWS_REGION;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  awsRegion: awsRegion
});

function authenticate(roleArn) {
  return new Promise((resolve, reject) => {
    const sts = new AWS.STS();
    const assumedRoleObject = sts.assumeRole({
       RoleArn: roleArn,
       RoleSessionName: SESSION_NAME,
     }, (err, data) => {
      if (err) {
        console.log("Failed to Assume Role");

        reject(err);
      } else {
        const credentials = data['Credentials'];
        const alexaForBusiness = new AWS.AlexaForBusiness({
          accessKeyId: credentials.AccessKeyId,
          secretAccessKey: credentials.SecretAccessKey,
          sessionToken: credentials.SessionToken
        });

        resolve(alexaForBusiness);
      }
    });
  });
}
const AlexaForBusinessService = {
  createRoomProfile: (company, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Creating Room Profile for ${company._id}`);

      var profileParams = {
        Address: company.room_profile_address, /* required */
        DistanceUnit: "IMPERIAL",
        ProfileName: company.room_profile_name, /* required */
        TemperatureUnit: "CELSIUS", /* required */
        Timezone: company.room_profile_timezone, //'America/New_York', /* required */
        WakeWord: "ALEXA" /* required */
        // ClientRequestToken: 'STRING_VALUE',
        // MaxVolumeLimit: 0,
        // PSTNEnabled: true || false,
        // SetupModeDisabled: true || false
      };

      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.createProfile(profileParams, function(err, data) {
          if (err) {
            reject(err);
          } else {
            const profileArn = data['ProfileArn'];

            company.room_profile_arn = profileArn;
            company.save()
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            })
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  updateRoomProfile: (company, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Updating Room Profile for ${company._id}`);

      var profileParams = {
        ProfileArn: company.room_profile_arn,
        Address: company.room_profile_address, /* required */
        DistanceUnit: "IMPERIAL",
        ProfileName: company.room_profile_name, /* required */
        TemperatureUnit: "CELSIUS", /* required */
        Timezone: company.room_profile_timezone, //'America/New_York', /* required */
        WakeWord: "ALEXA" /* required */
        // ClientRequestToken: 'STRING_VALUE',
        // MaxVolumeLimit: 0,
        // PSTNEnabled: true || false,
        // SetupModeDisabled: true || false
      };

      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.updateProfile(profileParams, function(err, data) {
          if (err) {
            reject(err);
          } else {
            company.save()
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            })
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  deleteRoomProfile: (company, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Deleting Rome Profile ${company._id}`);

      var profileParams = {
        ProfileArn: company.room_profile_arn
      };

      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.deleteProfile(profileParams, function(err, data) {
          if (err) {
            reject(err);
          } else {
            company.room_profile_arn = profileArn;
            company.save()
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            })
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  createRoom: (lab, profileArn, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Creating Room ${lab._id}`);

      const params = {
        RoomName: lab.lab_name,
        ProfileArn: profileArn
      };
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.createRoom(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const roomArn = data['RoomArn'];

            lab.aws_room_arn = roomArn;
            lab.save()
            .then(() => {
              resolve(lab);
            })
            .catch((err) => {
              reject(err);
            })
          }
        });
      })
      .catch((err) => {
        reject(err);
      })
    });
  },
  updateRoom: (lab, profileArn, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Updating Room ${lab._id}`);

      if(!lab.aws_room_arn) { reject(new Error(`Lab ${lab._id} does not have an AWS Room ARN`)); }

      const params = {
        RoomName: lab.lab_name,
        RoomArn: lab.aws_room_arn
      };
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.updateRoom(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            lab.save()
            .then(() => {
              resolve(lab);
            })
            .catch((err) => {
              reject(err);
            });
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  deleteRoom: (lab, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Deleting Room ${lab._id}`);

      const params = {
        RoomArn: lab.aws_room_arn
      };
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.deleteRoom(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            lab.save()
            .then(() => {
              resolve(lab);
            })
            .catch((err) => {
              reject(err);
            });
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  createSkillGroup: (company, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Creating Skill Group ${company._id}`);

      const params = {
        SkillGroupName: company.skill_group_name,
        ClientRequestToken: company.skill_group_description,
      };
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.createSkillGroup(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            company.save()
            .then(() => {
              resolve(lab);
            })
            .catch((err) => {
              reject(err);
            });
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  updateSkillGroup: (company, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Updating Skill Group ${company._id}`);

      const params = {
        SkillGroupArn: company.skill_group_arn,
        SkillGroupName: company.skill_group_name,
        ClientRequestToken: company.skill_group_description,
      };
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.updateSkillGroup(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            company.save()
            .then(() => {
              resolve(lab);
            })
            .catch((err) => {
              reject(err);
            });
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  deleteSkillGroup: (company, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Deleting Skill Group ${company._id}`);

      const params = {
        SkillGroupArn: company.skill_group_arn,
      };
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.deleteSkillGroup(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            company.save()
            .then(() => {
              resolve(lab);
            })
            .catch((err) => {
              reject(err);
            });
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  associateSkillGroupWithRoom: (company, lab, roleArn) => {

  },
  disassociateSkillGroupFromRoom: (company, lab, roleArn) => {

  },
  associateDeviceWithRoom: (lab, roleArn) => {

  },
  disassociateDeviceFromRoom: (lab, roleArn) => {

  },
  createUser: (user, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Create User ${user._id}`);

      const params = {
         "Email": user.email_address,
         "FirstName": user.first_name,
         "LastName": user.last_name,
         "UserId": `${user._id}`
      }
      console.log(params);
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.createUser(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.UserArn);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  updateUser: (user, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Updating User ${user._id}`);

      const params = {
         "Email": user.email_address,
         "FirstName": user.first_name,
         "LastName": user.last_name,
         "UserId": `${user._id}`
      }
      console.log(params);
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.createUser(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.UserArn);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  deleteUser: (user, roleArn) => {
    return new Promise((resolve, reject) => {
      console.log(`Delete User ${user._id}`);

      if(!user.amazon_user_arn) { reject(new Error(`Failed Deleting Organization User: No User Arn from ${user._id}`)); }

      const params = {
         //"EnrollmentId": "string",
         "UserArn": user.amazon_user_arn
      }
      authenticate(roleArn)
      .then((alexaForBusiness) => {
        alexaForBusiness.deleteUser(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
  sendInvitation: (lab, roleArn) => {

  },
  revokeInvitation: (lab, roleArn) => {

  }
}

module.exports = AlexaForBusinessService;
