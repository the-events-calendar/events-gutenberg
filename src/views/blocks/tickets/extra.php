<?php
$ticket = $this->get( 'ticket' );
?>
<div
	class="tribe-block__tickets__item__extra"
>
	<?php $this->template( 'blocks/tickets/extra-price' ); ?>
	<?php $this->template( 'blocks/tickets/extra-available' ); ?>
</div>
