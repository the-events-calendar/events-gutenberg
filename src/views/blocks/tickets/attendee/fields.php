<?php
/**
 * This template renders a Single Ticket content
 * composed by Title and Description currently
 *
 * @version TBD
 *
 */

$ticket = $this->get( 'ticket' );

$meta   = Tribe__Tickets_Plus__Main::instance()->meta();
$fields = $meta->get_meta_fields_by_ticket( $ticket->ID );

?>
<?php foreach ( $fields as $field ) : ?>
	<?php $this->template( 'blocks/tickets/attendee/fields/' . $field->type  , array( 'ticket' => $ticket, 'field' => $field ) ); ?>
<?php endforeach; ?>
