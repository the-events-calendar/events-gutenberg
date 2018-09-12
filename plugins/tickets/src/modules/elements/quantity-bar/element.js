/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.pcss';
import { number } from '@moderntribe/common/utils/';

const Bar = ( { className, value = 0, total = 0 } ) => {

	if ( value === 0 || total === 0 ) {
		return null;
	}

	const percentage = number.percentage( value, total );
	const style = {
		width: percentage === 0 ? null : `${ percentage }%`,
	};

	return (
		<span className={ className } style={ style }></span>
	);
}

Bar.propTypes = {
	className: PropTypes.string,
	value: PropTypes.number,
	total: PropTypes.number,
}

const QuantityBar = ( { shared, sold, capacity, total } ) => {
	return (
		<div className="tribe-editor__quantity-bar">
			<Bar className="tribe-editor__quantity-bar--shared" value={ shared } total={ total } />
			<Bar className="tribe-editor__quantity-bar--available" value={ sold } total={ total } />
			<Bar className="tribe-editor__quantity-bar--capacity" value={ capacity } total={ total } />
		</div>
	);
};

QuantityBar.propTypes = {
	shared: PropTypes.number,
	capacity: PropTypes.number,
	sold: PropTypes.number,
	total: PropTypes.number,
}

QuantityBar.defaultProps = {
	shared: 0,
	capacity: 0,
	sold: 0,
	total: 0,
};

export default QuantityBar;
