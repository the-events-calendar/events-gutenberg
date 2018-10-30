/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */

import PanelHeader from '@moderntribe/events-pro/elements/panel-header/element';

const Panel = ( {
	children,
	count,
	isExpanded,
	onHeaderClick,
	panelTitle,
} ) => {
	return (
		<section>
			<PanelHeader
				count={ count }
				onClick={ onHeaderClick }
				isExpanded={ isExpanded }
			>
				{ panelTitle }
			</PanelHeader>
			{
				isExpanded && children
			}
		</section>
	);
};

Panel.propTypes = {
	children: PropTypes.node.isRequired,
	count: PropTypes.number.isRequired,
	isExpanded: PropTypes.bool.isRequired,
	panelTitle: PropTypes.string.isRequired,
	onHeaderClick: PropTypes.func.isRequired,
};

export default Panel;
