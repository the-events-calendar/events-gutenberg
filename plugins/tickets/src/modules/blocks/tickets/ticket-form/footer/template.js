/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	Button,
} from '@moderntribe/common/elements';

import './style.pcss';

const Footer = ( props ) => {
	const {
		cancelLabel,
		createLabel,
		onCreate,
		onCancel,
		disableCreation,
	} = props;

	return (
		<div className="tribe-editor__tickets-form__footer">
			<Button
				className="tribe-editor__btn--label tribe-editor__tickets-form__btn-cancel"
				onClick={ onCancel }
			>
				{ cancelLabel }
			</Button>
			<Button
				className="tribe-editor__btn--label tribe-editor__tickets-form__btn-create"
				onClick={ onCreate }
				isDisabled={ disableCreation }
			>
				{ createLabel }
			</Button>
		</div>
	);
};

Footer.propTypes = {
	cancelLabel: PropTypes.string,
	createLabel: PropTypes.string,
	onCreate: PropTypes.func,
	onCancel: PropTypes.func,
	disableCreation: PropTypes.bool,
}

Footer.defaultProps = {
	cancelLabel: __( 'Cancel', 'events-gutenberg' ),
	createLabel: __( 'Create Ticket', 'events-gutenberg' ),
	onCreate: noop,
	onCancel: noop,
	disableCreation: true,
}

export default Footer;
