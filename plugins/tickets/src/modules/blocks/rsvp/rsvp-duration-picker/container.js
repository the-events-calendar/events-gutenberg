/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import DateTimeRangePicker from './template';

const mapStateToProps = ( state ) => ( {
	fromDate: 'September 3, 2018',
	fromTime: '09:00',
	isSameDay: false,
	toDate: 'September 6, 2018',
	toTime: '15:00',
} );

const mapDispatchToProps = ( dispatch ) => ( {
	onFromDateChange: () => {},
	onFromTimePickerChange: () => {},
	onFromTimePickerClick: () => {},
	onToDateChange: () => {},
	onToTimePickerChange: () => {},
	onToTimePickerClick: () => {},
} );

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( DateTimeRangePicker );
