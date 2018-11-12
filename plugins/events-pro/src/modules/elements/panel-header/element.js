/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import ArrowIcon from '@moderntribe/events-pro/src/resources/icons/arrow.svg';
import './style.pcss';

const PanelHeader = ( {
	children,
	count,
	isExpanded,
	onClick,
} ) => {
	return (
		<header className={
			classnames(
				'tribe-editor__events-pro__panel-header',
				{
					'tribe-editor__events-pro__panel-header--expanded': isExpanded,
				}
			) }
		>
			<button
				className="tribe-editor__events-pro__panel-header-button"
				onClick={ onClick }
				type="button"
			>
				<span className="tribe-editor__events-pro__panel-header-button-text">
					<span className="tribe-editor__events-pro__panel-header-button-title">{ children }</span>
					{ !! count && ! isExpanded && (
						<span className="tribe-editor__events-pro__panel-header-button-count">{ `(${ count })` }</span>
					) }
				</span>
				<ArrowIcon />
			</button>
		</header>
	);
};

PanelHeader.propTypes = {
	children: PropTypes.node.isRequired,
	count: PropTypes.number.isRequired,
	isExpanded: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default PanelHeader;
