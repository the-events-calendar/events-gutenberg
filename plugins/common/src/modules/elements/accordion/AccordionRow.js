/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/elements';
import { slide } from '@moderntribe/common/utils';

const AccordionRow = ( { row, index } ) => {
	const getHeaderAttrs = ( { contentId, headerId, isActive } ) => {
		const _isActive = isActive ? 'true' : 'false';
		return {
			'aria-controls': contentId,
			'aria-expanded': _isActive,
			'aria-selected': _isActive,
			id: headerId,
			role: 'tab',
		};
	};

	const getContentAttrs = ( { contentId, headerId, isActive} ) => ( {
		'aria-hidden': isActive ? 'false' : 'true',
		'aria-labelledby': headerId,
		id: contentId,
		role: 'tabpanel',
	} );

	const onClose = ( parent, row, e ) => () => {
		parent.classList.remove( 'closing' );
		parent.classList.add( 'closed' );
		row.onClose && row.onClose( e );
	};

	const onOpen = ( parent, row, e ) => () => {
		parent.classList.remove( 'opening' );
		parent.classList.add( 'open' );
		row.onOpen && row.onOpen( e );
	};

	const onClick = ( e, row ) => {
		const parent = e.currentTarget.parentNode;
		const content = e.currentTarget.nextElementSibling;

		row.isActive
			? parent.classList.add( 'closing' )
			: parent.classList.remove( 'opening' );
		row.isActive
			? slide.up( content, row.contentId, 200, onClose( parent, row, e ) )
			: slide.down( content, row.contentId, 200, onOpen( parent, row, e ) );
		row.onClick && row.onClick( e );
	};

	return (
		<article
			className={ classNames(
				'tribe-editor__accordion__row',
				{ 'active': row.isActive },
			) }
			key={ index }
		>
			<Button
				className={ classNames(
					'tribe-editor__accordion__row-header',
					row.headerClassName,
				) }
				onClick={ ( e ) => onClick( e, row ) }
				{ ...getHeaderAttrs( row ) }
			>
				{ row.header }
			</Button>
			<div
				className={ classNames(
					'tribe-editor__accordion__row-content',
					row.contentClassName,
				) }
				{ ...getContentAttrs( row ) }
			>
				{ row.content }
			</div>
		</article>
	);
};

AccordionRow.propTypes = {
	row: PropTypes.shape( {
		content: PropTypes.node,
		contentClassName: PropTypes.string,
		contentId: PropTypes.string.isRequired,
		header: PropTypes.node,
		headerClassName: PropTypes.string,
		headerId: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired,
		onClick: PropTypes.func,
		onClose: PropTypes.func,
		onOpen: PropTypes.func,
	} ).isRequired,
	index: PropTypes.number,
};

export default AccordionRow;
