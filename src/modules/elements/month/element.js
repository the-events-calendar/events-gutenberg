/**
 * Import external dependencies
 */
import { omit, noop, isEqual } from 'lodash';
import DayPicker, { DateUtils } from 'react-day-picker';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import classNames from 'classnames';
import moment from 'moment/moment';

/**
 * Wordpress dependencies
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { equalDates } from 'utils/date';
import './style.pcss';

export default class Month extends Component {

	static propTypes = {
		withRange: PropTypes.bool,
		onSelectDay: PropTypes.func,
		initialRangeDays: PropTypes.number,
		from: PropTypes.instanceOf( Date ),
		to: PropTypes.instanceOf( Date ),
	};

	static defaultProps = {
		withRange: false,
		onSelectDay: noop,
		initialRangeDays: 3,
		from: new Date(),
		to: undefined,
	};

	static getDerivedStateFromProps( nextProps ) {
		return {
			...nextProps,
		};
	}

	constructor( props ) {
		super( ...arguments );

		this.state = {
			...props,
		};
	}

	componentDidMount() {
		this.onSelectCallback();
	}

	selectDay = ( day, { selected } ) => {
		const { withRange } = this.state;
		const { from, to } = this.state;

		if ( equalDates( day, to, from ) ) {
			return;
		}

		if ( withRange ) {
			const range = DateUtils.addDayToRange( day, this.state );

			// if the range was unselected we fallback to the first available day
			if ( range.from === null && range.to === null ) {
				range.from = new Date();
				range.to = undefined;
			}

			if ( range.to && moment( range.to ).isSame( range.from ) ) {
				range.to = undefined;
			}

			this.setState( range, () => {
				this.onSelectCallback();
			} );
		} else {
			this.setState( {
				from: selected ? new Date() : day,
				to: undefined,
			}, () => {
				this.onSelectCallback();
			} );
		}
	};

	onSelectCallback = () => {
		const { onSelectDay } = this.props;
		onSelectDay( omit( this.state, [ 'withRange' ] ) );
	}

	getSelectedDays = () => {
		const { from, withRange, to } = this.state;
		if ( withRange ) {
			return [ from, { from, to }];
		}
		return from;
	}

	render() {
		const { withRange, from, to } = this.state;
		const modifiers = withRange ? { start: from, end: to } : {};
		const containerClass = classNames( { 'tribe-editor__calendars--range': withRange } );

		return (
			<DayPicker
				className={ containerClass }
				numberOfMonths={ 2 }
				modifiers={ modifiers }
				selectedDays={ this.getSelectedDays() }
				onDayClick={ this.selectDay }
				disabledDays={
					{
						before: new Date(),
					}
				}
			/>
		);
	}
}
