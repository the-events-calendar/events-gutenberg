/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import LabeledItem from '@moderntribe/common/elements/labeled-item/element';
import Link from '@moderntribe/common/elements/link/element';


const LabelWithLink = ( {
	className,
	label,
	linkDisabled,
	linkHref,
	linkTarget,
	linkText,
} ) => {
	const getLink = () => {
		const linkClass = 'tribe-editor__label-with-link__link';

		linkDisabled
			? <span classname={ linkClass }>{ linkText }</span>
			: (
				<Link
					className="tribe-editor__label-with-link__link"
					href={ linkHref }
					target={ linkTarget }
				>
					{ linkText }
				</Link>
			);
	};

	return (
		<LabeledItem
			className={ classNames( 'tribe-editor__label-with-link', className ) }
			label={ label }
		>
			{ getLink() }
		</LabeledItem>
	);
};

LabelWithLink.propTypes = {
	className: PropTypes.string,
	label: PropTypes.node,
	linkDisabled: PropTypes.bool,
	linkHref: PropTypes.string.isRequired,
	linkTarget: PropTypes.string,
	linkText: PropTypes.string,
};

export default LabelWithLink;
