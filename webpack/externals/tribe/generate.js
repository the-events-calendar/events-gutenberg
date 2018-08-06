const generateExternals = ( pluginScope, entries ) => (
	entries.reduce(
		( result, entry ) => {
			result[ `@@tribe/${ pluginScope }/${ entry }` ] = {
				var: `tribe.${ pluginScope }.${ entry }`,
				root: [ 'tribe', pluginScope, entry ],
			};
			return result;
		},
		{}
	)
);

module.exports = { generateExternals };
