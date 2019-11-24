const path = require('path');
const config = require('./package.json');

const mode = 'development';

module.exports = {
	entry: './src/index.js',
	output: {
		filename: `each.${mode === 'production' ? config.version : 'latest'}.min.js`,
		path: path.resolve(__dirname, 'each'),
	},
	mode,
};
