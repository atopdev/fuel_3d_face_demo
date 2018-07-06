export const FACE_LOAD_REQUEST = 'FACE_LOAD_REQUEST';
export const FACE_LOAD_SUCCESS = 'FACE_LOAD_SUCCESS';
export const FACE_LOAD_ERROR = 'FACE_LOAD_ERROR';

const initialState = {
  loading: false,
  face: null,
  error: null,
};

const face = (state = initialState, action) => {
  switch(action.type) {
    case FACE_LOAD_REQUEST:
      return { ...state, loading: true, face: null, error: null };

    case FACE_LOAD_SUCCESS:
      return { ...state, loading: false, face: action.payload };

    case FACE_LOAD_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default face;
