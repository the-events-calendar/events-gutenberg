/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.pcss';
import Bar from './bar';

// todo: add tooltip into the capacity bar
const QuantityBar = ( { shared, sold, capacity, total, isDisabled } ) => {
	return (
		<div className="tribe-editor__quantity-bar">
			{ ! isDisabled && (
				<Fragment>
					<Bar className="tribe-editor__quantity-bar--shared" value={ shared } total={ total } />
					<Bar className="tribe-editor__quantity-bar--available" value={ sold } total={ total } />
					<Bar className="tribe-editor__quantity-bar--capacity" value={ capacity } total={ total } />
				</Fragment>
			) }
		</div>
	);
};

QuantityBar.propTypes = {
	shared: PropTypes.number,
	capacity: PropTypes.number,
	sold: PropTypes.number,
	total: PropTypes.number,
	isDisabled: PropTypes.bool,
}

QuantityBar.defaultProps = {
	shared: 0,
	capacity: 0,
	sold: 0,
	total: 0,
	isDisabled: false,
};

export default QuantityBar;
