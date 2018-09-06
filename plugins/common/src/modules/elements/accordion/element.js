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
import './style.pcss';

const Accordion = ( {
	className,
	containerAttrs,
	rows,
} ) => {
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

	const onClick = ( e, row ) => {
		const content = e.target.nextElementSibling;
		row.isActive
			? slide.up( content, row.contentId, 200 )
			: slide.down( content, row.contentId, 200 );
		row.onClick && row.onClick( e );
	};

	return (
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
				{ rows.map( ( row, index ) => {
					const headerAttrs = getHeaderAttrs( row );
					const contentAttrs = getContentAttrs( row );

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
								label={ row.header }
								onClick={ ( e ) => onClick( e, row ) }
								{ ...headerAttrs }
							>
								{ row.header }
							</Button>
							<div
								className={ classNames(
									'tribe-editor__accordion__row-content',
									row.contentClassName,
								) }
								{ ...contentAttrs }
							>
								{ row.content }
							</div>
						</article>
					);
				} ) }
			</div>
		)
		: null
	);
};

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
		isActive: PropTypes.bool.isRequired,
		onClick: PropTypes.func,
	} ).isRequired ).isRequired,
};

export default Accordion;
