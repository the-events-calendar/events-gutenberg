/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import { Dashicon } from '@wordpress/components';

const AccordionHeader = ( { active, title, iconClass, titleClass } ) => (
	<Fragment>
		<Dashicon
			className={ iconClass }
			icon={ active ? 'arrow-up' : 'arrow-down' }
		/>
		<span className={ titleClass }>{ title }</span>
	</Fragment>
);

AccordionHeader.propTypes = {
	active: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	iconClass: PropTypes.string,
	titleClass: PropTypes.string,
};

AccordionHeader.defaultProps = {
	active: false,
	title: '',
	iconClass: 'tribe-editor__options-header-icon',
	titleClass: 'tribe-editor__options-header-text',
};

export default AccordionHeader;
