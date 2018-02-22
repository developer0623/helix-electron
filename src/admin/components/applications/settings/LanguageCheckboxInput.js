import React, {PropTypes} from 'react';
import CheckboxInput from '../../common/CheckboxInput';

const LanguageCheckboxInput = ({platform, locale, label, isEnabledLanguage, onChange, error}) => {
  function isChecked() {
    return isEnabledLanguage(platform, locale);
  }
  function onChangeClicked(event) {
    const checked = event.target.checked;

    onChange(event, platform, locale, checked);
  }
  return (
    <CheckboxInput
      name={locale}
      label={label}
      value={isChecked()}
      onChange={onChangeClicked}
      error={error}
    />
  );
};

LanguageCheckboxInput.propTypes = {
  platform: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isEnabledLanguage: React.PropTypes.func.isRequired,
  error: PropTypes.string
};

export default LanguageCheckboxInput;
