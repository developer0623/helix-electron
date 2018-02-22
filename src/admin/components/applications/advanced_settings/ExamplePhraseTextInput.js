import React, {PropTypes} from 'react';
import TextInput from '../../common/TextInput';

const ExamplePhraseTextInput = ({index, value, onChange, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  const placeholder = `Example Phrase ${index}`;
  function onChangeExamplePhrase(event) {
    const example_phrase = event.target.value;

    return onChange(event, example_phrase, index);
  }
  return (
    <div>
      <TextInput
        name="example_phrase"
        value={value}
        onChange={onChangeExamplePhrase}
        placeholder={placeholder}
        error={error} />
    </div>
  );
};

ExamplePhraseTextInput.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default ExamplePhraseTextInput;
