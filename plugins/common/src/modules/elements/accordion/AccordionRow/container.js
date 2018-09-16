/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import { actions, selectors } from '@moderntribe/common/data/reducers/ui';
import { withStore } from '@moderntribe/common/hoc';
import AccordionRow from './template';

const mapStateToProps = ( state, ownProps ) => ( {
	headerId: `accordion-header-${ ownProps.accordionId }`,
	contentId: `accordion-content-${ ownProps.accordionId }`,
	isActive: selectors.getAccordionState( state, ownProps ) || false,
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	onClick: ( e ) => {
		ownProps.onClick && ownProps.onClick( e );
		dispatch( actions.toggleAccordion( ownProps.accordionId ) );
	},
} );

export default compose(
	withStore(),
	connect( mapStateToProps, mapDispatchToProps ),
)( AccordionRow );
