export const toggleInput = ( input, isActive ) => {
	input.setAttribute( 'value', isActive ? '0' : '1' );
	return input;
};

export const toggleButton = ( button, isActive ) => {
	if ( isActive ) {
		button.classList.remove( 'tribe-custom-field-gutenberg-checkbox--checked' );
	} else {
		button.classList.add( 'tribe-custom-field-gutenberg-checkbox--checked' );
	}
	return button;
};

export const attachBehavior = ( isCreatingFields ) => ( button ) => {
	if ( button._attached ) {
		return;
	}

	button._attached = true;
	const input = button.parentNode.querySelector( 'input[type="hidden"]' );
	if ( ! input ) {
		return;
	}

	// Reset input and button fields is is creating a new duplicate of the same field
	if ( isCreatingFields ) {
		toggleInput( input, false );
		toggleButton( button, false );
	}

	button.addEventListener( 'click', () => {
		const isActive = input.getAttribute( 'value' ) === '1';
		toggleInput( input, isActive );
		toggleButton( button, isActive );
	} );
};

export const init = ( isCreatingFields ) => () => {
	[].slice
		.call( document.querySelectorAll( '.tribe-custom-field-gutenberg-checkbox' ) )
		.map( attachBehavior( isCreatingFields ) );
};

const customFields = () => {
	const addButton = document.querySelector( '.add-another-field.tribe-add-post.button' );
	if ( addButton ) {
		addButton.addEventListener( 'click', () => setTimeout( init( true ) ) );
	}
	init( false )();
};

customFields();
