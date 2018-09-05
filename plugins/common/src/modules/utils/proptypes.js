/**
 * Create chainable validator with isRequired check
 * @param {function} validator
 */
export const createChainableValidator = ( validator ) => {
	const createChainedValidator = (
		isRequired,
		props,
		propName,
		componentName,
	) => {
		const propValue = props[ propName ];

		if ( propValue == null ) {
			if ( isRequired ) {
				if ( propValue === null ) {
					/* eslint-disable-next-line max-len */
					return new Error( 'The prop `' + propName + '` is marked as required in `' + componentName + '`, but its value is `null`.' );
				}
				/* eslint-disable-next-line max-len */
				return new Error( 'The prop `' + propName + '` is marked as required in `' + componentName + '`, but its value is `undefined`.' );
			}
			return null;
		} else {
			return validator( props, propName, componentName );
		}
	};

	const chainedValidator = createChainedValidator.bind( null, false );
	chainedValidator.isRequired = createChainedValidator.bind( null, true );

	return chainedValidator;
}

/**
 * PropTypes check for type string and time format
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 */
export const timeFormat = ( props, propName, componentName ) => {
	const propValue = props[ propName ];

	if ( typeof propValue !== 'string' ) {
		const type = typeof propValue;
		/* eslint-disable-next-line max-len */
		return new Error('Invalid prop `' + propName + '` of type `' + type + '` supplied to `' + componentName + '`, expected `string`.' );
	}

	const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
	if ( ! timeRegex.test( propValue ) ) {
		/* eslint-disable-next-line max-len */
		return new Error('Invalid prop `' + propName + '` shape supplied to `' + componentName + '`, expected `hh:mm`.' );
	}

	return null;
};
