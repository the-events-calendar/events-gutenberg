/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { RecurringField } from '@moderntribe/events-pro/elements';

export default class RecurringForm extends PureComponent {
	static propTypes = {
		rules: PropTypes.arrayOf( PropTypes.shape( {} ) ),
		removeRule: PropTypes.func.isRequired,
	}

	static defaultProps = {
		rules: [],
	}

	render() {
		return (
			<section>
				{
					this.props.rules.map( ( rule, i ) => (
						<RecurringField
							index={ i }
							key={ i }
							onRemoveClick={ this.props.removeRule }
							{ ...rule }
						/>
					) )
				}
			</section>
		);
	}
}
