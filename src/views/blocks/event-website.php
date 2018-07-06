<?php
/**
 * Renders the event website block
 *
 * @version TBD
 *
 */
$attributes = $this->attributes( array(
	'urlLabel' => '',
	'href' => tribe_get_event_website_url(),
) );

if ( empty( $attributes['href'] ) || empty( $attributes['urlLabel'] ) ) {
	return;
}

$target = apply_filters( 'tribe_get_event_website_link_target', '_self' );
?>

<a
    class="tribe-block__event-website"
    href="<?php echo esc_url( $attributes['href'] ); ?>"
    target="<?php echo esc_attr( $target ); ?>"
    <?php if ( '_blank' === $target  ) : ?> rel="noopener noreferrer" <?php endif; ?>
    >
    <?php echo esc_html( $attributes['urlLabel'] ); ?>
</a>
