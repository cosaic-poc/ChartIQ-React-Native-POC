/**
 *	8.4.0
 *	Generation date: 2021-11-02T14:04:28.074Z
 *	Client name: sonyl test
 *	Package Type: Technical Analysis
 *	License type: annual
 *	Expiration date: "2022/01/31"
 *	Domain lock: ["127.0.0.1","localhost","demo.chartiq.com","10.0.2.2"]
 */

/***********************************************************
 * Copyright by ChartIQ, Inc.
 * Licensed under the ChartIQ, Inc. Developer License Agreement https://www.chartiq.com/developer-license-agreement
*************************************************************/
/*************************************** DO NOT MAKE CHANGES TO THIS LIBRARY FILE!! **************************************/
/* If you wish to overwrite default functionality, create a separate file with a copy of the methods you are overwriting */
/* and load that file right after the library has been loaded, but before the chart engine is instantiated.              */
/* Directly modifying library files will prevent upgrades and the ability for ChartIQ to support your solution.          */
/*************************************************************************************************************************/
/* eslint-disable no-extra-parens */


import "./thirdparty/esutils.js";
import "./thirdparty/estraverse.js";
import "./thirdparty/esprima.js";
import "./thirdparty/escodegen.js";
import "./thirdparty/coffee-script.min.js";

const { estraverse, escodegen, CoffeeScript } = window || global;

var _esutils, _esprima;

if (
	typeof define === "undefined" &&
	typeof module === "object" &&
	typeof require === "function"
) {
	_esutils = require("./thirdparty/esutils.js");
	_esprima = require("./thirdparty/esprima.js");
} else if (typeof define === "function" && define.amd) {
	define(["./thirdparty/esutils.js", "./thirdparty/esprima.js"], function (
		m1,
		m2
	) {
		_esutils = m1;
		_esprima = m2;
	});
} else {
	_esutils = window.esutils;
	_esprima = window.esprima;
}

export {
	_esutils as esutils,
	estraverse,
	_esprima as esprima,
	escodegen,
	CoffeeScript
};
