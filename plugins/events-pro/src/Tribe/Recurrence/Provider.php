<?php

/**
 * Initialize Gutenberg editor blocks
 *
 * @since 0.2.7-alpha
 */
class Tribe__Gutenberg__Events_Pro__Recurrence__Provider {
	public function hook() {
		add_filter( 'rest_pre_echo_response', array( $this, 'trigger_recurrence_rules' ), 10, 3 );
	}
	
	/**
	 * Hook before the response of a endpoint is executed to maybe trigger the recurrence rules, in
	 * order to execute a recurrence rule it must follow the following:
	 *
	 * - if $request is valid
	 * - and has an ID that is of type Events
	 * - and is part of the valid methods that are used to update / create a new item (PUT/POST)
	 * - and is not part of an /autosaves request as shouldn't be trigger on auto saves
	 *
	 * The hook does not modify the original response so the response is returned without any
	 * modifications on it
	 *
	 * @since TBD
	 *
	 * @param $result
	 * @param $server
	 * @param $request
	 *
	 * @return mixed
	 */
	public function trigger_recurrence_rules( $result, $server, $request ) {
		$valid_methods = array( 'POST', 'PUT', 'PATCH' );
		
		if (
			$request instanceof WP_REST_Request
			&& get_post_type( $request->get_param( 'id' ) ) === Tribe__Events__Main::POSTTYPE
			&& in_array( $request->get_method(), $valid_methods )
			&& false === strpos(   $request->get_route(), '/autosaves' )
		) {
			$this->to_classic_format( $request->get_param( 'id' ) );
		}
		return $result;
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
		/** @var Tribe__Gutenberg__Events_Pro__Recurrence__Blocks_Meta $blocks_meta */
		$blocks_meta = tribe( 'gutenberg.events-pro.recurrence.blocks-meta' );
		$rules      = json_decode( $meta->get_value( $event_id, $blocks_meta->get_rules_key() ), true );
		$exclusions = json_decode( $meta->get_value( $event_id, $blocks_meta->get_exclusions_key() ), true );
		
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

