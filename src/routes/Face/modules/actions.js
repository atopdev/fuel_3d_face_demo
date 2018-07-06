import { toastr } from 'react-redux-toastr';
import {
  FACE_LOAD_REQUEST,
  FACE_LOAD_SUCCESS,
  FACE_LOAD_ERROR,
} from './index';
import { authorizedRequest } from '../../../utils/apiCaller';

export const loadFace = (faceId, callback) => {
  return async (dispatch) => {
    dispatch({ type: FACE_LOAD_REQUEST });
    try {
      const response = await authorizedRequest('get', `/faces/${faceId}`);
      let { data } = response;
      dispatch({ type: FACE_LOAD_SUCCESS, payload: { ...data } });
      callback();
    } catch (error) {
      dispatch({
        type: FACE_LOAD_ERROR,
        error,
      });
      toastr.error(error.response.data.message);
    }
  };
};
