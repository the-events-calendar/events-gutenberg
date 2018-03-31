const {Component} = wp.element
import PropTypes from 'prop-types'
import validator from 'validator';
import { isFunction, noop } from 'lodash';

class Input extends Component {

	static propTypes = {
		validated: PropTypes.bool,
		required: PropTypes.bool,
	}

	static defaultProps = {
		required: false,
		validate: false,
	}

	constructor() {
		super(...arguments);

		this.state = {
			isValid: this.validate(''),
		}
	}

	onChange = (event) => {
		const { onChange, onComplete, validate } = this.props;
		let callback = isFunction( onChange ) ? onChange : noop;
		let completeCallback = isFunction( onComplete ) ? onComplete : noop;

		if ( validate ) {
			this.setState({ isValid: this.validate(event.target.value) }, completeCallback );
			callback(event);
		} else {
			completeCallback();
			callback(event);
		}
	}

	validate(value) {
		const { validateCallback } = this.props;
		return isFunction( validateCallback ) ? validateCallback(value) : this.maybeValidate(value);
	}

	maybeValidate = ( value ) => {
		const { type, required } = this.props;

		if ( value.length === 0 ) {
			return ! required;
		}

		let isValid = true;
		switch (type) {
			case 'phone':
				isValid = validator.isMobilePhone( value, 'any' );
			break;
			case 'email':
				isValid = validator.isEmail( value );
				break;
			case 'url':
				isValid = validator.isURL( value );
				break;
		}
		return isValid;
	}

	isValid() {
		return this.state.isValid;
	}

	focus() {
		this.input.focus();
	}

	getClassName() {
		const { className, validate } = this.props;
		const { isValid } = this.state;
		let classes = className ? className.split( ' ' ) : [];

		if ( validate ) {
			if ( isValid ) {
				classes.push( 'is-valid' );
			} else {
				classes.push( 'is-invalid' );
			}
		}

		return classes
			.filter( (className) => className && className.length )
			.join(' ');
	}

	render () {
		// Remove properties that are not part of the DOM.
		const { onComplete, required, validate, ...properties} = this.props;
		return <input
			{...properties}
			className={`${this.getClassName()}`}
			ref={(input) => this.input = input }
			onChange={this.onChange}
		/>
	}
}

export default Input