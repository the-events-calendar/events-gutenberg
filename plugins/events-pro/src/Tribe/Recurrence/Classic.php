<?php

/**
 * Class Tribe__Gutenberg__Events_Pro__Recurrence__Blocks
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Recurrence__Classic
	implements Tribe__Gutenberg__Events_Pro__Recurrence__Parser_Interface {
	
	/**
	 * Reference to the original fields of the request
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $fields = array();
	/**
	 * Default data structure
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $data = array(
		'type'   => '',
		'custom' => array(),
	);
	
	/**
	 * Map frmo Gutenberg types into Old types of Recurrence Events
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $types = array(
		'single'  => Tribe__Events__Pro__Recurrence__Custom_Types::DATE_CUSTOM_TYPE,
		'daily'   => Tribe__Events__Pro__Recurrence__Custom_Types::DAILY_CUSTOM_TYPE,
		'weekly'  => Tribe__Events__Pro__Recurrence__Custom_Types::WEEKLY_CUSTOM_TYPE,
		'monthly' => Tribe__Events__Pro__Recurrence__Custom_Types::MONTHLY_CUSTOM_TYPE,
		'yearly'  => Tribe__Events__Pro__Recurrence__Custom_Types::YEARLY_CUSTOM_TYPE,
	);
	
	/**
	 * Span day and the value of each
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $day_span = array(
		'same_day' => 0,
		'next_day' => 1,
		'second_day' => 2,
		'third_day' => 3,
		'fourth_day' => 4,
		'fifth_day' => 5,
		'sixth_day' => 6,
		'seventh_day' => 7,
	);
	
	/**
	 * Array to map back types from BLocks into Recurrence format
	 *
	 * @since TBD
	 *
	 * @var array
	 */
	protected $limit_types = array(
		'count' => 'After',
		'date'  => 'On',
		'never' => 'Never',
	);
	
	public function __construct( $args = array() ) {
		
		$this->fields = $args;
		
		if ( empty( $args ) || ! $this->has_valid_fields() ) {
			return;
		}
		
		$this->set_type( $args['type'] );
		$this->set_custom_args();
		$this->maybe_set_interval();
		$this->maybe_set_limit_type();
		$this->maybe_set_limit();
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
			$this->fields['type'],
			$this->fields['start_time'],
			$this->fields['end_time'],
			$this->fields['all_day'],
			$this->fields['multi_day']
		);
	}
	
	/**
	 * Set the type of the recurrent rule
	 *
	 * @since TBD
	 *
	 * @param string $type
	 *
	 * @return mixed|void
	 */
	public function set_type( $type = '' ) {
		if ( isset( $this->types[ $type ] ) ) {
			$this->data['type'] = $this->types[ $type ];
		}
	}
	
	/**
	 * Set the custom arguments / default per recurrence
	 *
	 * @since TBD
	 */
	protected function set_custom_args() {
		$this->data['custom'] = array(
			'same-time'  => 'no',
			'start-time' => $this->fields['start_time'],
			'end-time'   => $this->fields['end_time'],
		);
		
		if ( $this->fields['multi_day'] && isset( $this->fields['multi_day_span'] ) )  {
			$this->data['custom']['end-day'] = $this->day_span[ $this->fields['multi_day_span'] ];
		} else {
			$this->data['custom']['end-day'] = $this->day_span[ 'same_day' ];
		}
		$this->set_custom_args_per_type();
	}
	
	/**
	 * Set the between value that sets the inverval of events
	 *
	 * @since TBD
	 */
	protected function maybe_set_interval() {
		if ( ! isset( $this->fields['between'] ) ) {
			return;
		}
		$this->data['custom']['interval'] = $this->fields['between'];
	}
	
	/**
	 * Set the end-type only for events that are not custom
	 *
	 * @since TBD
	 */
	protected function maybe_set_limit_type() {
		if (
			! isset( $this->fields['limit_type'] )
			|| $this->data['type'] === Tribe__Events__Pro__Recurrence__Custom_Types::DATE_CUSTOM_TYPE
		) {
			return;
		}
		
		$type                   = $this->fields['limit_type'];
		$this->data['end-type'] = isset( $this->limit_types[ $type ] )
			? $this->limit_types[ $type ]
			: $this->limit_types['never'];
	}
	
	/**
	 * Set limit values only when the end type is:
	 *
	 * - After / After a specific amount of events
	 * - On / On a specific date
	 *
	 * @since TBD
	 */
	public function maybe_set_limit() {
		if ( ! isset( $this->fields['limit'], $this->data['end-type'] ) ) {
			return;
		}
		
		switch ( $this->data['end-type'] ) {
			case $this->limit_types['date']:
				$this->data['end'] = $this->fields['limit'];
				break;
			case $this->limit_types['count']:
				$this->data['end-count'] = $this->fields['limit'];
				break;
		}
	}
	
	/**
	 * Set custom arguments based on the type of recurrence rule.
	 *
	 * @since TBD
	 */
	protected function set_custom_args_per_type() {
		switch ( $this->data['type'] ) {
			case Tribe__Events__Pro__Recurrence__Custom_Types::DATE_CUSTOM_TYPE:
				if ( isset( $this->fields['start_date'] ) ) {
					$this->data['custom']['date'] = array(
						'date' => $this->fields['start_date'],
					);
				}
				break;
			case Tribe__Events__Pro__Recurrence__Custom_Types::WEEKLY_CUSTOM_TYPE:
				$this->data['custom']['week'] = array(
					'day' => isset( $this->fields['days'] ) ? $this->fields['days'] : array(),
				);
				break;
			case Tribe__Events__Pro__Recurrence__Custom_Types::MONTHLY_CUSTOM_TYPE:
				$this->data['custom']['month'] = $this->add_week();
				break;
			case Tribe__Events__Pro__Recurrence__Custom_Types::YEARLY_CUSTOM_TYPE:
				$this->data['custom']['year'] = $this->add_months();
				break;
		}
	}
	
	/**
	 * Convert the week and day values into corresponding values
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	protected function add_week() {
		$fields = array();
		
		if ( ! isset( $this->fields['day'] ) ) {
			return $fields;
		}
		
		$fields = array(
			'same-day' => 'no',
			'number'   => $this->fields['day'],
		);
		
		if ( isset( $this->fields['week'] ) && $this->fields['week'] !== null ) {
			$fields['number'] = ucfirst( $this->fields['week'] );
			$fields['day']    = $this->fields['day'];
		}
		
		return $fields;
	}
	
	/**
	 * Set the structure for the month type
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	public function add_months() {
		$months = isset( $this->fields['month'] ) ? $this->fields['month'] : array();
		return array_merge(
			array( 'month' => $months ),
			$this->add_week()
		);
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
