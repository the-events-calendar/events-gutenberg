/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Wordpress dependencies
 */
import { Spinner } from '@wordpress/components';

import './style.pcss';

export default ( { className } ) => {
	return (
		<span className={ classNames( [ "tribe-editor__spinner-container", className ] ) }>
			<Spinner />
		</span>
	);
};
