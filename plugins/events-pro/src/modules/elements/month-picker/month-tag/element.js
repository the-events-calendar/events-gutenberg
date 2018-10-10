/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/elements';
import { Close as CloseIcon } from '@moderntribe/common/icons';

const MonthTag = ( { label, onClick } ) => (
	<Button className="tribe-editor__month-tag" onClick={ onClick }>
		<CloseIcon />
		{ label }
	</Button>
);

MonthTag.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.onClick,
};

export default MonthTag;
