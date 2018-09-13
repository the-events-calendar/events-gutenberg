/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import {
	number,
	TribePropTypes,
} from '@moderntribe/common/utils/';

const Bar = ( { className, value, total } ) => {

	if ( value === 0 || total === 0 ) {
		return null;
	}

	// Prevent to have numbers above 100 and below 0
	const percentage = Math.max(
		0,
		Math.min(
			100, number.percentage( value, total ),
		),
	);
	const style = {};

	if ( percentage > 0 ) {
		style.width = `${ percentage.toFixed( 2 ) }%`;
	}

	return (
		<span className={ classNames( className ) } style={ style }></span>
	);
}

Bar.propTypes = {
	className: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.arrayOf( PropTypes.string ),
		TribePropTypes.nullType,
	] ),
	value: PropTypes.number,
	total: PropTypes.number,
}

Bar.defaultProps = {
	className: null,
	value: 0,
	total: 0,
}

export default Bar;
