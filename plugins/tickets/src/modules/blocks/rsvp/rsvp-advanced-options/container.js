/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import RSVPAdvancedOptions from './template';
import { actions } from '@moderntribe/common/data/reducers/ui';
import { withStore } from '@moderntribe/common/hoc';

const mapDispatchToProps = ( dispatch ) => ( {
	addAccordion: ( accordionId ) => (
		dispatch( actions.addAccordion( accordionId ) )
	),
	removeAccordion: ( accordionId ) => (
		dispatch( actions.removeAccordion( accordionId ) )
	),
} );

export default compose(
	withStore(),
	connect( null, mapDispatchToProps ),
)( RSVPAdvancedOptions );
