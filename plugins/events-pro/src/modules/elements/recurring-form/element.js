/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { RecurringField } from '@moderntribe/events-pro/elements';
import './style.pcss';

export default class RecurringForm extends PureComponent {
	static propTypes = {
		rules: PropTypes.arrayOf( PropTypes.shape( {} ) ),
	}

	static defaultProps = {
		rules: [],
	}

	render() {
		return (
			<section className="tribe-events-pro-recurring-block">
				{
					this.props.rules.map( rule => (
						<RecurringField { ...rule } />
					) )
				}
			</section>
		);
	}
}
