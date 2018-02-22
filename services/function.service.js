import chemcalc from 'chemcalc';
import pTable from 'ptable';

function getMolecularWeight(compoundName) {
  return new Promise((resolve, reject) => {
    let chemicalResult;

    try {
      chemicalResult = pTable(compoundName);
    } catch(err) {
      reject(err)
    }

    let result;
    try {
      result = chemcalc.analyseMF(compoundName);
    } catch(err) {
      try {
        result = chemcalc.analyseMF(chemicalResult.symbol);
      } catch(err) {
        reject(err);
      }
    }

    resolve(result.mw);
  });
}
const FunctionService = {
  Execute: (functionName, operand) => {
    return new Promise((resolve, reject) => {
      switch(functionName) {
        case 'Round':
          const result = Number((operand).toFixed(6))

          resolve(result);
          break
        case 'Molecular Weight':
          getMolecularWeight(operand)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });

          break;
        default:
          reject(new Error("Don't know how to handle operation " + step.function));
      }
    });
  }
}

module.exports = FunctionService;
