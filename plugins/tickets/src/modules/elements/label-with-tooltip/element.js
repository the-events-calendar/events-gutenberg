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

const Label = ( { id, label } ) => {
	const labelForm = (
		<label className="tribe-editor__label-with-tooltip__label" htmlFor={ id }>
			{ label }
		</label>
	);

	const pseudoLabel = (
		<span className="tribe-editor__label-with-tooltip__label">{ label }</span>
	);

	return id ? labelForm : pseudoLabel;
}

Label.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
};

const LabelWithTooltip = ( {
	className,
	label,
	tooltipLabel,
	tooltipPosition,
	tooltipText,
	id,
} ) => (
	<div className={ classNames(
		'tribe-editor__label-with-tooltip',
		className,
	) }>
		<Label id={ id } label={ label } />
		<Tooltip
			label={ tooltipLabel }
			labelClassName="tribe-editor__label-with-tooltip__tooltip-label"
			position={ tooltipPosition }
			text={ tooltipText }
		/>
	</div>
);

LabelWithTooltip.defaultProps = {
	label: '',
	id: '',
	tooltipPosition: 'top right',
};

LabelWithTooltip.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.node,
	tooltipLabel: PropTypes.node,
	tooltipPosition: PropTypes.oneOf( [
		'top left',
		'top center',
		'top right',
		'bottom left',
		'bottom center',
		'bottom right',
	] ),
	tooltipText: PropTypes.string,
};

export default LabelWithTooltip;
