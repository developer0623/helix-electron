import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectInput from '../../common/SelectInput';
import _ from 'lodash';

const AttributeForm = ({system, loading, saving, errors, loginWithAmazon}) => {
  const amazonOAuthTokens = _.find(system.attributes, { key: "amazon_oauth_tokens"});
  let amazonOAuthTokensValue;
  if(amazonOAuthTokens) {
    amazonOAuthTokensValue = amazonOAuthTokens.value;
  }
  return (
    <form>
      <label htmlFor="loginWithAmazon">Amazon OAuth Keys</label>
      <table id="loginWithAmazon" className="table">
        <tbody>
          <tr>
            <td>{JSON.stringify(amazonOAuthTokensValue)}</td>
            <td align={'right'}>
              <input
                type="submit"
                value="Login with Amazon"
                className="btn btn-primary"
                onClick={loginWithAmazon}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

AttributeForm.propTypes = {
  system: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object,
  loginWithAmazon: React.PropTypes.func.isRequired
};

export default AttributeForm;
