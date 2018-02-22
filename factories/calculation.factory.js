import Entity from '../app/models/entity';

const CalculationFactory = {
  createMassMolarityCalculation: (user) => {
    return new Promise((resolve, reject) => {
      const calculation = new Calculation();

      calculation.calculation_name = "Volume given Mass and Concentration";
      calculation.input_variables = [{
        name: 'compoundName'
      }, {
        name: 'mass'
      }, {
        name: 'concentration'
      }];
      calculation.steps = [{
        step_type: 'function',
        input_variable: 'compoundName',
        function: 'Molecular Weight'
      }, {
        step_type: 'operation',
        input_variable: 'concentration',
        operation: 'Multiply',
        operand_type: 'variable',
        operand: 'Result 1'
      }, {
        step_type: 'operation',
        input_variable: 'mass',
        operation: 'Divide',
        operand_type: 'variable',
        operand: 'Result 2'
      }, {
        step_type: 'function',
        input_variable: 'Result 3',
        function: 'Round'
      }];
      calculation.user = user;
      calculation.result_units = 'liters';

      calculation.save()
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err);
      })
    });
  },
  createMassMolarityCalculationWithMolarityAndConcentration: (user) => {
    return new Promise((resolve, reject) => {
      const calculation = new Calculation();

      calculation.user = user;
      calculation.calculation_name = "Mass given Volume and Concentration";
      calculation.input_variables = [{
        name: 'compoundName'
      }, {
        name: 'volume'
      }, {
        name: 'concentration'
      }];
      calculation.steps = [{
        step_type: 'function',
        input_variable: 'compoundName',
        function: 'Molecular Weight'
      }, {
        step_type: 'operation',
        input_variable: 'Result 1',
        operation: 'Multiply',
        operand_type: 'variable',
        operand: 'volume'
      }, {
        step_type: 'operation',
        input_variable: 'Result 2',
        operation: 'Multiply',
        operand_type: 'variable',
        operand: 'concentration'
      }, {
        step_type: 'function',
        input_variable: 'Result 3',
        function: 'Round'
      }];
      calculation.result_units = 'grams';

      calculation.save()
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err);
      })
    });
  },
  createMassMolarityCalculationWithMassAndVolume: (user) => {
    return new Promise((resolve, reject) => {
      const calculation = new Calculation();

      calculation.calculation_name = "Concentration given Mass and Volume";
      calculation.input_variables = [{
        name: 'compoundName'
      }, {
        name: 'mass'
      }, {
        name: 'volume'
      }];
      calculation.steps = [{
        step_type: 'function',
        input_variable: 'compoundName',
        function: 'Molecular Weight'
      }, {
        step_type: 'operation',
        input_variable: 'Result 1',
        operation: 'Multiply',
        operand_type: 'variable',
        operand: 'volume'
      }, {
        step_type: 'operation',
        input_variable: 'mass',
        operation: 'Divide',
        operand_type: 'variable',
        operand: 'Result 2'
      }, {
        step_type: 'function',
        input_variable: 'Result 3',
        function: 'Round'
      }];
      calculation.result_units = 'mol/L';
      calculation.user = user;
      calculation.save()
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = CalculationFactory;
