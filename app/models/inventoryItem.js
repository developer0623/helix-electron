import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const InventoryItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_lower: {
    type: String,
    required: true
  },
  item_type: {
    type: String,
    required: true
  },
  properties: {
    type: Schema.Types.Mixed
  },
  serial_number: {
    type: String
  },
  vendor_name: {
    type: String
  },
  catalog_number: {
    type: String
  },
  location: {
    type: String
  },
  sub_location: {
    type: String
  },
  location_detail: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  unit_size: {
    type: String
  },
  expiration_date: {
    type: Date
  },
  lot_number: {
    type: String
  },
  cas_number: {
    type: String
  },
  last_checked_out_by: {
    type: String
  },
  checkout_status: {
    type: String
  },
  status: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
InventoryItemSchema.statics.getInventoryItem = function(user, name) {
  return new Promise((resolve, reject) => {
    this.findOne({
      user: user,
      name: { "$regex": `${name}`, "$options": "i" }}
    )
    .then((inventoryItem) => {
      resolve(inventoryItem);
    })
    .catch((err) => {
      reject(err);
    });
  });
}
InventoryItemSchema.statics.getInventoryItemById = function(id) {
  return new Promise((resolve, reject) => {
    this.findById(id)
    .then((protocol) => {
      resolve(protocol);
    })
    .catch((err) => {
      reject(err);
    });
  });
};

InventoryItemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);
