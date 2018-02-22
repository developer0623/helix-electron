
const OperationService = {
  Execute: (operationName, operand1, operand2) => {
    return new Promise((resolve, reject) => {
      let result = 0;
      switch(operationName) {
        case 'Add':
          result = operand1 + operand2;
          break;
        case 'Divide':
          result = operand1 / operand2;
          break;
        case 'Multiply':
          result = operand1 * operand2;
          break;
        case 'Subtract':
          result = operand1 - operand2;
          break;
        default:
          reject(new Error("Don't know how to handle operation " + operationName));
      }

      resolve(result);
    });
  }
}

module.exports = OperationService;
