import Link from '../app/models/link';
import MarketingLead from '../app/models/marketing_lead';
import User from '../app/models/user';
import postmark from 'postmark';
import config from '../src/config';

const EmailProcessor = {
  sendWelcomeEmail: function(user_id) {
    return new Promise((resolve, reject) => {
      User.findById(user_id)
      .then((user) => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
    });
  },
  sendBetaSignupEmail: function(marketingLeadId) {
    const client = new postmark.Client(process.env.POSTMARK_API_TOKEN);
    const templateId = process.env.EMAIL_WELCOME_TEMPLATE_ID;

    return new Promise((resolve, reject) => {
      MarketingLead.findById(marketingLeadId)
      .then((marketingLead) => {
        client.sendEmailWithTemplate({
            "From": "hello@askhelix.io",
            "TemplateId": templateId,
            "To": marketingLead.email_address,
            "TemplateModel": {}
        }, (error, result) => {
            if(error) {
                console.error("Unable to send via postmark: " + error.message);
                return reject(error);
            }
            console.info("Sent to postmark for delivery");

            resolve();
        });
      })
      .catch((err) => {
        reject(err);
      })
    });
  },
  sendResetPasswordEmail: (linkId) => {
    const client = new postmark.Client(process.env.POSTMARK_API_TOKEN);
    const templateId = process.env.RESET_PASSWORD_TEMPLATE_ID;

    return new Promise((resolve, reject) => {
      Link.findById(linkId)
      .populate('user')
      .then((link) => {
        if(!link && !link.user) { return reject(new Error("Link and User must be specifified to send a Reset Password Email")); }

        console.log(JSON.stringify(link));

        client.sendEmailWithTemplate({
            "From": "no-reply@askhelix.io",
            "TemplateId": templateId,
            "To": link.user.email_address,
            "TemplateModel": {
            	"product_name": "HelixAI",
            	"product_url": "http://www.helix.ai",
            	"name": `${link.user.first_name}`,
            	"action_url": `${link.url}`,
            	"company_name": "HelixAI, LLC",
            	"company_address": "824 Weir St, Charleston, SC 29412",
            	"support_url": "http://www.helix.ai"
            }
        }, (error, result) => {
          if(error) {
            console.error("Unable to send via postmark: " + error.message);

            return reject(error);
          }
          console.info("Sent to postmark for delivery");

          resolve();
        });
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = EmailProcessor;
