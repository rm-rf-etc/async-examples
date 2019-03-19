import { connect } from 'react-redux';
import { startStreamingJson, cancelStreamingJson } from '~/actions';
import component from './component';

const mapDispatchToProps = (dispatch) => ({
	startStreaming: () => dispatch(startStreamingJson()),
	stopStreaming: () => dispatch(cancelStreamingJson()),
});
const mapStateToProps = ({ jsonBlob }) => ({
	jsonBlob,
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
