"use strict";
const helper = {};

helper.express = require('express');
// helper.request = require('request');
helper.async = require('async');
helper.validator = require('validator');

// helper.confg = require("../../confg/confg");
// helper.hmodels = require("../handlers/hmodels");

// host name
helper.hostname = "host"; //helper.confg.hostname;

// sanitize input data
helper.sanitize_data = (params) => {
	const raw_data = params.data;

	let cooked_data = helper.validator.escape(raw_data);
	if(params.no_trim !== undefined) {
		cooked_data = cooked_data.trim();
	}
	return cooked_data;
};

// push individual error messages to error list
helper.push_error = ( params ) => {
	if ( params.error !== undefined ) {
		params.errors.push(params.error);
	}
};

// error handler
helper.error_handler = (err, params, callback) => {
  if(err) { return callback(err); }
  else {
    if ( params.async_level !== undefined && params.async_level > 0 ) {
      params.async_level -= 1;
      if(params.async_level === 0) {
        delete params.async_level;
      }
      callback(err, err, params);
    } else {
      callback(null, params);
    }
  }
};

module.exports = helper;