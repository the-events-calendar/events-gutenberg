/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/elements';

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

	return (
		rows.length && (
			<div
				aria-multiselectable="true"
				className={ classnames( 'tribe-editor__accordion', className ) }
				role="tablist"
				{ ...containerAttrs }
			>
				{ rows.map( ( row, index ) => {
					const headerAttrs = getHeaderAttrs( row );
					const contentAttrs = getContentAttrs( row );

					return (
						<article
							className={ classnames(
								'tribe-editor__accordion__row',
								{ 'active': row.isActive },
							) }
							key={ index }
						>
							<Button
								className={ classnames(
									'tribe-editor__accordion__row-header',
									row.headerClassName,
								) }
								label={ row.header }
								onClick={ () => {} }
								attrs={ headerAttrs }
							>
								{ row.header }
							</Button>
							<div
								className={ classnames(
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
		isActive: PropTypes.bool.isRequired
	} ).isRequired ).isRequired,
};

export default Accordion;
