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


import { CIQ } from "../../js/componentUI.js";
import Pikaday from "./thirdparty/pikaday.esm.js";

let _css;

if (
	typeof define === "undefined" &&
	typeof module === "object" &&
	typeof require === "function"
) {
	require("./datepicker.css");
} else if (typeof define === "function" && define.amd) {
	define(["./datepicker.css"], () => {});
} else if (typeof window !== "undefined") {
	_css = new URL("./datepicker.css", import.meta.url);
	if (import.meta.webpack) _css = null;
}

/**
 * Date picker web component `<cq-datepicker>`.
 *
 * This web component enables users to enter dates. It works as a wrapper for the Pikaday datepicker, and as such,
 * requires Pikaday.js as a dependency. When the web component loads, it looks for a `div` with the ID "datepicker"
 * and loads the Pikaday datepicker on that `div`.
 *
 * @name CIQ.UI.Datepicker
 * @namespace WebComponents.cq-datepicker
 * @since 7.3.0
 *
 * @example
 * <cq-datepicker>
 *     <div id="datepicker"></div>
 * </cq-datepicker>
 */
class Datepicker extends CIQ.UI.ContextTag {
	constructor() {
		super();
		this.callbacks = [];
	}

	connectedCallback() {
		if (this.attached) return;

		const loadComponent = () => {
			const picker = new Pikaday({
				onSelect: (date) => {
					this.executeCallbacks(this.setLive ? "live" : date);
					this.setLive = false;
				}
			});

			picker.hide(); // no simple way to initialize hidden/closed without binding to a form

			this.picker = picker;
			this.insertBefore(picker.el, this.firstElementChild);

			CIQ.UI.stxtap(
				this,
				() => {
					this.setLive = true;
					picker.setDate(new Date());
				},
				".ciq-btn"
			);
		};

		if (_css) {
			CIQ.loadStylesheet(_css.href, loadComponent);
		} else {
			loadComponent();
		}

		CIQ.UI.stxtap(this, function (event) {
			// prevent datepicker from closing on clicks
			event.stopPropagation();
		});

		const menu = this.closest("cq-menu");
		if (menu) {
			// specifying show/hide is to prevent picker from listening to keypress events unless visible
			const menuObserver = new MutationObserver(() => {
				if (menu.classList.contains(menu.activeClassName)) {
					this.picker.show();
				} else {
					this.picker.hide();
				}
			});
			menuObserver.observe(menu, { attributes: true });
		}

		const dialog = this.closest("cq-dialog");
		if (dialog) {
			// `picker.show()` gets called from within the dialog so we can safely hide on any mutation
			const menuObserver = new MutationObserver(() => this.picker.hide());
			menuObserver.observe(dialog, { attributeFilter: ["cq-active"] });
		}

		super.connectedCallback();
	}

	registerCallback(cb) {
		this.callbacks.push(cb);
	}

	executeCallbacks(date) {
		this.callbacks.forEach(function (cb) {
			cb(date);
		});
	}
}

CIQ.UI.addComponentDefinition("cq-datepicker", Datepicker);
