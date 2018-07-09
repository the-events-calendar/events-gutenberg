/**
 * Dispatch an action only if the attribute is present inside of the attributes
 *
 * @param {object} attributes Set of attributes associated with the block
 * @param {function} dispatch Function used to dispatch into the store
 *
 * @returns {Function} Returns a function that dispatch the action if present
 */
export const maybeDispatch = ( attributes, dispatch ) => ( action, key, defaultValue ) => {
	if ( key in attributes ) {
		dispatch( action( attributes[ key ] || defaultValue ) );
	}
};

/**
 * Dispatch a series of actions as an array to decrease verbosity by passing attributes and
 * dispatch to the same set of actions
 *
 * @param {object} attributes Set of attributes associated with the block
 * @param {function} dispatch Function used to dispatch into the store
 *
 * @returns {Function} Returns the functions that dispatch the actions if present
 */
export const maybeBulkDispatch = ( attributes = {}, dispatch ) => ( actions = [] ) => {
	actions.forEach( ( row ) => maybeDispatch( attributes, dispatch )( ...row ) );
};
