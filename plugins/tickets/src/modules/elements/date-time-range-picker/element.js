/**
 * External dependencies
 */
import { connect } from 'redux';

/**
 * Internal dependencies
 */
import DateTimeRangePicker from './template';

const mapStateToProps = ( state ) => ( {
	fromDate: 'January 1, 2018',
	fromTime: '12:00:00',
	toDate: 'January 1, 2018',
	toTime: '12:00:00',
} );

const mapDispatchToProps = ( dispatch ) => ( {

} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( DateTimeRangePicker );
