/**
 * External Dependencies
 */
import React from 'react';
import { noop, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.pcss';

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
const Dashboard = ({ className, direction, open, children }) => {
	const getContainerClass = () => {
		return classNames(
			'tribe-editor__dashboard__container',
			`tribe-editor__dashboard__container--${ direction }`,
			{ 'tribe-editor__dashboard__container--open': open },
			...className,
		);
	}

	return (
		<div className={ getContainerClass() }>
			<div className="tribe-editor__dashboard">
				{ children }
			</div>
		</div>
	);
}

Dashboard.defaultProps = {
	open: false,
	className: '',
	direction: directions.down,
};

Dashboard.propTypes = {
	open: PropTypes.bool,
	className: PropTypes.string,
	direction: PropTypes.oneOf( Object.keys( directions ) ),
};

export default Dashboard;
