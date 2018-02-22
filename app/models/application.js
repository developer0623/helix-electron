import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const AmazonDeploymentAttributesSchema = new Schema({
  needs_private_distribution: {
    type: Boolean,
    required: true,
    default: 'false'
  },
  needs_build: {
    type: Boolean,
    required: true,
    default: 'false'
  },
  needs_certification: {
    type: Boolean,
    required: true,
    default: 'false'
  },
  last_build_date: {
    type: Date,
  },
  last_certification_date: {
    type: Date,
  },
  last_build_status: {
    type: String
  },
  locked: {
    type: Boolean,
    required: true,
    default: 'false'
  }
}, {_id: false});

const ApplicationSchema = new Schema({
  external_reference_id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  application_type: {
    type: String,
    required: true
  },
  invocation_name: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  small_logo: {
    type: String
  },
  large_logo: {
    type: String
  },
  keywords: [String],
  example_phrases: [String],
  testing_instructions: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  sub_category: {
    type: String
  },
  platform_amazon: {
    type: Boolean,
    required: true,
    default: true
  },
  platform_google: {
    type: Boolean,
    required: true,
    default: false
  },
  alexa_directives: {
    audio_player_directives: {
      type: Boolean,
      required: true,
      default: true
    },
    video_app_directives: {
      type: Boolean,
      required: true,
      default: true
    },
    render_template_directives: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  languages: [{
    platform: {
      type: String,
      required: true
    },
    enabled_languages: [{
      locale: {
        type: String,
        required: true
      }
    }]
  }],
  endpoint: {
    type: String
  },
  distribution: {
    type: String,
    required: true,
    default: "all_countries"
  },
  distribution_mode: {
    type: String,
    required: true,
    default: "PUBLIC"
  },
  privacy_policy_url: {
    type: String
  },
  terms_of_service_url: {
    type: String
  },
  access_control: {
    type: String,
    required: true,
    default: 'all_countries'
  },
  default_launch_prompt: {
    type: String,
    required: true,
    default: 'What can I help you with?'
  },
  default_launch_reprompt: {
    type: String,
    required: false,
  },
  default_welcome_background: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: 'true'
  },
  owner_type: {
    type: String,
    required: true,
    default: 'Company'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  amazon_deployment_attributes: {
    required: true,
    default: AmazonDeploymentAttributesSchema,
    type: AmazonDeploymentAttributesSchema
  }
}, {
  timestamps: true,
});

ApplicationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Application', ApplicationSchema);
