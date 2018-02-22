import * as types from './actionTypes';
import repositoryApi from '../../api/labs/repositoryApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadNotesSuccess(notes) {
  return { type: types.LOAD_NOTES_SUCCESS, notes };
}
export function createNoteSuccess(note) {
  return { type: types.CREATE_NOTE_SUCCESS, note };
}
export function updateNoteSuccess(note) {
  return { type: types.UPDATE_NOTE_SUCCESS, note };
}
export function deleteNoteSuccess(note) {
  return { type: types.DELETE_NOTE_SUCCESS, note };
}
export function loadNotes(page) {
  return function(dispatch) {
    dispatch(beginAjaxCall);
    if(!page) {
      page = 1;
    }
    return repositoryApi.getNotes(page).then(notes => {
      dispatch(loadNotesSuccess(notes));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveNote(note) {
  return function(dispatch) {
    return repositoryApi.saveNote(note).then(savedNote => {
      note._id ? dispatch(updateNoteSuccess(savedNote)) :
        dispatch(createNoteSuccess(savedNote));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function deleteNote(note) {
  return function(dispatch) {
    return repositoryApi.deleteNote(note).then(() => {
      dispatch(deleteNoteSuccess(note));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
