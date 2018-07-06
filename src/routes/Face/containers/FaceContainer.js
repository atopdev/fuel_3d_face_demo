import { connect } from 'react-redux';
import Face from '../components/Face';
import { loadFace } from '../modules/actions';

export default connect(
  ({ face, router }) => ({ ...router, ...face }),
  (dispatch) => ({
    loadFace: (faceId, callback) => dispatch(loadFace(faceId, callback)),
  }),
)(Face);
