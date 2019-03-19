const express = require('express');
const sha256 = require('sha256');
const app = express();
const port = 4000;
const second = 1000;

const sessions = {}; // plain-text secrets stored in memory
const streams = {}; // user-specific data to stream

const hasAuth = (req) => {
	const { id, secret } = req.body;
	return sessions[id] && secret && sessions[id] === secret;
};

const streamNext = (id) => {
	streams[id] = streams[id] || 0;
	return streams[id]++;
}

const newJson = (num) => JSON.stringify({
	value: num,
	sha1: getUserSecret(num),
});

const padLeft = (str) => `0000000000${str}`.slice(-10);

const getNewUserId = () => padLeft(Math.random().toString().slice(2,12));

const getUserSecret = (id) => sha256(`super-secret-salt-${id}`);

const newSession = () => {
	const id = getNewUserId();

	if (sessions[id]) {
		return newSession();
	}
	else {
		const secret = getUserSecret(id);
		sessions[id] = secret;

		setTimeout(() => delete sessions[id], 90000); // 90000 = 15 minutes

		return { id, secret };
	}
}


app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/session', (req, res) => res.json(newSession()));

app.post('/session', (req, res) =>
	res.json({ status: hasAuth(req) ? 'success' : 'failure' })
);

app.post('/stream-json', (req, res) => {

	if (hasAuth(req)) {

		const id = req.body.id;

		let ref = setInterval(() => {
			const str = newJson(streamNext(id));
			console.log(str);
			res.write(str);
		}, 10);
		const done = () => clearInterval(ref);

		req.on('close', done);
		req.on('end',   done);

		setTimeout(() => {
			done();
			res.end(']');
		}, 10 * second);
	}
	else {
		res.json({ status: 'denied' });
	}
});

app.listen(port, () => console.log(`listening on ${port}`));
