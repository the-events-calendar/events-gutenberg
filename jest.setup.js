/**
 * External dependencies
 */
import moment from 'moment-timezone';
import React from 'react';
import $ from 'jquery';

global.jQuery = $;
global.$ = $;
global.wp = {
	element: React,
};

moment.tz.setDefault( 'UTC' );
