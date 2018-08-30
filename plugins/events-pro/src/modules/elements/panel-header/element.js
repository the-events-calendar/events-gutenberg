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
	isExpanded,
	onClick,
} ) => {
	return (
		<header className={
			classnames(
				'tribe-events-pro__panel-header',
				{
					'tribe-events-pro__panel-header--expanded': isExpanded,
				}
			) }
		>
			<button
				className="tribe-events-pro__panel-header__button"
				onClick={ onClick }
				type="button"
			>
				<span className="tribe-events-pro__panel-header__button__title">{ children }</span>
				<ArrowIcon />
			</button>
		</header>
	);
};

PanelHeader.propTypes = {
	children: PropTypes.node.isRequired,
	isExpanded: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default PanelHeader;
