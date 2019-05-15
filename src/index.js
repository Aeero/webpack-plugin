require('./index.less');

const config = require('./config/var.js');

let app = document.getElementById('app');

app.innerHTML = JSON.stringify(config);
