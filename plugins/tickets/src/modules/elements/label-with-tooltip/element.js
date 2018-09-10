/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Tooltip } from '@moderntribe/common/elements';
import './style.pcss';

const LabelWithTooltip = ( {
	className,
	label,
	tooltipLabel,
	tooltipText,
} ) => (
	<div className={ classNames(
		'tribe-editor__label-with-tooltip',
		className,
	) }>
		<span className="tribe-editor__label-with-tooltip__label">
			{ label }
		</span>
		<Tooltip
			label={ tooltipLabel }
			labelClassName="tribe-editor__label-with-tooltip__tooltip-label"
			text={ tooltipText }
		/>
	</div>
);

LabelWithTooltip.defaultProps = {
	label: '',
};

LabelWithTooltip.propTypes = {
	className: PropTypes.string,
	label: PropTypes.node,
	tooltipLabel: PropTypes.node,
	tooltipText: PropTypes.string,
};

export default LabelWithTooltip;
