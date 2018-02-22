import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const CalculationSchema = new Schema({
  calculation_name: {
    type: String,
    required: true,
  },
  intent: {
    type: String
  },
  input_variables: [{
    name: {
      type: String,
      required: true
    }
  }],
  steps: [{
    step_type: {
      type: String,
      required: true
    },
    input_variable: {
      type: String,
      required: true
    },
    operation: {
      type: String
    },
    function: {
      type: String
    },
    operand_type: {
      type: String
    },
    operand: {
      type: String
    },
    constant: {
      type: String
    }
  }],
  result_units: {
    type: String,
    required: true
  },
  instructions: {
    type: String
  },
  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  private: {
    type: Boolean,
    required: true,
    default: false
  }
});

CalculationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Calculation', CalculationSchema);
