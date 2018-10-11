/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Label from '@moderntribe/events-pro/elements/label/element';
import Row from '@moderntribe/events-pro/elements/row/element';
import './style.pcss';

const LabeledRow = ( { children, className, label } ) => (
	<Row className={ classNames( 'tribe-editor__labeled-row', className ) }>
		<Label className="tribe-editor__labeled-row__label">
			{ label }
		</Label>
		<div className="tribe-editor__labeled-row__content">
			{ children }
		</div>
	</Row>
);

LabeledRow.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	label: PropTypes.node,
};

export default LabeledRow;
