/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import TicketsDashboard from './dashboard/container';
import TicketsContainer from './container/template';
import './style.pcss';

/*
	const {
		isSelected,
		// @todo limit the usage of the available blocks for this one, however at this point the
		// appender button is only available on the paragraph block
		// see https://github.com/WordPress/gutenberg/issues/8589 once is resolved we should be able
		// to address this one and limit this to only this property
		allowedBlockTypes,
	} = props;
	*/

class TicketsTemplate extends PureComponent {
	static propTypes = {
		isSelected: PropTypes.bool,
		setIsSelected: PropTypes.func,
	};

	static defaultProps = {
		isSelected: false,
	};

	updateIsSelected = () => {
		const { setIsSelected, isSelected } = this.props;
		setIsSelected( isSelected );
	};

	componentDidMount() {
		this.updateIsSelected();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.isSelected !== this.props.isSelected ) {
			this.updateIsSelected();
		}
	}

	componentWillUnmount() {
		this.updateIsSelected();
	}

	render() {
		const { isBlockSelected } = this.props;
		return (
			<div
				className={ classNames(
					'tribe-editor__tickets-container',
					{ 'tribe-editor__tickets-container--selected': isBlockSelected },
				) }
			>
				<TicketsContainer isSelected={ isBlockSelected } />
				<TicketsDashboard isSelected={ isBlockSelected } />
			</div>
		);
	}
}

export default TicketsTemplate;
