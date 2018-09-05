/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/src/modules/elements';
import './style.pcss';

const ActionButton = ( { children, ...props } ) => (
	<Button
		className={ classNames( 'tribe-editor__btn--label', 'tribe-editor__tickets-btn--action' ) }
		{ ...props }
	>
		{ children }
	</Button>
);

ActionButton.propTypes = {
	children: PropTypes.node,
};

export default ActionButton;
