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


/*
 *
 * TFC package.  This loads up the Trade From Chart module.
 *
 */
import { CIQ } from "../../js/componentUI.js";
import TFC from "./tfc.js";
import html from "./tfcHtml.js";

let _css;
if (
	typeof define === "undefined" &&
	typeof module === "object" &&
	typeof require === "function"
) {
	require("./tfc.css");
} else if (typeof define === "function" && define.amd) {
	define(["./tfc.css"], () => {});
} else if (typeof window !== "undefined") {
	_css = new URL("./tfc.css", import.meta.url);
	if (import.meta.webpack) _css = null;
}

function start(config) {
	var stx = config.stx;

	let { account, allowUniqueAccountConstruction } = config;

	const accountIsInstance = typeof account !== "function";

	if (allowUniqueAccountConstruction || accountIsInstance) {
		config.account = accountIsInstance ? account : new account();
	} else {
		TFC.sharedAccount =
			TFC.sharedAccount || (accountIsInstance ? account : new account());
		config.account = TFC.sharedAccount;
	}

	stx.tfc = new TFC(config);

	stx.addEventListener("newChart", function () {
		stx.tfc.changeSymbol();
	});

	var topNode = config.context ? config.context.topNode : document;
	var qs = (path) => topNode.querySelector(path);

	stx.tfc.selectSymbol = function (symbol) {
		if (config.context)
			config.context.changeSymbol({ symbol: symbol.toUpperCase() });
	};

	var sidePanel = qs("cq-side-panel");

	if (!topNode.querySelector("cq-side-panel .stx-trade-panel")) {
		// Add trade panel if markup is not already present in side panel
		sidePanel.appendChild(qs(".stx-trade-panel"));
	}

	if (config.context.config) {
		CIQ.UI.BaseComponent.prototype.channelSubscribe(
			(config.context.config.channels || {}).tfc || "channel.tfc",
			function (isActive) {
				stx.tfc.openPanel(isActive);
			},
			stx
		);
		// Resize side panel based on tradePanel width
		sidePanel.resizeMyself();
	}
}

// Stub function to allow child classes to be defined by the user
CIQ.Account = CIQ.Account || function () {};

// **Note:** The CIQ.TFC documentation is in *plugins/tfc/tfc.js*.
//
// Stub function used to create the plug-in object on the page before the class is loaded.
//
// @param {object} config Parameters for setting up the Trade from Chart plug-in.
// @param {CIQ.ChartEngine} config.stx A reference to the chart engine.
// @param {CIQ.ChartEngine.Chart} config.chart A reference to the chart to which the plug-in is
// 		added.
// @param {CIQ.UI.Context} config.context A reference to the user interface context.
// @param {CIQ.Account} [config.account] Account object for querying a brokerage and placing
// 		trades. If omitted, will be a demo account.
// @param {boolean} [config.loadTemplate] Set to false if the Trade from Chart markup is already
//		present in the document.
// @param {string} [config.htmlTemplate] Markup string to use instead of the default loaded HTML
// 		string.
// @param {boolean} [config.loadSample] Set to true to load the sample demo account.
//
// @since
// - 6.2.0 Added `context` parameter.
// - 8.1.0 Added `config.loadTemplate` and `config.htmlTemplate`.
// - 8.4.0 Added `config.loadSample`.
CIQ.TFC = function (config) {
	var tfcConfig = Object.assign({}, config);

	if (tfcConfig.account) {
		CIQ.ensureDefaults(
			typeof tfcConfig.account === "function"
				? tfcConfig.account.prototype
				: tfcConfig.account.constructor.prototype,
			CIQ.Account.prototype
		);
	} else if (CIQ.Account.Demo) {
		tfcConfig.account = CIQ.Account.Demo;
	} else if (config.loadSample) {
		var pathbits = import.meta.url.split("/");
		pathbits.pop();
		CIQ.loadScript(
			pathbits.join("/") + "/tfc-demo.js",
			function () {
				tfcConfig.account = CIQ.Account.Demo;
				cb();
			},
			true
		);
	} else {
		console.warn(
			"The TFC plugin requires account, neither TFC plugin account has been provided " +
				"in the plugin config nor has CIQ.Account.Demo been made available using tfc-demo.js import."
		);
		return;
	}

	if (config.loadTemplate !== false) {
		// markup is not present in document
		var topNode = config.context ? config.context.topNode : document.body;
		var div = document.createElement("div");

		CIQ.innerHTML(div, config.htmlTemplate || html);
		Array.from(div.children).forEach((ch) =>
			topNode.appendChild(ch.cloneNode(true))
		);
	}

	function cb(err) {
		if (tfcConfig.account) start(tfcConfig);
	}

	if (_css) {
		CIQ.loadStylesheet(_css.href, cb);
	} else {
		cb();
	}
};

export { TFC };
