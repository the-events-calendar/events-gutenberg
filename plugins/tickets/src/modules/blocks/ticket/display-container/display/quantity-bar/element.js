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
					<Bar
						className="tribe-editor__quantity-bar__bar--shared-sold"
						value={ sharedSold }
						total={ total }
					/>
					<Bar
						className="tribe-editor__quantity-bar__bar--sold"
						value={ sold }
						total={ total }
					/>
					{ ! ( capacity === total ) && (
							<Bar
								className="tribe-editor__quantity-bar__bar--capacity"
								value={ capacity }
								total={ total }
							>
								<span className="tribe-editor__quantity-bar__bar-label">
									{ __( 'cap', 'events-gutenberg' ) }
								</span>
							</Bar>
					) }
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
	sharedSold: 40,
	capacity: 30,
	sold: 10,
	total: 100,
	isDisabled: false,
};

export default QuantityBar;
