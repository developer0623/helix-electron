import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import RadioButtonList from '../../common/RadioButtonList';
import CheckboxInput from '../../common/CheckboxInput';
import ExamplePhraseTextInput from './ExamplePhraseTextInput';

import _ from 'lodash';
import ReactS3Uploader from 'react-s3-uploader';

const AdvancedSettingsForm = ({application, onSave, onChange, onChangeAlexaDirective, onChangeExamplePhrase, loading, saving, errors}) => {
  const categoryTypes = [{
    value: 'Organizers',
    text: 'Organizers'
  }, {
    value: 'ALARMS_AND_CLOCKS',
    text: 'Alarms and Clocks'
  }, {
    value: 'ASTROLOGY',
    text: 'Astrology'
  }, {
    value: 'BUSINESS_AND_FINANCE',
    text: 'Business and Finance'
  }, {
    value: 'CALCULATORS',
    text: 'Calculators'
  }, {
    value: 'CALENDARS_AND_REMINDERS',
    text: 'Calendars and Reminders'
  }, {
    value: 'COMMUNICATION',
    text: 'Communication'
  }, {
    value: 'CONNECTED_CAR',
    text: 'Connected Car'
  }, {
    value: 'COOKING_AND_RECIPE',
    text: 'Cooking and Recipe'
  }, {
    value: 'CURRENCY_GUIDES_AND_CONVERTERS',
    text: 'Currency Guides and Converters'
  }, {
    value: 'DATING',
    text: 'Dating'
  }, {
    value: 'Delivery and Takeout',
    text: 'Delivery and Takeout'
  }, {
    value: 'DEVICE_TRACKING',
    text: 'Device Tracking'
  }, {
    value: 'EDUCATION_AND_REFERENCE',
    text: 'Education and Reference'
  }, {
    value: 'EVENT_FINDERS',
    text: 'Event Finders'
  }, {
    value: 'EXERCISE_AND_WORKOUT',
    text: 'Exercise and Workout'
  }, {
    value: 'FASHION_AND_STYLE',
    text: 'Fashion and Style'
  }, {
    value: 'FLIGHT_FINDERS',
    text: 'Flight FLIGHT_FINDERS'
  }, {
    value: 'FRIENDS_AND_FAMILY',
    text: 'Friends and Family'
  }, {
    value: 'GAME_INFO_AND_ACCESSORY',
    text: 'Game Info and Accessory'
  }, {
    value: 'GAMES',
    text: 'Games'
  }, {
    value: 'HEALTH_AND_FITNESS',
    text: 'Health and Fitness'
  }, {
    value: 'HOTEL_FINDERS',
    text: 'Hotel Finders'
  }, {
    value: 'KNOWLEDGE_AND_TRIVIA',
    text: 'Knowledge and Trivia'
  }, {
    value: 'MOVIE_AND_TV_KNOWLEDGE_AND_TRIVIA',
    text: 'Movie and TV Knowledge and Trivia'
  }, {
    value: 'MOVIE_INFO_AND_REVIEWS',
    text: 'Movie Info and Reviews'
  }, {
    value: 'MOVIE_SHOWTIMES',
    text: 'Movie Showtimes'
  }, {
    value: 'MUSIC_AND_AUDIO_ACCESSORIES',
    text: 'Music and Audio Accessories'
  }, {
    value: 'MUSIC_AND_AUDIO_KNOWLEDGE_AND_TRIVIA',
    text: 'Music and Audio Knowledge and Trivia'
  }, {
    value: 'MUSIC_INFO_REVIEWS_AND_RECOGNITION_SERVICE',
    text: 'Music Info Reviews and Recognition Service'
  }, {
    value: 'NAVIGATION_AND_TRIP_PLANNER',
    text: 'Navigation and Trip Planner'
  }, {
    value: 'NEWS',
    text: 'News'
  }, {
    value: 'NOVELTY',
    text: 'Novelty'
  }, {
    value: 'ORGANIZERS_AND_ASSISTANTS',
    text: 'Organizers and Assistants'
  }, {
    value: 'PETS_AND_ANIMAL',
    text: 'Pets and Animal'
  }, {
    value: 'PODCAST',
    text: 'Podcast'
  }, {
    value: 'PUBLIC_TRANSPORTATION',
    text: 'Public Transportation'
  }, {
    value: 'RELIGION_AND_SPIRITUALITY',
    text: 'Religion and Spirituality'
  }, {
    value: 'RESTAURANT_BOOKING_INFO_AND_REVIEW',
    text: 'Restaurant Booking Info and Review'
  }, {
    value: 'SCHOOLS',
    text: 'Schools'
  }, {
    value: 'SCORE_KEEPING',
    text: 'Score Keeping'
  }, {
    value: 'SELF_IMPROVEMENT',
    text: 'Self Improvement'
  }, {
    value: 'SHOPPING',
    text: 'Shopping'
  }, {
    value: 'SMART_HOME',
    text: 'Smart Home'
  }, {
    value: 'SOCIAL_NETWORKING',
    text: 'Social Networking'
  }, {
    value: 'SPORTS_GAMES',
    text: 'Sports Games'
  }, {
    value: 'SPORTS_NEWS',
    text: 'Sports News'
  }, {
    value: 'STREAMING_SERVICE',
    text: 'Streaming Service'
  }, {
    value: 'TAXI_AND_RIDESHARING',
    text: 'Taxi and Ridesharing'
  }, {
    value: 'TO_DO_LISTS_AND_NOTES',
    text: 'To Do Lists and Notes'
  }, {
    value: 'TRANSLATORS',
    text: 'Translators'
  }, {
    value: 'TV_GUIDES',
    text: 'TV Guides'
  }, {
    value: 'UNIT_CONVERTERS',
    text: 'Unit Converters'
  }, {
    value: 'WEATHER',
    text: 'Weather'
  }, {
    value: 'WINE_AND_BEVERAGE',
    text: 'Wine and Beverage'
  }, {
    value: 'ZIP_CODE_LOOKUP',
    text: 'Zip Code Lookup'
  }];
  const distributionOptions = [{
    text: "Distribute my virtual assistant in all counties and regions where Amazon distributes skills",
    value: "all_countries"
  }, {
    text: "Distribute my virtual assistant only in the selected counties or regions specified below.",
    value: "select_countries"
  }];
  const example_phrases = [];

  _.each(application.example_phrases, (example_phrase) => {
    example_phrases.push(example_phrase);
  });
  while(example_phrases.length < 3) {
    example_phrases.push("");
  }

  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <h5>External Application Ids</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <p>Amazon: {application.external_reference_id}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
          <SelectInput
            name="category"
            label="Category"
            value={application.category}
            onChange={onChange}
            error={errors.category}
            options={categoryTypes} />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Directives (Alexa)</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="field">
                <CheckboxInput
                  name="audio_player_directives"
                  label="Audio Player Directives"
                  value={application.alexa_directives.audio_player_directives}
                  onChange={onChangeAlexaDirective}
                  error={errors.alexa_directives}
                />
                <CheckboxInput
                  name="video_app_directives"
                  label="Video App Directives"
                  value={application.alexa_directives.video_app_directives}
                  onChange={onChangeAlexaDirective}
                  error={errors.alexa_directives}
                />
                <CheckboxInput
                  name="render_template_directives"
                  label="Render Template Directives"
                  value={application.alexa_directives.render_template_directives}
                  onChange={onChangeAlexaDirective}
                  error={errors.alexa_directives}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Example Phrases</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
          {example_phrases.map((example_phrase, index) =>
            <ExamplePhraseTextInput
              key={index}
              index={index}
              value={example_phrase}
              onChange={onChangeExamplePhrase}
              error={errors.example_phrase} />
          )}
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextArea
              name="testing_instructions"
              label="Testing Instructions"
              value={application.testing_instructions}
              onChange={onChange}
              error={errors.testing_instructions}
              placeholder="Enter testing instructions"
              width="12"
              rows="5"
            />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              A short summary of your virtual assistant that will be display in the Alexa App or Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Distribution</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <RadioButtonList
              name="distribution"
              options={distributionOptions}
              onChange={onChange}
              selectedValue={application.distribution}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Privacy</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="privacy_policy_url"
              label="Privacy URL"
              value={application.privacy_policy_url}
              placeholder="Enter Privacy Policy URL"
              onChange={onChange}
              error={errors.privacy_url} />
            <TextInput
              name="terms_of_service_url"
              label="Terms of Service URL"
              value={application.terms_of_service_url}
              placeholder="Enter Terms of Service URL"
              onChange={onChange}
              error={errors.terms_of_service_url} />
          </div>
          <div className="col-md-3">
            <div className="help-box">
              The name will be displayed in the Amazon/Alexa store and Google Home store.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h5>Endpoint Urls</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <TextInput
              name="endpoint"
              label="Amazon Endpoint"
              value={application.endpoint}
              onChange={onChange}
              error={errors.endpoint}
              placeholder="Endpoint to Helix Services for Amazon"
              width="12"
              rows="5"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <input
              type="submit"
              disabled={saving}
              value={saving ? 'Saving...' : 'Save'}
              className="btn btn-primary"
              onClick={onSave} />
          </div>
        </div>
      </div>
    </form>
  );
};

AdvancedSettingsForm.propTypes = {
  application: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onChangeAlexaDirective: React.PropTypes.func.isRequired,
  onChangeExamplePhrase: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default AdvancedSettingsForm;
