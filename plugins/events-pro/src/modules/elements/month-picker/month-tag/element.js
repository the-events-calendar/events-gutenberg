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
import { Close as CloseIcon } from '@moderntribe/common/icons';

const MonthTag = ( { children, className, onClick } ) => (
	<Button
		className={ classNames( 'tribe-editor__month-tag', className ) }
		onClick={ onClick }
	>
		<CloseIcon />
		{ children }
	</Button>
);

MonthTag.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

export default MonthTag;
