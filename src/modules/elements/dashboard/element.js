/**
 * External Dependencies
 */
import { noop } from 'lodash';
import PropTypes from 'prop-types';
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
};

/**
 * Usage of this component:
 *
 * <Dashboard open className="custom" direction={directions.up}>
 *   <AnyComponent></AnyComponent>
 * </Dashboard
 */
export default class Dashboard extends Component {
	static defaultProps = {
		open: false,
		className: '',
		direction: directions.down,
		overflow: false,
		onOpen: noop,
		onClose: noop,
	}

	static propTypes = {
		open: PropTypes.bool,
		overflow: PropTypes.bool,
		className: PropTypes.string,
		direction: PropTypes.oneOf( Object.keys( directions ) ),
		onOpen: PropTypes.func,
		onClose: PropTypes.func,
	}

	constructor() {
		super( ...arguments );

		this.listeners = {
			added: false,
			removed: false,
		};
	}

	/**
	 * Once the component is mounted make sure to set the state based on the property, after
	 * that make sure to setup the listeners accordingly.
	 */
	componentDidMount() {
		this.setupListeners();
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	componentDidUpdate() {
		this.setupListeners();
	}

	/**
	 * Setup the listeners either: attach or remove them based on the status of the component.
	 */
	setupListeners = () => {
		if ( this.props.open ) {
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
		this.props.onOpen();
	}

	/**
	 * Remove all listeners associated with this component.
	 */
	removeListeners() {
		if ( ! this.listeners.added ) {
			return;
		}
		this.listeners.added = false;
		document.removeEventListener( 'keydown', this.onKeyDown );
		document.removeEventListener( 'click', this.onClickOutside );
		this.props.onClose();
	}

	/**
	 * Detect the events associated with the keydown to close the <Dashboard> component when
	 * Escape key is pressed.
	 *
	 * @param {Event} event - The object event
	 */
	onKeyDown = ( event ) => {
		const { keyCode } = event;
		const ESCAPE_KEY = 27;
		if ( keyCode === ESCAPE_KEY ) {
			this.close();
		}
	}

	/**
	 * Detect clicks on the document and test if they are part of the <Dashboard> component
	 * if not close the component.
	 *
	 * @param {Event} event - The object event
	 */
	onClickOutside = ( event ) => {
		const { target } = event;
		if ( Dashboard.isPartOfDashboard( target ) || Dashboard.isPartOfSidebar( target ) ) {
			return;
		}
		this.close();
	};

	/**
	 * Listen for a click on the document to see if the element is part of the Dashboard
	 * if not we should close
	 *
	 * @param {DomNode} node - The element tested against
	 * @returns {boolean} True if the element clicked is part of the dashboard
	 */
	static isPartOfDashboard( node ) {
		return searchParent( node, ( testNode ) => {
			const isContainer = testNode.classList.contains( 'tribe-editor__dashboard__container' );
			const isDashboard = testNode.classList.contains( 'tribe-editor__dashboard' );
			return isDashboard || isContainer;
		} );
	}

	static isPartOfSidebar( node ) {
		return searchParent( node, ( testNode ) => {
			return testNode.classList.contains( 'edit-post-sidebar' );
		} );
	}

	/**
	 * Outside method to open the <Dashboard /> component using a reference
	 */
	open() {
		this.setState( { open: true }, this.setupListeners );
	}

	/**
	 * Outside method to class the component using a reference.
	 */
	close() {
		this.setState( { open: false }, this.removeListeners );
	}

	/**
	 * External function to toggle the current state of the component, from open to false or
	 * opposite and making sure calling `open` or `close` to remove / attach the listeners
	 */
	toggle() {
		if ( this.isOpen() ) {
			this.close();
		} else {
			this.open();
		}
	}

	isOpen() {
		return this.props.open;
	}

	/**
	 * Construct a string with the appropriate class for the main container of the component
	 *
	 * @returns {string} The generated class name for the container
	 */
	getContainerClass() {
		const { className, direction, overflow } = this.props;

		return classNames(
			'tribe-editor__dashboard__container',
			`tribe-editor__dashboard__container--${ direction }`,
			{ 'tribe-editor__dashboard__container--overflow': overflow },
			{ 'tribe-editor__dashboard__container--open': this.props.open },
			...className
		);
	}

	render() {
		return (
			<div className={ this.getContainerClass() }>
				<div className="tribe-editor__dashboard">
					{ this.props.children }
				</div>
			</div>
		);
	}
}
