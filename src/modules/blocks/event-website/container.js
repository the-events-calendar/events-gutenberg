/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

/**
 * Internal dependencies
 */
import withSaveData from 'editor/hoc/with-save-data';
import withStore from 'editor/hoc/with-store';
import * as actions from 'data/blocks/website/actions';
import * as selectors from 'data/blocks/website/selectors';
import EventWebsite from './template';

/**
 * Module Code
 */

const isEmpty = ( label ) => label.trim() === '';

const mapStateToProps = ( state ) => ( {
	url: selectors.getUrl( state ),
	urlLabel: selectors.getLabel( state ),
	isEmpty: isEmpty( state.blocks.website.label ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( EventWebsite );
