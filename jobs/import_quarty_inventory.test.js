import fs from 'fs';
import { expect } from 'chai';
import ImportQuartzyInventory from './import_quartzy_inventory';

describe('ImportQuartzyInventory', () => {
  it('should parse quartzy xlsx', (done) => {
    fs.readFile('./jobs/import-test-data/quartzy-1.xlsx', (err, data) => {
      if (err) { done(err); }
      const items = ImportQuartzyInventory.getItems(data);
      expect(items).to.have.lengthOf(4);
      expect(items.filter(item => item.itemType === 'General Supply')).to.have.lengthOf(2);
      expect(items[2]['Item Name *']).to.equal('Apple');
      expect(items[2]['Location']).to.equal('Location 2');
      expect(items[2]['Sub-Location']).to.equal('Sub-location 2');
      expect(items.filter(item => item.itemType === 'Chemical')).to.have.lengthOf(2);
      done();
    });
  });
});
