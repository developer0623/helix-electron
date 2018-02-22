import _ from 'lodash';

const privacyPolicyUrl = process.env.PRIVACY_POLICY_URL;
const termsOfUseUrl = process.env.TERMS_OF_USE_URL;
const endpointUri = process.env.ALEXA_ENDPOINT_URI;

const DEFAULT_LOGO_LARGE = `${process.env.AWS_BUCKET_URL}/systems/logos/logo-large.png`;
const DEFAULT_LOGO_SMALL = `${process.env.AWS_BUCKET_URL}/systems/logos/logo-small.png`;

function generateSmallIconUrl(application) {
  if(application.small_logo) {
    return `${process.env.AWS_BUCKET_URL}${application.small_logo}`;
  }

  return DEFAULT_LOGO_SMALL;
}
function generateLargeIconUrl(application) {
  if(application.small_logo) {
    return `${process.env.AWS_BUCKET_URL}${application.large_logo}`;
  }

  return DEFAULT_LOGO_LARGE;
}
const SkillManifestBuilder = {
  buildJSON: (application, repositories) => {
    return new Promise((resolve, reject) => {
      console.log("Building Skill Manifest");

      const results = {};

      const examplePhrases = application.example_phrases;
      const keywords = application.keywords;

      const locales = {};
      const languages = _.find(application.languages, { platform: "Amazon" });

      if(!languages) {
        console.log("No Languages Found");

        return reject(new Error("No Languages Found"));
      }
      if(_.isEmpty(languages.enabled_languages)) { return reject(new Error("No Languages Found")); }

      _.each(languages.enabled_languages, (enabled_language) => {
        locales[enabled_language.locale] = {
          "summary": application.summary,
          "examplePhrases": examplePhrases,
          "keywords": keywords,
          "smallIconUri": generateSmallIconUrl(application),
          "largeIconUri": generateLargeIconUrl(application),
          "name": application.name,
          "description": application.description
        }
      });

      const publishingInformation = {
        "locales": locales,
        "isAvailableWorldwide": false,
        "testingInstructions": application.testing_instructions,
        "category": application.category,
        "distributionCountries":[
          "US"
        ],
        "distribution_mode": "PRIVATE"
      };
      const apis = {
        "custom": {
            "endpoint": {
                "sslCertificateType": "Wildcard",
                "uri": application.endpoint || endpointUri
            },
            "interfaces": [
                {
                    "type": "RENDER_TEMPLATE"
                },
                {
                    "type": "VIDEO_APP"
                }
            ]
        }
      };
      const manifestVersion = "1.0";
      const permissions = [];
      const privacyAndCompliance = {
        "allowsPurchases": false,
        "usesPersonalInfo": false,
        "isChildDirected": false,
        "isExportCompliant": true,
        "containsAds": false,
        "locales": {
          "en-US": {
            "privacyPolicyUrl": privacyPolicyUrl,
            "termsOfUseUrl": termsOfUseUrl
          }
        }
      };
      const events = {};

      results["publishingInformation"] = publishingInformation;
      results["apis"] = apis;
      results["manifestVersion"] = manifestVersion,
      results["permissions"] = permissions;
      results["privacyAndCompliance"] = privacyAndCompliance;
      //results["events"] = events;

      resolve(results);
    });
  }
}

module.exports = SkillManifestBuilder;
