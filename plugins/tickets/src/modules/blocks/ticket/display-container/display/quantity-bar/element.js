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
const QuantityBar = ( { sharedSold, sold, capacity, total, isDisabled } ) => {
	return (
		<div className="tribe-editor__quantity-bar">
			{ ! isDisabled && (
				<Fragment>
					<Bar className="tribe-editor__quantity-bar--shared-sold" value={ sharedSold } total={ total } />
					<Bar className="tribe-editor__quantity-bar--sold" value={ sold } total={ total } />
					{ ! capacity === total
							&& <Bar className="tribe-editor__quantity-bar--capacity" value={ capacity } total={ total } />
					}
				</Fragment>
			) }
		</div>
	);
};

QuantityBar.propTypes = {
	sharedSold: PropTypes.number,
	capacity: PropTypes.number,
	sold: PropTypes.number,
	total: PropTypes.number,
	isDisabled: PropTypes.bool,
}

QuantityBar.defaultProps = {
	sharedSold: 0,
	capacity: 0,
	sold: 0,
	total: 0,
	isDisabled: false,
};

export default QuantityBar;
