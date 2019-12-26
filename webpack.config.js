const path = require('path');
const config = require('./package.json');

const currency = 'CAD';
const mode = 'production';

module.exports = {
	entry: './src/index.js',
	output: {
		filename: `each.${mode === 'production' ? config.version : 'latest'}${
			currency !== 'USD' ? `.${currency}` : ''
		}.min.js`,
		path: path.resolve(__dirname, 'each'),
	},
	mode,
};
