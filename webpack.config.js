/**
 * External dependencies
 */
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Main CSS loader for everything but blocks..
const cssExtractTextPlugin = new ExtractTextPlugin( {
	filename: "./src/resources/css/[name].css"
} );

// Configuration for the ExtractTextPlugin.
const extractConfig = {
	fallback: 'style-loader',
	use: [
		{ loader: 'css-loader', options: { importLoaders: 1 } },
		{
			loader: "postcss-loader",
			options: {
				ident: 'postcss',
				plugins: (loader) => [
					require( 'postcss-import' )({ root: loader.resourcePath }),
					require( "postcss-cssnext" ),
					require( "postcss-nested" ),
					require( "postcss-mixins" ),
					require( "postcss-hexrgba" ),
					require( "css-mqpacker" )
				]
			}
		}
	]
};

const entryPointNames = [ "editor" ];

const externals = {};
entryPointNames.forEach( entryPointName => {
	externals[ "@tribe-editor/" + entryPointName ] = {
		this: [ "tribe-editor", entryPointName ]
	};
} );

const wpDependencies = [ "components", "element", "blocks", "utils" ];
wpDependencies.forEach( wpDependency => {
	externals[ "@wordpress/" + wpDependency ] = {
		this: [ "wp", wpDependency ]
	};
} );

const config = {
	entry: entryPointNames.reduce( ( memo, entryPointName ) => {
		memo[ entryPointName ] = `./src/modules/${ entryPointName }/index.js`;
		return memo;
	}, {} ),
	externals,
	output: {
		filename: "src/resources/js/[name].js",
		path: __dirname,
		library: [ "tribe", "editor", "[name]" ],
		libraryTarget: "this"
	},
	resolve: {
		modules: [ __dirname, "node_modules" ]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.p?css$/,
				use: cssExtractTextPlugin.extract( extractConfig )
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				process.env.NODE_ENV || "development"
			)
		}),
		cssExtractTextPlugin,
		new webpack.LoaderOptionsPlugin({
			minimize: process.env.NODE_ENV === "production",
			debug: process.env.NODE_ENV !== "production"
		})
	],
	stats: {
		children: false
	}
};

switch (process.env.NODE_ENV) {
	case "production":
		config.plugins.push(new webpack.optimize.UglifyJsPlugin());
		break;

	default:
		config.devtool = "source-map";
}

module.exports = config;
