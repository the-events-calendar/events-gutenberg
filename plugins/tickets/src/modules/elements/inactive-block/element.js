/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import './style.pcss';

const InactiveBlock = ( { description, icon, title } ) => (
	<section className="tribe-editor__inactive-block">
		<div className="tribe-editor__inactive-block__icon">
			{ icon }
		</div>
		{ ( title || description ) && (
			<div className="tribe-editor__inactive-block__content">
				{ title && <h2 className="tribe-editor__inactive-block__title">{ title }</h2> }
				{ description && (
					<p className="tribe-editor__inactive-block__description">
						{ description }
					</p>
				) }
			</div>
		) }
	</section>
);

InactiveBlock.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.node,
	description: PropTypes.string,
}

export default InactiveBlock;
