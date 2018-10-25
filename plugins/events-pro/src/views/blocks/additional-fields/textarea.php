<?php
$is_pristine = $this->attr( 'isPristine' );
$label       = $this->attr( 'label' );
$output      = $this->attr( 'output' );

if ( $is_pristine ) {
	return;
}
?>
<div class="tribe-block tribe-block__additional-field tribe-block__additional-field__textarea">
	<strong><?php echo esc_html( $label ); ?>: </strong>
	<div>
		<?php echo nl2br( esc_textarea( $output ) ); ?>
	</div>
</div>
