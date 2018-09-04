/**
 * PropTypes check for type string and time format
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 */
export const timeFormat = ( props, propName, componentName ) => {
	if ( typeof props[ propName ] !== 'string' ) {
		const type = typeof props[ propName ];
		/* eslint-disable-next-line max-len */
		return new Error( `Warning: Invalid prop '${propName}' of type '${type}' supplied to '${componentName}', expected 'string'.` );
	}

	const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
	if ( ! timeRegex.test( props[ propName ] ) ) {
		/* eslint-disable-next-line max-len */
		return new Error( `Warning: Invalid format for prop '${propName}' supplied to '${componentName}', expected time format 'hh:mm'.` );
	}

	return null;
};
