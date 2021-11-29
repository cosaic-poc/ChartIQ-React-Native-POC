/**
 *	8.4.0
 *	Generation date: 2021-11-29T15:42:32.590Z
 *	Client name: sonyl test
 *	Package Type: Technical Analysis
 *	License type: trial
 *	Expiration date: "2022/01/31"
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
import "./scriptiqEditor.js";

/**
 * ScriptIQ web component `<cq-scriptiq>`.
 *
 * **Only available if subscribing to the scriptIQ module.**
 *
 * @namespace WebComponents.cq-scriptiq
 *
 * @example
 * <cq-scriptiq></cq-scriptiq>
 */
class ScriptIQ extends CIQ.UI.ContextTag {
	constructor() {
		super();
	}

	connectedCallback() {
		if (this.attached) return;
		super.connectedCallback();
	}

	initialize() {
		var self = this;
		function widgetLoaded(err) {
			if (err) {
				console.log(err);
			} else {
				// If not defined, define the namespace...
				if (!CIQ.Scripting) CIQ.Scripting = {};
				// ... and then assign it to the webcomponent so it can be accessed by the sandbox frame
				self.sandboxedCIQ = {
					Scripting: CIQ.Scripting,
					Studies: CIQ.Studies,
					prepareChannelFill: CIQ.prepareChannelFill
				};
				var editor = (self.editor =
					document.querySelector("cq-scriptiq-editor"));
				if (editor) {
					editor.remove();
				} else {
					editor = self.editor = document.createElement("cq-scriptiq-editor");
				}
				self.appendChild(editor);
				if (editor.initialize) editor.initialize();
				self.context.stx.prepend("resizeChart", self.resize.bind(self));
			}
		}
		widgetLoaded();
	}

	resize() {
		if (this.editor && this.editor.resizeScriptingArea)
			this.editor.resizeScriptingArea();
	}

	setContext(context) {
		this.initialize();
		CIQ.UI.activatePluginUI(this.context.stx, "scriptiq");
	}
}

customElements.define("cq-scriptiq", ScriptIQ);
