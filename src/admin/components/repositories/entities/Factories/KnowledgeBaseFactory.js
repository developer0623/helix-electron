import _ from 'lodash';

const ENTITY_TYPE = "KNOWLEDGEBASE";

class KnowlegeBaseFactory {
  static create() {
    const entity = {
      name: '',
      type: ENTITY_TYPE,
      say_as: '',
      display_as: '',
      tag: '',
      tags: [],
      synonym: '',
      synonyms: [],
      attributes: {
        properties: []
      }
    };

    return entity;
  }
  static deepCopyAttributes(attributes) {
    const newAttributes = {
      properties: []
    };
    if(attributes  && attributes.properties) {
      _.each(attributes.properties, (property) => {
        newAttributes.properties.push(Object.assign({}, property));
      });
    }

    return newAttributes;
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
  static emptyStateCopy() {
    return {
      primaryText: "Data Sets allow you to organization your companies information into groups that are easily searchable by researchers.",
      secondaryText: "You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items",
      addButtonText: "Add Knowledge Base"
    };
  }
}

export default KnowlegeBaseFactory;
