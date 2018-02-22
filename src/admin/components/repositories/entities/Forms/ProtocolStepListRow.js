import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import SelectInput from '../../../common/SelectInput';
import ProtocolStepReminder from './ProtocolStepReminder';
import ReactAudioPlayer from 'react-audio-player';

const ProtocolStepListRow = ({protocol_step, rowIndex, onAppendProtocolStepInput, onDeleteProtocolStepInput, onChangeProtocolStep, onPlayProtocolStep, errors}) => {
  let audio;

  const stepNameKey = "ProtocolStep_" + rowIndex;
  const stepTypeKey = "ProtocolStepType_" + rowIndex;
  const stepSayAsKey = "ProtocolStepSayAs_" + rowIndex;
  const stepTypes = [{
    value: 'Action',
    text: 'Action'
  }, {
    value: 'Recipe',
    text: 'Recipe'
  }];
  function onPlayClicked(event) {
    return onPlayProtocolStep(event, rowIndex, audio);
  }
  const renderIf = predicate => element => predicate && element;

  const isNoType = renderIf(protocol_step.step_type == '');
  const isActionType = renderIf(protocol_step.step_type == 'Action');
  const isRecipeType = renderIf(protocol_step.step_type == 'Recipe');

  function onChangeProtocolFieldAtIndex(event) {
    const field = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    return onChangeProtocolStep(event, rowIndex, field, value);
  }
  function onDeleteProtocolStep(e) {
    onDeleteProtocolStepInput(rowIndex, e);
  }
  return (
    <div className="row">
      <div className="col-md-12 pl-0 pr-0">
        <div className="container">
          <div className="row">
            <div className="col-md-1 pl-0 pr-0 text-center" style={{'margin': 'auto'}}>
              <i className="icons icon-close delete-button" onClick={onDeleteProtocolStep} />
            </div>
            <div className="col-md-11 pl-0 pr-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-11 pl-0 pr-0">
                    <TextArea
                      name="say_as"
                      label="Say As"
                      value={protocol_step.say_as || protocol_step.name}
                      onChange={onChangeProtocolFieldAtIndex}
                      error={errors.protocol_steps}
                      placeholder="Say As"
                      width={12}
                    />
                  </div>
                  <div className="col-md-1 pl-0 pr-0" style={{'margin': 'auto'}}>
                    <div className="audio-preview">
                      <ReactAudioPlayer
                        ref={function(element){ audio = element;}} />
                      <button type="button" className="btn btn-xs btn-pill btn-primary" onClick={onPlayClicked}>
                        <span className="icons icon-control-play"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-11 pl-0 pr-0">
                    <TextArea
                      name="display_as"
                      label="Display As"
                      value={protocol_step.display_as}
                      onChange={onChangeProtocolFieldAtIndex}
                      error={errors.protocol_steps}
                      placeholder="Display As"
                      width={12}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

ProtocolStepListRow.propTypes = {
  protocol_step: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onAppendProtocolStepInput: React.PropTypes.func.isRequired,
  onDeleteProtocolStepInput: React.PropTypes.func.isRequired,
  onChangeProtocolStep: React.PropTypes.func.isRequired,
  onPlayProtocolStep: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default ProtocolStepListRow;
