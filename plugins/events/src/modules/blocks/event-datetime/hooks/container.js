/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal Dependencies
 */
import { selectors } from '@moderntribe/common/data/plugins';
import { withStore } from '@moderntribe/common/hoc';
import PluginDateTimeBlockHooks from './blocks';

const mapStateToProps = ( state, ownProps ) => ( {
	plugins: selectors.getPlugins( state ),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( PluginDateTimeBlockHooks );
