import User from '../app/models/user';
import InventoryItem from '../app/models/inventoryItem';
import config from '../src/config.js';

const email_address = 'james@askhelix.io';
const password = 'test1234';

const InventoryFactory = {
  createInventory: () => {
    const inventoryItem = new InventoryItem();

    inventoryItem.name = "Tris Base";
    inventoryItem.item_type = "Chemical";
    inventoryItem.user = user;
    inventoryItem.serial_number = "1235";
    inventoryItem.vendor_name = "New England BioLabs";
    inventoryItem.catalog_number = "1234";
    inventoryItem.location = "Room 345";
    inventoryItem.sub_location = "Shelf 1";
    inventoryItem.price = "99.00";
    inventoryItem.quantity = "10";
    inventoryItem.unit_size = 1;
    inventoryItem.expiration_date = "12/31/2019";
    inventoryItem.lot_number = "Lot 454";
    inventoryItem.cas_number = "12-2312";

    return inventoryItem.save();
  }
}

module.exports = InventoryFactory;
