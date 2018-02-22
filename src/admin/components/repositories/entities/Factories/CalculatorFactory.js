import _ from 'lodash';

const ENTITY_TYPE = "CALCULATOR";

class CalculatorFactory {
  static create() {
    const calculation = {
      name: '',
      type: ENTITY_TYPE,
      tags: [],
      synonyms: [],
      attributes: {
        instructions: '',
        input_variables: [{
          name: ''
        }],
        steps: [{
          step_type: '',
          operand_type: ''
        }]
      }
    };

    return calculation;
  }
  static deepCopyAttributes(attributes) {
    const newAttributes = Object.assign({}, attributes);

    newAttributes.input_variables = [];
    newAttributes.steps = [];

    _.each(attributes.input_variables, (input_variable) => {
      newAttributes.input_variables.push(Object.assign({}, input_variable));
    });
    _.each(attributes.steps, (step) => {
      newAttributes.steps.push(Object.assign({}, step));
    });

    return newAttributes;
  }
  static emptyStateCopy() {
    return {
      primaryText: "Data Sets allow you to organization your companies information into groups that are easily searchable by researchers.",
      secondaryText: "You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items",
      addButtonText: "Add Calculator"
    };
  }
}

export default CalculatorFactory;
