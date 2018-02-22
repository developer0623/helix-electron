import Entity from '../app/models/entity';
import * as entityTypes from '../app/models/types/entityTypes';

const RecipeFactory = {
  createRecipe: (solution, company, repository) => {
    const entity = new Entity();

    entity.name = solution.recipe_name;
    entity.type = entityTypes.RECIPE;
    entity.attributes = {
      ingredients: solution.ingredients,
      instructions: solution.instructions
    }
    entity.owner = company;
    entity.owner_type = 'Company';
    entity.repository = repository;

    return entity.save();
  }
}

module.exports = RecipeFactory;
