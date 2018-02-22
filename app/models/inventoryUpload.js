import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const InventoryUploadSchema = new Schema({
  data: {
    type: Array,
    required: true
  },
  uuid: {
    type: String,
    required: true
  },
  chunk: {
    type: Number,
    require: true
  },
  totalChunks: {
    type: Number,
    require: true
  },
  chunkSize: {
    type: Number,
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository',
    required: true
  }
}, {
  timestamps: true
});

InventoryUploadSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('InventoryUpload', InventoryUploadSchema);
