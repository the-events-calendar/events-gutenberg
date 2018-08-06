const generateExternals = ( pluginScope, entries ) => (
	entries.reduce(
		( result, entry ) => {
			result[ `@tribe/${ pluginScope }/${ entry }` ] = {
				this: [ 'tribe', pluginScope, entry ],
			};
			return result;
		},
		{}
	)
);

module.exports = { generateExternals };
