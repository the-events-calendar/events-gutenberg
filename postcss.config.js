module.exports = () => ( {
	plugins: ( loader ) => ( [
		require( 'postcss-import' )( { root: loader.resourcePath } ),
		require( 'postcss-cssnext' ),
		require( 'postcss-nested' ),
		require( 'postcss-mixins' ),
		require( 'postcss-hexrgba' ),
		require( 'css-mqpacker' ),
	] ),
} );
