import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import TextInput from '../../../common/TextInput';
import TextArea from '../../../common/TextArea';
import ReactAudioPlayer from 'react-audio-player';

const IngredientListRow = ({ingredient, rowIndex, onAppendIngredientInput, onDeleteIngredientInput, onChangeIngredient, onPlayIngredient, errors}) => {
  let audio;
  function onDelete(e) {
    onDeleteIngredientInput(rowIndex, e);
  }
  function onPlayClicked(event) {
    return onPlayIngredient(event, rowIndex, audio);
  }
  return (
    <div className="row">
      <div className="col-md-12 pl-0 pr-0">
        <div className="container">
          <div className="row">
            <div className="col-md-1 pl-0 pr-0 text-center" style={{'margin': 'auto'}}>
              <i className="icons icon-close delete-button" onClick={onAppendIngredientInput} />
            </div>
            <div className="col-md-11 pl-0 pr-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-11 pl-0 pr-0">
                    <TextArea
                      name="say_as"
                      label="Say As"
                      value={ingredient.say_as || ingredient.name}
                      onChange={onChangeIngredient}
                      error={errors.ingredients}
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
                      value={ingredient.display_as}
                      onChange={onChangeIngredient}
                      error={errors.ingredients}
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

IngredientListRow.propTypes = {
  ingredient: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onAppendIngredientInput: React.PropTypes.func.isRequired,
  onDeleteIngredientInput: React.PropTypes.func.isRequired,
  onChangeIngredient: React.PropTypes.func.isRequired,
  onPlayIngredient: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default IngredientListRow;
