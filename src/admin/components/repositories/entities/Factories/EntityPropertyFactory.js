import _ from 'lodash';

const ENTITY_TYPE = "ENTITYPROPERTY";

class EntityPropertyFactory {
  static create() {
    const entity_property = {
      name: '',
      type: ENTITY_TYPE,
      tags: [],
      synonyms: []
    };

    return entity_property;
  }
  static deepCopyAttributes(attributes) {
    const newAttributes = Object.assign({}, attributes);

    return newAttributes;
  }
  static emptyStateCopy() {
    return {
      primaryText: "Data Sets allow you to organization your companies information into groups that are easily searchable by researchers.",
      secondaryText: "You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items",
      addButtonText: "Add Property"
    };
  }
}

export default EntityPropertyFactory;
