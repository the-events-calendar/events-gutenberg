/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

/**
 * Generate a label with singular, plural values based on the count provided, the function
 * returns a fallback value (`undefined`) by default when the value is either 0 or lower.
 *
 * Labels need to have a %d on it where the number will be replaced
 *
 * @param {int} count The amount to be compared
 * @param {string} singular The label for the singular case
 * @param {string} plural The label for the plural case
 * @param {*} fallback The value to be returned if count is zero or negative
 * @returns {*} return fallback if count is zero or negative otherwise singular or plural
 */
const NumericLabel = ( { count, singular, plural, fallback, className } ) => {
	if ( count <= 0 ) {
		return fallback;
	}
	const targetStr = count === 1 ? singular : plural;
	const [ before, after ] = targetStr.split( '%d' );
	return (
		<span className={ classNames( 'tribe-editor__numeric-label', className ) }>
			{ before && <span className="tribe-editor__numeric-label--before">{ before }</span> }
			{ count && <span className="tribe-editor__numeric-label--count">{ count }</span> }
			{ after && <span className="tribe-editor__numeric-label--after">{ after }</span> }
		</span>
	);
}

NumericLabel.propTypes = {
	count: PropTypes.number.isRequired,
	singular: PropTypes.string,
	plural: PropTypes.string,
	fallback: PropTypes.any,
	className: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.arrayOf( PropTypes.string ),
		PropTypes.object,
	] ),
}

NumericLabel.defaultProps = {
	count: 0,
	singular: '',
	plural: '',
	className: '',
	fallback: null,
}

export default NumericLabel;
