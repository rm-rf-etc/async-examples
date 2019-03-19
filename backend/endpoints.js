
const { exec } = require('child_process');

exec(`curl 'localhost:3000/session'`, (data) => {

	console.log(data);
});
