/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/events-pro/data/blocks/additional-fields';
import { FIELD_TYPES } from '@moderntribe/events-pro/blocks/additional-fields/utils';

describe( 'Actions in Additional Fields', () => {
	const fieldName = '_ecp_custom_23';

	test( 'add field', () => {
		expect( actions.addField( fieldName ) ).toMatchSnapshot();
	} );

	test( 'remove field', () => {
		expect( actions.removeField( fieldName ) ).toMatchSnapshot();
	} );

	test( 'set field name', () => {
		expect( actions.setFieldLabel( fieldName, 'Host' ) ).toMatchSnapshot();
	} );

	test( 'set field is pristine', () => {
		expect( actions.setFieldIsPristine( fieldName, true ) ).toMatchSnapshot();
		expect( actions.setFieldIsPristine( fieldName, false ) ).toMatchSnapshot();
	} );

	test( 'set field value', () => {
		expect( actions.setFieldValue( fieldName, 'Rachel MA' ) ).toMatchSnapshot();
	} );

	test( 'set field type', () => {
		expect( actions.setFieldType( fieldName, FIELD_TYPES.checkbox ) ).toMatchSnapshot();
	} );

	test( 'set field options', () => {
		expect( actions.setFieldOptions( fieldName, [ 'Option 1', 'Option 2 ' ] ) ).toMatchSnapshot();
	} );

	test( 'set field list divider', () => {
		expect( actions.setFieldDividerList( fieldName, ', ' ) ).toMatchSnapshot();
	} );

	test( 'set field divider end', () => {
		expect( actions.setFieldDividerEnd( fieldName, ' & ' ) ).toMatchSnapshot();
	} );
} );
