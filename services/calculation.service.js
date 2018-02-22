import async from 'async';
import FunctionService from './function.service';
import OperationService from './operation.service';

const CalculationService = {
  ParseInputVariables: (calculation, req) => {
    return new Promise((resolve, reject) => {
      const inputValues = [];
      async.eachSeries(calculation.input_variables, (inputVariable, callback) => {
        const value = req.slot(inputVariable.name);

        inputValues[inputVariable.name] = value;
        callback();
      }, (err) => {
        if(err) {
          reject(err);
        }

        resolve(inputValues);
      });
    });
  },
  ParseSteps: (calculation, inputValues) => {
    return new Promise((resolve, reject) => {
      const results = [];

      async.eachSeries(calculation.steps, (step, callback) => {
        const operand1 = inputValues[step.input_variable];

        if(step.step_type == 'function') {
          FunctionService.Execute(step.function, operand1)
          .then((result) => {
            results.push(result);
            inputValues["Result " + results.length] = result;

            callback();
          })
          .catch((err) => {
            callback(err);
          });
        } else {
          let operand2 = inputValues[step.operand];
          if(step.operand_type == 'constant') {
            operand2 = step.constant;
          }
          OperationService.Execute(step.operation, operand1, operand2)
          .then((result) => {
            results.push(result);
            inputValues["Result " + results.length] = result;

            callback();
          })
          .catch((err) => {
            callback(err);
          });
        }
      }, (err) => {
        if(err) {
          reject(err);
        }

        resolve(results[results.length-1]);
      });
    });
  }
}

module.exports = CalculationService;
