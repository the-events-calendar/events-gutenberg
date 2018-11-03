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
import './style.pcss';

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

		return linkDisabled
			? (
				<span classname={ classNames( linkClass, `${ linkClass }--disabled` ) }>
					{ linkText }
				</span>
			)
			: (
				<Link
					className={ linkClass }
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
