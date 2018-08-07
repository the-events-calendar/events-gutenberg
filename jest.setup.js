/**
 * External dependencies
 */
import moment from 'moment-timezone';
import React from 'react';
import $ from 'jquery';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.jQuery = $;
global.$ = $;
global.wp = {
	element: React,
};

moment.tz.setDefault( 'America/Mexico_City' );

Enzyme.configure( { adapter: new Adapter() } );
