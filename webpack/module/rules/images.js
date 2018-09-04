module.exports = {
	test: /\.(png|woff|woff2|eot|ttf)$/,
	use: {
		loader: 'url-loader',
		options: {
			limit: 100000,
		},
	},
};
