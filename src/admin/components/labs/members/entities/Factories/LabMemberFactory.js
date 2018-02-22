import _ from 'lodash';

const ENTITY_TYPE = "LABMEMBER";

class LabMemberFactory {
  static create() {
    const entity = {
      name: '',
      type: ENTITY_TYPE,
      tags: [],
      synonyms: [],
      attributes: {
        first_name: '',
        last_name: '',
        email_address: '',
        mobile_number: ''
      }
    };

    return entity;
  }
  static deepCopyAttributes(attributes) {
    const newAttributes = Object.assign({}, attributes);

    return newAttributes;
  }
  static emptyStateCopy() {
    return {
      primaryText: "Data Sets allow you to organization your companies information into groups that are easily searchable by researchers.",
      secondaryText: "You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items",
      addButtonText: "Add Lab Member"
    };
  }
}

export default LabMemberFactory;
