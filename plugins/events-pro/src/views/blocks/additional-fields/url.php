<?php
$is_pristine = $this->attr( 'isPristine' );
$label       = $this->attr( 'label' );
$output      = $this->attr( 'output' );

if ( $is_pristine ) {
	return;
}
?>
<div class="tribe-block tribe-block__additional-field tribe-block__additional-field__url">
	<strong><?php echo esc_html( $label ); ?>: </strong>
	<span><a href="<?php echo esc_url( $output ); ?>"><?php echo esc_html( $output ); ?></a></span>
</div>
