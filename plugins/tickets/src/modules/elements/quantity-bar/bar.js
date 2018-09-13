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
import { percentage } from '@moderntribe/common/src/modules/utils/number';

const Bar = ( { className, value, total } ) => {

	if ( value === 0 || total === 0 ) {
		return null;
	}

	let percentageResult;
	try {
		percentageResult = number.percentage( value, total );
	} catch ( e ) {
		percentageResult = 0;
	} finally {
		// Prevent to have numbers above 100 and below 0
		percentageResult = Math.max(
			0,
			Math.min( 100, percentageResult ),
		);
	}
	const style = {};

	if ( percentageResult > 0 ) {
		style.width = `${ percentageResult.toFixed( 2 ) }%`;
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
