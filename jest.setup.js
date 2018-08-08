/**
 * External dependencies
 */
import moment from 'moment-timezone';
import React from 'react';
import $ from 'jquery';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure( { adapter: new Adapter() } );

global.jQuery = $;
global.$ = $;
global.wp = {
	element: React,
};

moment.tz.setDefault( 'UTC' );
