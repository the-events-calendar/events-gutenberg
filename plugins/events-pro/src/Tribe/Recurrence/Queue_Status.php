<?php

/**
 * Class Tribe__Gutenberg__Events_Pro__Recurrence__Queue_Status
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Recurrence__Queue_Status {
	
	/**
	 * The Queue_Realtime constructor method.
	 */
	public function hook() {
		if ( ! class_exists( 'Tribe__Events__Ajax__Operations' ) ) {
			return;
		}
		add_action( 'wp_ajax_gutenberg_events_pro_recurrence_queue', array( $this, 'ajax' ) );
	}
	
	/**
	 * Method used to reply back into the ajax admin request
	 *
	 * @since TBD
	 */
	public function ajax() {
		$post_id = (int) tribe_get_request_var( 'post_id', 0 );
		$nonce   = sanitize_text_field( tribe_get_request_var( 'recurrence_queue_status_nonce', '' ) );
		
		$response = false;
		if (
			tribe_is_recurring_event( $post_id )
			&& wp_verify_nonce( $nonce, $this->get_ajax_action() )
		) {
			$response = $this->process( $post_id );
		}
		exit( $this->response( $response ) );
	}
	
	/**
	 * Function used to trigger que recurrence Queue
	 *
	 * @since TBD
	 *
	 * @param $post_id
	 *
	 * @return array
	 */
	public function process( $post_id ) {
		$queue = new Tribe__Events__Pro__Recurrence__Queue( $post_id );
		
		$is_empty = $queue->is_empty();
		if ( ! $is_empty ) {
			$queue_processor = Tribe__Events__Pro__Main::instance()->queue_processor;
			if ( null !== $queue_processor ) {
				$queue_processor->process_batch( $post_id );
			}
		}
		
		$start_dates = tribe_get_recurrence_start_dates( $post_id );
		
		return array(
			'done'            => $is_empty,
			'items_created'   => count( $start_dates ),
			'last_created_at' => end( $start_dates ),
			'percentage'      => $is_empty ? 100 : $queue->progress_percentage(),
		);
	}
	
	/**
	 * Return the nonce for the ajax action
	 *
	 * @since TBD
	 *
	 * @return string
	 */
	public function get_ajax_nonce() {
		return wp_create_nonce( $this->get_ajax_action() );
	}
	
	/**
	 * Name of the action used on the page to create the nonce
	 *
	 * @since TBD
	 *
	 * @return string
	 */
	public function get_ajax_action() {
		return 'gutenberg_events_pro_recurrence_queue_status' . get_current_user_id();
	}
	
	/**
	 * Exit and return the response as json encoded string
	 *
	 * @since TBD
	 *
	 * @param $data
	 * @return string
	 */
	public function response( $data ) {
		$encoded = json_encode( $data );
		return false === $encoded ? '' : $encoded;
	}
}
