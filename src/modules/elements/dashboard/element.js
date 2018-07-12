/**
 * External Dependencies
 */
import { noop, isEmpty } from 'lodash';
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
		onKeyDown: noop,
		onClick: noop,
		onOpen: noop,
		onClose: noop,
		targets: [],
	};

	static propTypes = {
		open: PropTypes.bool,
		overflow: PropTypes.bool,
		className: PropTypes.string,
		direction: PropTypes.oneOf( Object.keys( directions ) ),
		onKeyDown: PropTypes.func,
		onClick: PropTypes.func,
		onOpen: PropTypes.func,
		onClose: PropTypes.func,
		targets: PropTypes.array,
	};

	constructor() {
		super( ...arguments );

		this.listeners = {
			added: false,
		};
	}

	/**
	 * Once the component is mounted make sure to set the state based on the property, after
	 * that make sure to setup the listeners accordingly.
	 */
	componentDidMount() {
		this.addListeners();
	}

	componentWillUnmount() {
		this.removeListeners();
	}

	/**
	 * Attach event listeners when this component is opened.
	 */
	addListeners() {
		if ( this.listeners.added ) {
			return;
		}
		this.listeners.added = true;
		document.addEventListener( 'keydown', this.props.onKeyDown );
		document.addEventListener( 'click', this.props.onClick );
	}

	/**
	 * Remove all listeners associated with this component.
	 */
	removeListeners() {
		if ( ! this.listeners.added ) {
			return;
		}
		this.listeners.added = false;
		document.removeEventListener( 'keydown', this.props.onKeyDown );
		document.removeEventListener( 'click', this.props.onClick );
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
			this.onClose();
		}
	};

	/**
	 * Detect clicks on the document and test if they are part of the <Dashboard> component
	 * if not close the component.
	 *
	 * @param {Event} event - The object event
	 */
	onClickOutside = ( event ) => {
		const { target } = event;
		if (
			Dashboard.isPartOfDashboard( target ) ||
			Dashboard.isPartOfPopover( target ) ||
			Dashboard.isPartOfSidebar( target ) ||
			this.validateChildren( target )
		) {
			return;
		}
		this.props.onClose();
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

	/**
	 * Listen for a click on the document to see if the element is part of the Popover component
	 * if not we should close
	 *
	 * @param {DomNode} node - The element tested against
	 * @returns {boolean} True if the element clicked is part of the popover component
	 */
	static isPartOfPopover( node ) {
		return searchParent( node, testNode => testNode.classList.contains( 'components-popover' ) );
	}

	static isPartOfSidebar( node ) {
		return searchParent( node, testNode => testNode.classList.contains( 'edit-post-sidebar' ) );
	}

	/**
	 * Validate if the clicked node is part of any of the targets provided by the component.
	 *
	 * @param {DOMNode} node - The clicked node
	 * @returns {boolean} true if the node is any of the targets
	 */
	validateChildren( node ) {
		const { targets } = this.props;
		return searchParent( node, ( testNode ) => {
			const hasAny = targets.filter( ( className ) => testNode.classList.contains( className ) );
			return ! isEmpty( hasAny );
		} );
	}

	/**
	 * Construct a string with the appropriate class for the main container of the component
	 *
	 * @returns {string} The generated class name for the container
	 */
	getContainerClass() {
		const { className, direction, overflow, open } = this.props;

		return classNames(
			'tribe-editor__dashboard__container',
			`tribe-editor__dashboard__container--${ direction }`,
			{ 'tribe-editor__dashboard__container--overflow': overflow },
			{ 'tribe-editor__dashboard__container--open': open },
			...className,
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
