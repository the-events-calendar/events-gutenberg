module.exports = ( { file, options, env } ) => ( { // eslint-disable-line no-unused-vars
	plugins: [
		require( 'postcss-import' )( { root: file.dirname } ),
		require( 'postcss-preset-env' ),
		require( 'postcss-nested' ),
		require( 'postcss-mixins' ),
		require( 'postcss-hexrgba' ),
		require( 'css-mqpacker' ),
	],
} );
