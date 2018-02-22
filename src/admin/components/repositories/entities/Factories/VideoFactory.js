import _ from 'lodash';

const ENTITY_TYPE = "VIDEO";

class VideoFactory {
  static create() {
    const video = {
      name: '',
      type: ENTITY_TYPE,
      tag: '',
      tags: [],
      synonyms: [],
      attributes: {
        sub_title: '',
        url: ''
      }
    };

    return video;
  }
  static deepCopyAttributes(attributes) {
    const newAttributes = Object.assign({}, attributes);

    return newAttributes;
  }
  static emptyStateCopy() {
    return {
      primaryText: "Data Sets allow you to organization your companies information into groups that are easily searchable by researchers.",
      secondaryText: "You’ll be able to ask your virtual assistant for the location of items in your inventory, to check out inventory, and to help reorder inventory items",
      addButtonText: "Add Video"
    };
  }
  static validateForm(entity) {
    const errors = {};
    let formIsValid = true;

    if(entity.name.length < 3) {
      errors.name = 'Name is required and must be at least 3 characters.';
      formIsValid = false;
    }

    if(entity.attributes.url.length == 0) {
      errors.url = 'A URL is required.';
      formIsValid = false;
    } else {

      if(!isUrl(entity.attributes.url)) {
        errors.url = 'URL is not valid';
        formIsValid = false;
      }


    }


    return {
      errors,
      formIsValid
    };
  }
}

function isUrl(string){
  const matcher = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
  return matcher.test(string);
}

export default VideoFactory;
