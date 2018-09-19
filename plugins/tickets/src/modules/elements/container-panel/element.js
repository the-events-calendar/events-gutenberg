/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.pcss';

export const RSVP = 'rsvp';
export const TICKET = 'ticket';

const ContainerPanel = ( {
	className,
	content,
	header,
	icon,
	layout,
} ) => {
	const headerContent = (
		<Fragment>
			<div className="tribe-editor__container-panel__header">
				{ header }
			</div>
			<div className="tribe-editor__container-panel__content">
				{ content }
			</div>
		</Fragment>
	);

	const getHeaderContent = () => (
		layout === TICKET
			? headerContent
			: (
				<div className="tribe-editor__container-panel__header-content-wrapper">
					{ headerContent }
				</div>
			)
	);

	return (
		<div
			className={ classNames(
				'tribe-editor__container-panel',
				`tribe-editor__container-panel--${ layout }`,
				className,
			) }
		>
			<div className="tribe-editor__container-panel__icon">
				{ icon }
			</div>
			{ getHeaderContent() }
		</div>
	);
};

ContainerPanel.defaultProps = {
	layout: RSVP,
};

ContainerPanel.propTypes = {
	className: PropTypes.string,
	content: PropTypes.node,
	header: PropTypes.node,
	icon: PropTypes.node,
	layout: PropTypes.oneOf( [ RSVP, TICKET ] ).isRequired,
};

export default ContainerPanel;
