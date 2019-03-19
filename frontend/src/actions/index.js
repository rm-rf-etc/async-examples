import { START_JSON_STREAM, CANCEL_JSON_STREAM } from './constants'

export const startStreamingJson = () => ({
	type: START_JSON_STREAM,
});

export const cancelStreamingJson = () => ({
	type: CANCEL_JSON_STREAM,
});
