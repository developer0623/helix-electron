import React from 'react';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';

const SkillGroupForm = ({skill_group, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextInput
                name="skill_group_name"
                label="Skill Group Name"
                placeholder="Enter Skill Group Name"
                value={skill_group.skill_group_name}
                onChange={onChange}
                error={errors.skill_group_name}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <TextArea
                name="description"
                label="Description"
                value={skill_group.description}
                onChange={onChange}
                error={errors.description}
                placeholder="Description of Skill Group"
                rows={12}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

SkillGroupForm.propTypes = {
  skill_group: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default SkillGroupForm;
