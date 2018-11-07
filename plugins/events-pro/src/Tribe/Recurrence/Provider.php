<?php

/**
 * Initialize Gutenberg editor blocks
 *
 * @since 0.2.7-alpha
 */
class Tribe__Gutenberg__Events_Pro__Recurrence__Provider {
	public function hook() {
		// Add 30 as priority as 20 is the default set by PRO so we need to hook up later than that
		// To avoid being override by PRO
		add_action( 'tribe_events_update_meta', array( $this, 'to_classic_format' ), 30 );
	}
	
	/**
	 * Format events from block into classic shape for recurrence structure
	 *
	 * @since TBD
	 *
	 * @param $event_id
	 *
	 * @return bool
	 */
	public function to_classic_format( $event_id ) {
		/** @var Tribe__Gutenberg__Events_Pro__Meta $meta */
		$meta       = tribe( 'gutenberg.events-pro.meta' );
		$rules      = json_decode( $meta->get_value( $event_id, '_tribe_blocks_recurrence_rules' ), true );
		$exclusions = json_decode( $meta->get_value( $event_id, '_tribe_blocks_recurrence_exclusions' ), true );
		
		// Don't do anything if the block does not have any data.
		if ( is_null( $rules ) ) {
			return false;
		}
		
		$data = array(
			'EventStartDate' => get_post_meta( $event_id, '_EventStartDate', true ),
			'EventEndDate'   => get_post_meta( $event_id, '_EventEndDate', true ),
			'recurrence'     => array(
				'rules'      => $this->parse_rules( $rules ),
				'exclusions' => $this->parse_rules( $exclusions ),
			),
		);
		
		/**
		 * Use same mechanism as PRO to update the parsed data into the event
		 */
		$meta_builder    = new Tribe__Events__Pro__Recurrence__Meta_Builder( $event_id, $data );
		$recurrence_meta = $meta_builder->build_meta();
		$updated         = update_post_meta( $event_id, '_EventRecurrence', $recurrence_meta );
		
		$events_saver = new Tribe__Events__Pro__Recurrence__Events_Saver( $event_id, $updated );
		
		return $events_saver->save_events();
	}
	
	/**
	 * Convert all the rules from the Block into classic rules using the
	 *
	 * @since TBD
	 *
	 * @param array $rules
	 *
	 * @return array
	 */
	protected function parse_rules( $rules ) {
		if ( null === $rules ) {
			return array();
		}
		$parsed = array();
		foreach ( $rules as $rule ) {
			$converter = new Tribe__Gutenberg__Events_Pro__Recurrence__Classic( $rule );
			$converter->parse();
			$parsed[]  = $converter->get_parsed();
		}
		
		return $parsed;
	}
}

