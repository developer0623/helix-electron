import _ from 'lodash';

const ENTITY_TYPE = "PROTOCOL";

class ProtocolFactory {
  static create() {
    const entity = {
      name: '',
      type: ENTITY_TYPE,
      say_as: '',
      display_as: '',
      tags: [],
      synonyms: [],
      attributes: {
        steps: [{
          name: '',
          say_as: '',
          display_as: '',
          can_remind: false,
          reminder_minutes: '',
          reminder_copy: '',
          step_type: 'Action'
        }]
      }
    };

    return entity;
  }
  static createStep() {
    const step = {
      name: '',
      say_as: '',
      display_as: '',
      can_remind: false,
      reminder_minutes: '',
      reminder_copy: '',
      step_type: 'Action'
    };

    return step;
  }
  static deepCopyAttributes(attributes) {
    const newAttributes = {
      steps: []
    };
    _.each(attributes.steps, (step) => {
      newAttributes.steps.push(Object.assign({}, step));
    });

    return newAttributes;
  }
  static emptyStateCopy() {
    return {
      primaryText: "Data Sets allow you to organization your companies information into groups that are easily searchable by researchers.",
      secondaryText: "You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items",
      addButtonText: "Add Protocol"
    };
  }
  static validateForm(entity) {
    const errors = {};
    let formIsValid = true;

    if(entity.name.length < 3) {
      errors.name = 'Name is required and must be at least 3 characters.';
      formIsValid = false;
    }

    return {
      errors,
      formIsValid
    };
  }
}

export default ProtocolFactory;
