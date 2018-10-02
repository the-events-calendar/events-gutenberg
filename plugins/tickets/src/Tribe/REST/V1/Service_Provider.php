<?php

/**
 * Class Tribe__Gutenberg__Tickets__REST__V1__Service_Provider
 *
 * Add support to: Add / Create / Delete tickets via the WP REST Api
 *
 * @since TBD
 */
class Tribe__Gutenberg__Tickets__REST__V1__Service_Provider extends tad_DI52_ServiceProvider {

	/**
	 * Binds and sets up implementations.
	 */
	public $namespace;

	/**
	 * Registers the classes and functionality needed fro REST API
	 *
	 * @since TBD
	 */
	public function register() {
		tribe_singleton(
			'gutenberg.tickets.rest-v1.endpoints.tickets-single',
			new Tribe__Gutenberg__Tickets__REST__V1__Endpoints__Single_Ticket(
				tribe( 'tickets.rest-v1.messages' ),
				tribe( 'tickets.rest-v1.repository' ),
				tribe( 'tickets.rest-v1.validator' )
			)
		);
		$this->hooks();
	}

	/**
	 * Hooks all the methods and actions the class needs.
	 *
	 * @since TBD
	 */
	private function hooks() {
		add_action( 'rest_api_init', array( $this, 'register_endpoints' ) );
	}

	/**
	 * Registers the REST API endpoints for Event Tickets.
	 *
	 * @since 4.7.5
	 */
	public function register_endpoints() {
		$this->namespace = tribe( 'tickets.rest-v1.main' )->get_events_route_namespace();
		$this->register_single_ticket_endpoint();
		$this->register_ticket_archive_endpoint();
	}

	/**
	 * Registers the REST API endpoint that will handle single ticket requests, to edit and remove
	 * a ticket via the endpoint.
	 *
	 * @since TBD
	 *
	 * @return Tribe__Tickets__REST__V1__Endpoints__Single_Ticket
	 */
	private function register_single_ticket_endpoint() {
		/** @var Tribe__Gutenberg__Tickets__REST__V1__Endpoints__Single_ticket $endpoint */
		$endpoint = tribe( 'gutenberg.tickets.rest-v1.endpoints.tickets-single' );
		register_rest_route( $this->namespace, '/tickets/(?P<id>\\d+)', array(
			array(
				'methods' => WP_REST_Server::EDITABLE,
				'args' => $endpoint->EDIT_args(),
				'callback' => array( $endpoint, 'update' ),
			),
			array(
				'methods' => WP_REST_Server::DELETABLE,
				'args' => $endpoint->DELETE_args(),
				'callback' => array( $endpoint, 'delete' ),
			),
		) );
		return $endpoint;
	}

	/**
	 * Registers the REST API endpoint that will handle ticket archive requests to create a new
	 * ticket inside of the site.
	 *
	 * @since TBD
	 *
	 * @return Tribe__Tickets__REST__V1__Endpoints__Ticket_Archive
	 */
	private function register_ticket_archive_endpoint() {
		/** @var Tribe__Gutenberg__Tickets__REST__V1__Endpoints__Single_ticket $endpoint */
		$endpoint = tribe( 'gutenberg.tickets.rest-v1.endpoints.tickets-single' );
		register_rest_route( $this->namespace, '/tickets', array(
			'methods' => WP_REST_Server::CREATABLE,
			'args' => $endpoint->CREATE_args(),
			'callback' => array( $endpoint, 'create' ),
		) );
		return $endpoint;
	}
}
