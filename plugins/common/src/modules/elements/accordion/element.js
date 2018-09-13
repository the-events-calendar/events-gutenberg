/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import AccordionRow from './AccordionRow';
import './style.pcss';

const Accordion = ( {
	className,
	containerAttrs,
	rows,
} ) => (
	rows.length
	? (
		<div
			aria-multiselectable="true"
			className={ classNames(
				'tribe-editor__accordion',
				className,
			) }
			role="tablist"
			{ ...containerAttrs }
		>
			{ rows.map( ( row, index ) => (
				<AccordionRow row={ row } key={ index } />
			) ) }
		</div>
	)
	: null
);

Accordion.defaultProps = {
	containerAttrs: {},
	rows: [],
};

Accordion.propTypes = {
	className: PropTypes.string,
	containerAttrs: PropTypes.object,
	rows: PropTypes.arrayOf( PropTypes.shape( {
		content: PropTypes.node,
		contentClassName: PropTypes.string,
		contentId: PropTypes.string.isRequired,
		header: PropTypes.node,
		headerClassName: PropTypes.string,
		headerId: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired,
		onClick: PropTypes.func,
		onClose: PropTypes.func,
		onOpen: PropTypes.func,
	} ).isRequired ).isRequired,
};

export default Accordion;
