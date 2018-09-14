/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.pcss';

const ContainerPanel = ( {
	...props
} ) => (
	<div
		className={ classNames(
			'tribe-editor__container-panel',
			className,
		) }
	>
		<section className="tribe-editor__container-panel__left-section">
			{ leftSection }
		</section>
		<section className="tribe-editor__container-panel__right-section">
			<div className="tribe-editor__container-panel__right-section-header">
				{ rightSectionHeader }
			</div>
			{ showContent && (
				<div className="tribe-editor__container-panel__right-section-content">
					{ rightSectionContent }
				</div>
			) }
		</section>
	</div>
);

ContainerPanel.defaultProps = {
	showContent: false,
};

ContainerPanel.propTypes = {
	className: PropTypes.string,
	leftSection: PropTypes.node,
	rightSectionContent: PropTypes.node,
	rightSectionHeader: PropTypes.node,
	showContent: PropTypes.bool.isRequired,
};

export default ContainerPanel;
