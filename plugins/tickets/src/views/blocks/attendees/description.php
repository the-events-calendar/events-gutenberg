<?php
/**
 * This template renders the attendees block description
 *
 * @version TBD
 *
 */
$post_id         = $this->get( 'post_id' );
$attendees_total = count( $attendees );
?>
<p><?php echo esc_html( sprintf( _n( 'One person is attending %2$s', '%d people are attending %s', $attendees_total, 'events-gutenberg' ), $attendees_total, get_the_title( $post_id ) ) ); ?></p>