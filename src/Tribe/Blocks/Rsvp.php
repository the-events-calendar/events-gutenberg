<?php
class Tribe__Events_Gutenberg__Blocks__Rsvp
extends Tribe__Events_Gutenberg__Blocks__Abstract {

	/**
	 * Init class
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function hook() {
		// Add AJAX calls
		add_action( 'wp_ajax_rsvp-form', array( $this, 'rsvp_form' ) );
		add_action( 'wp_ajax_nopriv_rsvp-form', array( $this, 'rsvp_form' ) );

		// @TODO: Need to get the instance of `Tribe__Tickets__Tickets` to remove the `front_end_tickets_form_in_content` filter from `the_content`
		// remove_filter( 'the_content', array( Tribe__Tickets__Tickets::get_instance(), 'front_end_tickets_form_in_content', 15 ) );
	}

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  TBD
	 *
	 * @return string
	 */
	public function slug() {
		return 'rsvp';
	}

	/**
	 * Set the default attributes of this block
	 *
	 * @since  TBD
	 *
	 * @return array
	 */
	public function default_attributes() {

		$defaults = array();

		return $defaults;
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  TBD
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = array() ) {
		$args['attributes'] = $this->attributes( $attributes );
		$args['tickets']    = $this->get_tickets();

		// Add the rendering attributes into global context
		tribe( 'gutenberg.template' )->add_template_globals( $args );

		// enqueue assets
		tribe_asset_enqueue( 'tribe-gutenberg-rsvp' );

		return tribe( 'gutenberg.template' )->template( array( 'blocks', $this->slug() ), $args, false );
	}

	/*
	 * Method to get the RSVP tickets
	 *
	 * @since  TBD
	 *
	 * @return array
	*/
	protected function get_tickets() {

		// Get the event id
		$event_id = get_the_id();

		// Bail if there's no event id
		if ( ! $event_id ) {
			return array();
		}

		// Get the tickets IDs for this event
		$ticket_ids = tribe( 'tickets.rsvp' )->get_tickets_ids( $event_id );

		// Bail if we don't have tickets
		if ( ! $ticket_ids ) {
			return array();
		}

		$tickets = array();

		foreach ( $ticket_ids as $post ) {

			// Get the ticket
			$ticket = tribe( 'tickets.rsvp' )->get_ticket( $event_id, $post );

			// Continue if is not RSVP, we only want RSVP tickets
			if ( 'Tribe__Tickets__RSVP' !== $ticket->provider_class ) {
				continue;
			}

			// continue if it's not in date range
			if ( ! $ticket->date_in_range() ) {
				continue;
			}

			$tickets[] = $ticket;
		}

		return $tickets;
	}

	/**
	 * Register block assets
	 *
	 * @since  TBD
	 *
	 * @param  array $attributes
	 *
	 * @return void
	 */
	public function assets() {
		$gutenberg = tribe( 'gutenberg' );

		tribe_asset(
			$gutenberg,
			'tribe-gutenberg-rsvp',
			'rsvp.js',
			array( 'jquery', 'jquery-ui-datepicker' ),
			null,
			array(
				'type'         => 'js',
				'localize'     => array(
					'name' => 'TribeRsvp',
					'data' => array(
						'ajaxurl' => admin_url( 'admin-ajax.php', ( is_ssl() ? 'https' : 'http' ) )
					),
				),
			)
		);
	}


	/**
	 * Function that returns the RSVP form from an AJAX call
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function rsvp_form() {

		$response = array( 'success' => false, 'html' => '', 'view' => 'rsvp-form' );

		if ( ! isset( $_POST['ticket_id'] ) ) {
			die( - 1 );
		}

		ob_start();

		$args = array(
			'ticket_id' => intval( $_POST['ticket_id'] )
		);

		tribe( 'gutenberg.template' )->template( 'blocks/rsvp/content/form', $args );

		$response['html']    = ob_get_clean();
		$response['success'] = true;

		apply_filters( 'tribe_events_rsvp_form', $response );

		header( 'Content-type: application/json' );
		echo json_encode( $response );
		die();

	}
}