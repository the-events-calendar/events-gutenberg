const wp = [
	'blocks',
	'components',
	'date',
	'editor',
	'element',
	'i18n',
	'utils',
	'data',
];

// Puts @wordpress/[dependency] on the window object as window.wp.[dependency]
const externals = wp.reduce(
	( result, dependency ) => {
		result[ `@wordpress/${ dependency }` ] = {
			this: [ 'wp', dependency ],
		};
		return result;
	},
	{}
);

module.exports = externals;
