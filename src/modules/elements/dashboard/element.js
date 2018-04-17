/**
 * External Dependencies
 */
import { trim } from 'lodash';
import PropTypes from 'prop-types'
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.pcss';

import { Component } from '@wordpress/element';
import { searchParent } from './../../editor/utils/dom';

/**
 * Enumeration with the available directions.
 *
 * @type {{up: string, down: string}}
 */
export const directions = {
	up: 'up',
	down: 'down',
}

/**
 * Usage of this component:
 *
 * <Dashboard open className="custom" direction={directions.up}>
 *   <AnyComponent></AnyComponent>
 * </Dashboard
 */
export class Dashboard extends Component {

	static defaultProps = {
		open: false,
		className: '',
		direction: directions.down,
	}
	
	static propTypes = {
		open: PropTypes.bool,
		className: PropTypes.string,
		direction: PropTypes.oneOf( Object.keys( directions ) ),
	}

	constructor() {
		super( ...arguments );

		this.state = {
			open: false,
		}

		this.listeners = {
			added: false,
			removed: false,
		}
	}

	/**
	 * Once the component is mounted make sure to set the state based on the property, after that make sure to setup
	 * the listeners accordingly.
	 */
	componentDidMount() {
		this.setState({ open: this.props.open }, this.setupListeners );
	}

	/**
	 * Setup the listeners eiter: attach or remove them based on the status of the component.
	 */
	setupListeners = () => {
		if ( this.state.open ) {
			this.addListeners();
		} else {
			this.removeListeners();
		}
	}

	/**
	 * Attach event listeners when this component is opened.
	 */
	addListeners() {
		if ( this.listeners.added ) {
			return;
		}
		this.listeners.added = true;
		document.addEventListener( 'keydown', this.onKeyDown );
		document.addEventListener( 'click', this.onClickOutside );
	}

	/**
	 * Remove all listeners associated with this component.
	 */
	removeListeners() {
		this.listeners.added = false;
		document.removeEventListener( 'keydown', this.onKeyDown );
		document.removeEventListener( 'click', this.onClickOutside );
	}

	/**
	 * Detect the events associated with the keydown to close the <Dashboard> component when Escape is pressed.
	 *
	 * @param event
	 */
	onKeyDown = ( event ) => {
		const { keyCode, char } = event;
		const ESCAPE_KEY = 27;
		if ( keyCode === ESCAPE_KEY ) {
			this.close();
		}
	}

	/**
	 * Detect clicks on the document and test if they are part of the <Dashboard> component if not close the component.
	 *
	 * @param event
	 */
	onClickOutside = (event) => {
		const { target } = event;
		if ( this.isPartOfDashboard( target) ) {
			return;
		}
		this.close();
	}

	/**
	 * Listen for a click on the document to see if the element is part of the Dashboard if not we should close
	 *
	 * @param node
	 * @returns {boolean}
	 */
	isPartOfDashboard( node ) {
		return searchParent( node, (testNode) => {
			return testNode.classList.contains( 'tribe-dashboard-container' ) || testNode.classList.contains( 'tribe-dashboard' )
		});
	}

	/**
	 * Outside method to open the <Dashboard /> component using a reference
	 */
	open() {
		this.setState({ open: true })
		this.setupListeners();
	}

	/**
	 * Outside method to class the component using a reference.
	 */
	close() {
		this.setState({ open: false })
		this.removeListeners();
	}

	/**
	 * External function to toggle the current state of the component, from open to false or opposite and making sure
	 * calling `open` or `close` to remove / attach the listeners
	 */
	toggle() {
		const { open } = this.state;
		if ( open ) {
			this.close();
		} else {
			this.open();
		}
	}

	/**
	 * Construct a string with the appropiate classs for the main container of the component
	 *
	 * @returns {string}
	 */
	getContainerClass() {
		const { className, direction } = this.props;

		return classNames(
			'tribe-dashboard-container',
			`tribe-dashboard-container--${direction}`,
			{ 'tribe-dashboard-container--open': this.state.open },
			...className
		);
	}

	render() {
		return (
			<div className={this.getContainerClass()}>
				<div className="tribe-dashboard">
					{this.props.children}
				</div>
			</div>
		);
	}
}