/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * Internal dependencies
 */
import SettingsTemplate from './template';
import { withStore } from '@moderntribe/common/hoc';
import { config } from '@moderntribe/common/utils/globals';

/**
 * @todo get data from a selector
 */
const getSettingsLink = () => {
	const eventsPro = config().events_pro || {};
	return eventsPro.additional_fields_tab || '';
};

const mapStateToProps = () => ( {
	settingsLink: getSettingsLink(),
} );

export default compose(
	withStore(),
	connect( mapStateToProps ),
)( SettingsTemplate );
