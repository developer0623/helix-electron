import React, {PropTypes}  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import DashboardHeader from '../common/DashboardHeader';
import ApplicationRow from './ApplicationRow';
import LabRow from './LabRow';
import toastr from 'toastr';
import LoadingSpinner from '../common/LoadingSpinner';

class DashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddLabPage = this.redirectToAddLabPage.bind(this);
  }
  redirectToAddLabPage() {
     this.props.history.push(`/admin/labs/new`);
  }
  render() {
    return (
      <div>
        <DashboardHeader
          dashboardTitle="Dashboard"
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    {this.props.applications.length !== 0 ? <h5>Virtual Assistants</h5> : null}
                  </div>
                </div>
                {this.props.applications.length == 0
                  ?
                    <div className="row">
                      <LoadingSpinner />
                    </div>
                  :
                    <div className="row">
                      {this.props.applications.map(application =>
                        <ApplicationRow
                          key={application._id}
                          application={application} />
                      )}
                    </div>
                }
                <div className="row">
                  <div className="col-md-9">
                    <h5>Labs</h5>
                  </div>
                  <div className="col-md-3 text-right">
                    <button type="button" className="btn btn-xs btn-pill btn-primary" onClick={this.redirectToAddLabPage}>
                      <span className="icons icon-plus"></span>
                      Add Lab
                    </button>
                  </div>
                </div>
                <div className="row">
                  {this.props.labs.map(lab =>
                    <LabRow
                      key={lab._id}
                      lab={lab} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  company: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
  labs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  console.log(state.networkError, 'state network error');
  return {
    company: state.auth.company,
    applications: state.auth.applications,
    labs: state.auth.labs,
    loading: state.ajaxCallsInProgress > 0
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
