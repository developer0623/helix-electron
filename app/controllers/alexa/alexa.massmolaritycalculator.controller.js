// import chemcalc from 'chemcalc';
import _ from 'lodash';

// function getMassMolarityPrompt(compoundName, mass, volume, unit, concentration) {
//   return new Promise((resolve, reject) => {
//     if (_.isEmpty(mass) || _.isUndefined(mass)) {
//       const missingParamPrompt = 'Sorry, for me to make this calculation I need the volume and concentration';
//       if (_.isEmpty(volume) || _.isUndefined(volume) ||  _.isEmpty(concentration) || _.isUndefined(concentration)) {
//         resolve([false, missingParamPrompt, null, null]);
//       }

//       const result = chemcalc.analyseMF(compoundName);
//       const molecularWeight = result.mw;
//       const gramsNeeded = concentration * volume * molecularWeight;

//       const prompt = "You'll need " + gramsNeeded + " grams";

//       resolve([true, prompt, null, null]);
//     }
//     if (_.isEmpty(volume) ||_.isUndefined(volume)) {
//       const missingParamPrompt = 'Sorry, for me to make this calculation I need the mass and concentration';
//       if (_.isEmpty(mass) || _.isUndefined(mass) || _.isEmpty(concentration) || _.isUndefined(concentration)) {
//         resolve([false, missingParamPrompt, null, null]);
//       }

//       const result = chemcalc.analyseMF(compoundName);
//       const molecularWeight = result.mw;
//       const volumeNeeded = mass / (concentration * molecularWeight)

//       const prompt = "You'll need " + volumeNeeded + " liters";

//       resolve([true, prompt, null, null]);
//     }
//     if (_.isEmpty(concentration) || _.isUndefined(concentration)) {
//       const missingParamPrompt = 'Sorry, for me to make this calculation I need the mass and volume';
//       if (_.isEmpty(mass) || _.isUndefined(mass) ||  _.isEmpty(volume) || _.isUndefined(volume)) {
//         resolve([false, missingParamPrompt, null, null]);
//       }

//       const result = chemcalc.analyseMF(compoundName);
//       const molecularWeight = result.mw;
//       const concentrationNeeded = mass / (volume * molecularWeight) ;

//       const prompt = "You'll need a concentration of " + concentrationNeeded + " moles per liter";

//       resolve([true, prompt, null, null]);
//     }

//     reject(new Error('Unable to calculate lookup value'));
//   });
// }

const AlexaMassMolarityCalculatorController = {
  GetMassMolarityResponse: (req, res) => {
    // return new Promise((resolve, reject) => {
    //   const compoundName = req.slot('Compound');
    //   const volume = req.slot('Volume');
    //   const unit = req.slot('Unit');
    //   const concentration = req.slot('Concentration');
    //   const mass = req.slot('Mass');

    //   getMassMolarityPrompt(compoundName, mass, volume, unit, concentration)
    //   .then((items) => {
    //     const success = items[0];
    //     const prompt = items[1];
    //     const step = items[2];
    //     const steps = items[3];

    //     req.prompt = prompt;

    //     res.say(prompt)
    //       .shouldEndSession(false)
    //       .send();

    //     resolve(res);
    //   })
    //   .catch((err) => {
    //     reject(err);
    //   });
    // });
  }
}

module.exports = AlexaMassMolarityCalculatorController;
