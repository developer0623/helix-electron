import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';

class IamRolePopup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {company: Object.assign({}, this.props.company)};
    this.updateRole = this.updateRole.bind(this);
  }
  updateRole(event) {
    event.preventDefault();
    let company = Object.assign({}, this.state.company);
    company.amazon_iam_role_arn = event.target.value;

    this.setState({company: company});

  }
  render() {
    return (
        <div className="iam-role-popup">
          <div className="popup_inner">
            <p className="popup-title">Amazon IAM Role ARN</p>
            <input
              type="text"
              name="roleinput"
              className="form-control"
              placeholder="Enter IAM Role ARN"
              onChange={this.updateRole}
              value={this.state.company.amazon_iam_role_arn}
            />
            <div className="row">
              <div className="col-md-6">
                <button onClick={this.props.onCancel}>Cancel</button>
              </div>
              <div className="col-md-6">
                <button onClick={function(){this.props.onSave(this.state.company);}}>Save</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

IamRolePopup.propTypes = {
  company: PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
};

export default IamRolePopup;
