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

export const RSVP = 'rsvp';
export const TICKET = 'ticket';

const ContainerPanel = ( {
	className,
	content,
	header,
	icon,
	layout,
} ) => (
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
		<div className="tribe-editor__container-panel__header">
			{ header }
		</div>
		<div className="tribe-editor__container-panel__content">
			{ content }
		</div>
	</div>
);

ContainerPanel.propTypes = {
	className: PropTypes.string,
	content: PropTypes.node,
	header: PropTypes.node,
	icon: PropTypes.node,
	layout: PropTypes.oneOf( [ RSVP, TICKET ] ).isRequired,
};

export default ContainerPanel;
