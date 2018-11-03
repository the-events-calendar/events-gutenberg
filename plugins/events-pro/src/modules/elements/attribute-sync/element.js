/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import AttributeSync from './template';
import * as sync from '@moderntribe/events-pro/data/shared/sync';
import { withStore } from '@moderntribe/common/hoc';

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		initialize: () => dispatch( {
			type: sync.INITIALIZE_SYNC,
			setAttributes: ownProps.setAttributes,
			listeners: ownProps.listeners,
			clientId: ownProps.clientId,
			selector: ownProps.selector,
			metaField: ownProps.metaField,
			current: ownProps.current,
		} ),
		cancel: () => dispatch( {
			type: sync.CANCEL_SYNC,
			clientId: ownProps.clientId,
		} ),
	};
};

export default compose(
	withStore(),
	connect( null, mapDispatchToProps ),
)( AttributeSync );
