import _ from 'lodash';

const ENTITY_TYPE = "RECIPE";

class RecipeFactory {
  static create() {
    const recipe = {
      name: '',
      type: ENTITY_TYPE,
      say_as: '',
      display_as: '',
      tag: '',
      tags: [],
      synonym: '',
      synonyms: [],
      attributes: {
        ingredients: [{
          name: '',
          say_as: '',
          display_as: ''
        }],
        instructions: ''
      }
    };

    return recipe;
  }
  static createIngredient() {
    const ingredient = {
      name: '',
      say_as: '',
      display_as: ''
    };

    return ingredient;
  }
  static deepCopyAttributes(attributes) {
    const newAttributes = {
      instructions: '',
      ingredients: []
    };
    newAttributes.instructions = attributes.instructions;
    _.each(attributes.ingredients, (ingredient) => {
      newAttributes.ingredients.push(Object.assign({}, ingredient));
    });

    return newAttributes;
  }
  static emptyStateCopy() {
    return {
      primaryText: "Data Sets allow you to organization your companies information into groups that are easily searchable by researchers.",
      secondaryText: "You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items",
      addButtonText: "Add Recipe"
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

export default RecipeFactory;
