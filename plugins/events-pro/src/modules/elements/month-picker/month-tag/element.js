/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Close as CloseIcon } from '@moderntribe/common/icons';
import './style.pcss';

const MonthTag = ( { children, className, onClick } ) => (
	<button
		className={ classNames( 'tribe-editor__month-tag', className ) }
		onClick={ onClick }
	>
		<CloseIcon />
		<span className='tribe-editor__month-tag__remove'>
			{ __( 'Remove', 'events-gutenberg' ) }
		</span>
		{ children }
	</button>
);

MonthTag.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

export default MonthTag;
