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

const InactiveBlock = ( { className, description, icon, title } ) => (
	<section className={ classNames(
		'tribe-editor__inactive-block',
		className,
	) }>
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
	className: PropTypes.string,
	description: PropTypes.string,
	icon: PropTypes.node,
	title: PropTypes.string,
}

export default InactiveBlock;
