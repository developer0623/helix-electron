import React from 'react';
import TextInput from '../../../common/TextInput';
import SelectInput from '../../../common/SelectInput';
import TextArea from '../../../common/TextArea';
import _ from 'lodash';

const ProductForm = ({entity, onSave, onChange, loading, saving, errors}) => {
  let synonyms = '';
  _.each(entity.synonyms, (synonym) => {
    if(synonyms.length > 0) {
      synonyms += `\n`;
    }
    synonyms += `${synonym}`;
  });
  let tags = '';
  _.each(entity.tags, (tag) => {
    if(tags.length > 0) {
      tags += `\n`;
    }
    tags += `${tag}`;
  });
  return (
    <form>
      <TextInput
        name="product_name"
        label="Product Name"
        value={entity.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Enter Name of Product"
        width="8" />
      <TextInput
        name="say_as"
        label="Say As"
        value={entity.say_as}
        onChange={onChange}
        error={errors.say_as}
        placeholder="Say As"
        width="8" />
      <TextInput
        name="display_as"
        label="Display As"
        value={entity.display_as}
        onChange={onChange}
        error={errors.display_as} />
      <TextArea
        name="synonyms"
        label="Synonyms"
        value={synonyms}
        onChange={onChange}
        error={errors.synonyms}
        width="12"
        rows="10"
      />
      <TextArea
        name="tags"
        label="Tags"
        value={tags}
        onChange={onChange}
        error={errors.tags}
        width="12"
        rows="10"
      />
      <TextInput
        name="url"
        label="Product Url"
        value={entity.url}
        onChange={onChange}
        error={errors.url}
        placeholder="URL to Product"
        width="8" />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving Product...' : 'Save Product'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

ProductForm.propTypes = {
  entity: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ProductForm;
