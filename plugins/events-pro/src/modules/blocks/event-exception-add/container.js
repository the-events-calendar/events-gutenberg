/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withStore } from '@moderntribe/common/hoc';
import EventExceptionAddBlock from './template';

/**
 * Module Code
 */

export default compose(
	withStore(),
	connect()
)( EventExceptionAddBlock );
