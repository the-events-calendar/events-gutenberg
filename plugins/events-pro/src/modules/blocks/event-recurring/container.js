/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { withStore } from '@moderntribe/common/hoc';
import { selectors, actions } from '@moderntribe/events-pro/data/ui';
import EventRecurringBlock from './template';

/**
 * Module Code
 */

const mapStateToProps = state => ( {
	isRepeatBlockVisible: selectors.isRepeatBlockVisible( state ),
} );

const mapDispatchToProps = dispatch => ( {
	toggleRepeatBlocksVisibility: () => dispatch( actions.toggleRepeatBlocksVisibility() ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps )
)( EventRecurringBlock );
