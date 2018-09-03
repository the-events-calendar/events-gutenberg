/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/elements'
import './style.pcss';

const ActionDashboard = ( {
	actions,
	cancelLabel,
	className,
	confirmLabel,
	isCancelDisabled,
	isConfirmDisabled,
	onCancelClick,
	onConfirmClick,
	showCancel,
	showConfirm,
} ) => (
	<section
		className={ classnames(
			'tribe-tickets__action-dashboard',
			className,
		) }
	>
		{ actions && actions.length && (
			<div className="tribe-tickets__action-dashboard__group-left">
				{ actions.map( ( action, index ) => (
					<span
						key={ `action-${index}`}
						className="tribe-tickets__action-dashboard__action-wrapper"
					>
						{ action }
					</span>
				) ) }
			</div>
		) }
		{ ( showCancel || showConfirm ) && (
			<div className="tribe-tickets__action-dashboard__group-right">
				{ showCancel && (
					<Button
						className="tribe-tickets__action-dashboard__cancel-button"
						isDisabled={ isCancelDisabled }
						label={ cancelLabel }
						onClick={ onCancelClick }
					/>
				) }
				{ showConfirm && (
					<Button
						className="tribe-tickets__action-dashboard__confirm-button"
						isDisabled={ isConfirmDisabled }
						label={ confirmLabel }
						onClick={ onConfirmClick }
					/>
				) }
			</div>
		) }
	</section>
);

ActionDashboard.defaultProps = {
	showCancel: true,
	showConfirm: true,
	onCancelClick: () => {},
	onConfirmClick: () => {},
};

ActionDashboard.propTypes = {
	actions: PropTypes.arrayOf( PropTypes.node ),
	cancelLabel: PropTypes.string,
	className: PropTypes.string,
	confirmLabel: PropTypes.string,
	isCancelDisabled: PropTypes.bool,
	isConfirmDisabled: PropTypes.bool,
	onCancelClick: PropTypes.func,
	onConfirmClick: PropTypes.func,
	showCancel: PropTypes.bool,
	showConfirm: PropTypes.bool,
};

export default ActionDashboard;
