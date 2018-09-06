/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import RSVPAdvancedOptions from './template';

const mapStateToProps = ( state ) => ( {
	accordionId: 'placeholder',
	contentId: 'placeholder',
	headerId: 'placeholder',
	isActive: false,
} );

const mapDispatchToProps = ( dispatch ) => ( {
	onClick: () => {},
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( RSVPAdvancedOptions );
