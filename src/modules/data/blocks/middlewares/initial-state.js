import { keys, upperFirst } from 'lodash';

export default ({ dispatch, getState }) => ( next ) => ( action ) => {
	const { meta = {} } = action;
	console.log( action );
	console.log( meta );
	if ( ! meta.initial ) {
		return next( action );
	}

	return next( action );

	const { attributes = {}, methods } = meta;
	const actions = keys( attributes ).map( ( name ) => ( {
		value: attributes[ name ],
		method: `set${ upperFirst( name ) }`,
	} ) );

	console.log( methods );
	actions.forEach( ( i ) => {
		const { method, value } = i;
		console.log( method, methods[ method ] );
		if ( methods[ method ] === 'function' ) {
			dispatch( methods[ method ]( value ) );
		}
	});

	return next( action );
};
