<?php

/**
 * Class Tribe__Gutenberg__Events_Pro__Recurrence__Blocks
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Recurrence__Blocks
	implements Tribe__Gutenberg__Events_Pro__Recurrence__Parser_Interface {
	
	/**
	 * Array holding the parsed data
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $data = array();
	
	/**
	 * Array holding the fields values from the original recurrence rule before moving into the blocks
	 * format
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $fields = array();
	
	/**
	 * Array that holds the custom data from the fields
	 *
	 * @since TBD
	 *
	 * @var array|mixed
	 */
	protected $custom = array();
	
	/**
	 * Map of the types from classic into blocks
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $types = array(
		Tribe__Events__Pro__Recurrence__Custom_Types::DATE_CUSTOM_TYPE    => 'single',
		Tribe__Events__Pro__Recurrence__Custom_Types::DAILY_CUSTOM_TYPE   => 'daily',
		Tribe__Events__Pro__Recurrence__Custom_Types::WEEKLY_CUSTOM_TYPE  => 'weekly',
		Tribe__Events__Pro__Recurrence__Custom_Types::MONTHLY_CUSTOM_TYPE => 'monthly',
		Tribe__Events__Pro__Recurrence__Custom_Types::YEARLY_CUSTOM_TYPE  => 'yearly',
	);
	
	/**
	 * Array with the data that maps the different types used between the classic / blocks editor
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $limit_types = array(
		'After' => 'count',
		'On'    => 'date',
		'Never' => 'never',
	);
	
	/**
	 * Number of day span, the index of each value represents the value on the block UI
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $day_span = array(
		'same_day',
		'next_day',
		'second_day',
		'third_day',
		'fourth_day',
		'fifth_day',
		'sixth_day',
		'seventh_day',
	);
	
	/**
	 * Tribe__Gutenberg__Events_Pro__Recurrence__Blocks constructor.
	 *
	 * @since TBD
	 *
	 * @param array $fields
	 */
	public function __construct( $fields = array() ) {
		
		$this->fields = $fields;
		$this->set_up();
	}
	
	/**
	 * Setup values into the data variable
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	public function set_up(){
		if ( empty( $fields ) || ! $this->has_valid_fields() ) {
			return false;
		}
		
		// All day per event is not enabled yet
		$this->data['all_day']   = false;
		$this->data['multi_day'] = false;
		$this->custom            = $this->fields['custom'];
		$this->set_type( $this->custom['type'] );;
		$this->set_limit_type();
		$this->set_limit_count();
		$this->set_interval();
		$this->set_dates();
		return true;
	}
	
	/**
	 * Check for required field values
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	public function has_valid_fields() {
		return isset(
			$this->fields['EventEndDate'],
			$this->fields['EventStartDate'],
			$this->fields['custom'],
			$this->fields['custom']['type']
		);
	}
	
	/**
	 * Set the type of the Rule
	 *
	 * @since TBD
	 *
	 * @param string $type
	 *
	 * @return mixed|void
	 */
	public function set_type( $type = '' ) {
		if ( ! isset( $this->types[ $type ] ) ) {
			return;
		}
		$this->data['type'] = $this->types[ $type ];
	}
	
	/**
	 * Set the type if `end-type` is present
	 *
	 * @since TBD
	 */
	protected function set_limit_type() {
		if ( ! isset( $this->fields['end-type'] ) ) {
			return;
		}
		$this->data['limit_type'] = $this->limit_types[ $this->fields['end-type'] ];
	}
	
	/**
	 * Set the limit of events if `end-count` is present
	 *
	 * @since TBD
	 */
	protected function set_limit_count() {
		if ( ! isset( $this->fields['end-type'] ) ) {
			return;
		}
		
		switch ( $this->fields['end-type'] ) {
			case 'After':
				if ( isset( $this->fields['end-count'] ) ) {
					$this->data['limit'] = absint( $this->fields['end-count'] );
				}
				break;
			case 'On':
				if ( isset( $this->fields['end'] ) ) {
					$this->data['limit'] = $this->fields['end'];
					$this->data['_limit_date_input'] = date( 'F j, Y', strtotime( $this->fields['end'] ) );
				}
				break;
			case 'Never':
				$this->data['limit'] = false;
				break;
		}
	}
	
	/**
	 * Set the interval of repeated series
	 *
	 * @since TBD
	 */
	protected function set_interval() {
		if ( ! isset( $this->custom['interval'] ) ) {
			return;
		}
		$this->data['between'] = absint( $this->custom['interval'] );
	}
	
	/**
	 * Set the fields into the data according to the type of event happening.
	 *
	 * @since TBD
	 */
	protected function set_dates() {
		
		$this->set_times();
		$this->set_multi_day_span();
		
		switch ( $this->custom['type'] ) {
			case Tribe__Events__Pro__Recurrence__Custom_Types::DATE_CUSTOM_TYPE:
				$this->set_once_fields();
				break;
			case Tribe__Events__Pro__Recurrence__Custom_Types::WEEKLY_CUSTOM_TYPE:
				$this->set_weekly_fields();
				break;
			case Tribe__Events__Pro__Recurrence__Custom_Types::MONTHLY_CUSTOM_TYPE:
				$month = isset( $this->custom['month'] ) ? $this->custom['month'] : array();
				$this->set_month_fields( $month );
				break;
			case Tribe__Events__Pro__Recurrence__Custom_Types::YEARLY_CUSTOM_TYPE:
				$month = isset( $this->custom['year'] ) ? $this->custom['year'] : array();
				$this->set_month_fields( $month );
				$this->set_yearly_fields();
				break;
		}
	}
	
	/**
	 * Set the start_time and end_time for the event if present, if happens on the same-time as the
	 * parent event uses the parent event start / end date to get the data to setup the times
	 *
	 * @since TBD
	 */
	protected function set_times() {
		if ( ! empty( $this->custom['same-time'] ) && $this->custom['same-time'] === 'yes' ) {
			$this->data['start_time'] = date( 'H:i:s', strtotime( $this->fields['EventStartDate'] ) );
			$this->data['end_time']   = date( 'H:i:s', strtotime( $this->fields['EventEndDate'] ) );
		} else {
			if ( isset( $this->custom['start-time'] ) ) {
				$this->data['start_time'] = date( 'H:i:s', strtotime( $this->custom['start-time'] ) );
			}
			if ( isset( $this->custom['end-time'] ) ) {
				$this->data['end_time'] = date( 'H:i:s', strtotime( $this->custom['end-time'] ) );
			}
		}
	}
	
	/**
	 * Set a span of days if `end_day` is present, sets the value of the multi day event as well
	 *
	 * @since TBD
	 */
	public function set_multi_day_span() {
		if ( ! isset( $this->custom['end-day'] ) ) {
			return;
		}
		
		$index = is_numeric( $this->custom['end-day'] ) ? absint( $this->custom['end-day'] ) : 0;
		$this->data['multi_day'] = ( $index > 0 );
		if ( $this->data['multi_day'] ) {
			$this->data['multi_day_span'] = $this->day_span[ $index  % count( $this->day_span ) ];
		}
	}
	
	/**
	 * Set the fields for events that happens only once.
	 *
	 * @since TBD
	 */
	protected function set_once_fields() {
		$date = isset( $this->custom['date'] ) ? $this->custom['date'] : array();
		if ( ! isset( $date['date'] ) ) {
			return;
		}
		$this->data['start_date'] = $date['date'];
		$this->data['_start_date_input'] = date( 'F j, Y', strtotime( $date['date'] ) );
	}
	
	/**
	 * Set the fields used by the week, in this case the number of days selected.
	 *
	 * @since TBD
	 */
	protected function set_weekly_fields() {
		$week = isset( $this->custom['week'] ) ? $this->custom['week'] : array();
		$days = isset( $week['day'] ) && is_array( $week['day'] ) ? $week['day'] : array();
		$this->data['days'] = array_unique( array_map( 'absint', $days ) );
	}
	
	/**
	 * Set the fields used by month the number of day and weekf if present.
	 *
	 * @since TBD
	 *
	 * @param array $month
	 */
	protected function set_month_fields( array $month = array() ) {
		// If an event has an end-day happening on the same day or if same-day is 'yes' it should use
		// the data of the parent event or the $month is not defined we should fallback into the
		// event start / end date
		if (
			( isset( $this->custom['end-day'] ) && $this->custom['end-day'] === 'same day' )
			|| ( isset( $month['same-day'] ) && $month['same-day'] === 'yes' )
			|| empty( $month )
			|| empty( $month['number'] )
		) {
			$same_day = isset( $month['same-day'] ) ? $month['same-day'] : '';
			// Overwrite the ènd-day if `same-day` is different
			if ( $same_day !== 'no' ) {
				$this->data['day']  = absint( date( 'j', strtotime( $this->fields['EventStartDate'] ) ) );
				$this->data['week'] = null;
				
				return;
			}
		}
		
		if ( empty( $month['day'] ) ) {
			$this->data['day']  = absint( $month['number'] );
			$this->data['week'] = null;
		} else {
			$this->data['day']  = absint( $month['day'] );
			$this->data['week'] = strtolower( $month['number'] );
		}
	}
	
	/**
	 * Set all the months of the year selected, make sure the fields are converted into integers
	 *
	 * @since TBD
	 */
	protected function set_yearly_fields() {
		$year = isset( $this->custom['year'] ) ? $this->custom['year'] : array();
		$months = isset( $year['month'] ) ? explode( ',', $year['month'] ) : array();
		$this->data['month'] = array_unique( array_map( 'absint', $months ) );
	}
	
	/**
	 * Return the parsed data
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	public function get_parsed() {
		return $this->data;
	}
}
