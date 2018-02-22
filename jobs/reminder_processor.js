import User from '../app/models/user';
import Reminder from '../app/models/reminder';
import TwillioService from '../services/twillio.service';
import _ from 'lodash';

var ReminderProcessor = {
  sendReminders: function() {
    return new Promise((resolve, reject) => {
      Reminder.find({ delivered: false })
      .populate('user')
      .then((reminders) => {
        var count = reminders.length;
        if(count == 0) {
          resolve();
        }
        _.each(reminders, (reminder) => {
          TwillioService.SendSMS('+1' + reminder.user.mobile_number, reminder.reminder_copy)
          .then(() => {
            reminder.delivered = true;
            reminder.delivered_at = new Date();

            reminder.save()
            .then(() => {
              count -= 1;
              if(count == 0) {
                resolve();
              }
            })
            .catch((err) => {
              console.log("Issue Saving Reminder: " + err);
              count -= 1;
              if(count == 0) {
                resolve();
              }
            });
          })
          .catch((err) => {
            console.log("Issue Sending Reminder: " + err);
            count -= 1;
            if(count == 0) {
              resolve();
            }
          });
        })
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = ReminderProcessor;
