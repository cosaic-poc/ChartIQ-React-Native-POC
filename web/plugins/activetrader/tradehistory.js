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

/**
 * Trade History web component `<cq-tradehistory>`.
 *
 * Displays a table of trade information from {@link CIQ.ChartEngine.Chart#currentMarketData}.
 *
 * The following data should exist in the data record sent to either {@link CIQ.ChartEngine#updateCurrentMarketData} or {@link CIQ.ChartEngine#updateChartData}:
 * - Last or Close
 * - LastSize
 * - LastTime (this will default to DT if omitted)
 *
 * **Requires [Active Trader]{@link CIQ.MarketDepth} plugin. See {@link CIQ.ChartEngine#updateCurrentMarketData} for data requirements**
 *
 * This component will take up 100% of its parent element.
 *
 * Use component's open() and close() methods to show and hide.
 *
 * Visual Reference:<br>
 * ![img-tradehistory](img-tradehistory.png "img-tradehistory")
 *
 * @namespace WebComponents.cq-tradehistory
 * @since 6.2.0
 *
 * @example
 * <!--
 * This is your chart container. Position it anywhere, and in any way that you wish on your webpage.
 * Make position relative for the chart container div element.
 * -->
 * <cq-context>
 * <cq-ui-manager></cq-ui-manager>
 * <div class="chartContainer" style="width:800px;height:460px;position:relative;">
 *     <cq-tradehistory cq-active>
 *         <cq-tradehistory-table>
 *             <cq-scroll cq-no-claim>
 *                 <cq-tradehistory-body maxrows=500></cq-tradehistory-body>
 *             </cq-scroll>
 *         </cq-tradehistory-table>
 *         <template>
 *             <cq-item>
 *                 <div col="qty">Qty</div>
 *                 <div col="price">Price</div>
 *                 <div col="amount">Amount</div>
 *             </cq-item>
 *         </template>
 *     </cq-tradehistory>
 * </div>
 * </cq-context>
 *
 * @example
 * // Once the component is added to the HTML, it can be activated, and data can be loaded as follows:
 * let stxx = new CIQ.ChartEngine({container:document.querySelector(".chartContainer")});
 * new CIQ.UI.Context(stxx, document.querySelector("cq-context,[cq-context]"));
 * stxx.updateCurrentMarketData(yourL2Data); // Call this every time you want refresh.
 */
class TradeHistory extends CIQ.UI.ModalTag {
	connectedCallback() {
		if (this.attached) return;
		var myTemplate = this.node.find("template");
		var tables = this.node.find("cq-tradehistory-table");
		tables.each(function () {
			var header = CIQ.UI.makeFromTemplate(myTemplate);
			if (!header) return;
			if (this.hasAttribute("reverse")) {
				var reverseRow = Array.from(header.children()).reverse();
				header.empty().append(reverseRow);
			}
			header.attr("cq-tradehistory-header", true);
			this.insertBefore(header[0], this.firstChild);
			// initialize header width at 100/n% width where n is number of columns
			var children = header.children(),
				childCount = children.length;
			children.css("width", 100 / childCount + "%");
		});
		super.connectedCallback();
	}

	disconnectedCallback() {
		if (this.context) {
			var stx = this.context.stx;
			CIQ.UI.unobserveProperty(
				"touched",
				stx.chart.currentMarketData,
				this.listener
			);
		}
		super.disconnectedCallback();
	}

	clearTable(selector) {
		var side = this.node.find(selector);
		if (!side.length) return;
		side.find("cq-item").remove();
	}

	close() {
		this.node.attr("cq-active");
	}

	open() {
		this.node.attr("cq-active", true);
	}

	setContext({ stx }) {
		const self = this;
		this.listener = function () {
			const last = stx.chart.currentMarketData.Last;
			if (!last || CIQ.equals(last, self.lastTrade)) return;
			if (!last.Size) return;
			self.update(last);
			self.lastTrade = last;
		};

		CIQ.UI.observeProperty(
			"touched",
			stx.chart.currentMarketData,
			this.listener
		);

		stx.addEventListener("symbolChange", function (obj) {
			if (obj.action == "master" && self.symbol != obj.symbol)
				self.clearTable("cq-tradehistory-body");
			self.symbol = obj.symbol;
		});
	}

	update(last) {
		if (!CIQ.trulyVisible(this)) return;
		var tables = this.node.find("cq-tradehistory-table");
		var self = this;
		tables.each(function () {
			if (this.querySelectorAll("cq-tradehistory-body").length) {
				self.updateTableRow(
					last,
					"cq-tradehistory-body",
					this.hasAttribute("reverse")
				);
			}
		});
	}

	updateTableRow(data, selector, reverseOrder) {
		if (!data.Timestamp) return;
		const myTemplate = this.node.find("template");
		const side = this.node.find(selector);
		if (!side.length) return;
		const maxRows = side.attr("maxrows");
		const { stx } = this.context;
		const { animation } = stx.layout;

		function setHtml(record) {
			return function () {
				const myCol = this.getAttribute("col");
				if (myCol && record[myCol] !== undefined) {
					let val;
					if (myCol == "time") val = record[myCol];
					else {
						val = record[myCol];
						this.setAttribute("rawval", val);
						val = Number(val.toFixed(8)); // remove roundoff error
						const myStx = stx.marketDepth ? stx.marketDepth.marketDepth : stx;
						val = myStx.formatPrice(val, myStx.chart.panel);
					}
					this.innerHTML = val;
				}
			};
		}
		let row;
		if (maxRows && maxRows == side.find("cq-item").length) {
			row = CIQ.UI.$(side.find("cq-item")[maxRows - 1]);
			row.remove();
		} else {
			row = CIQ.UI.makeFromTemplate(myTemplate, side);
			if (reverseOrder) {
				const reverseRow = Array.from(row.children()).reverse();
				row.empty().append(reverseRow);
			}
		}
		let place;
		let allRows = side.find("cq-item");
		for (place = 0; place < allRows.length; place++) {
			if (allRows[place].getAttribute("ts") <= data.Timestamp) {
				break;
			}
		}
		row.removeAttr("corrected");
		allRows[place].parentNode.insertBefore(row[0], allRows[place]);

		const children = row.children();
		const childCount = children.length;
		children.css(
			"width",
			CIQ.elementDimensions(row[0], { padding: 1 }).width / childCount + "px"
		);

		// readjust headers
		const headers = this.node.find("[cq-tradehistory-header]");
		Array.from(headers.children()).forEach(function (child) {
			child.style.width =
				CIQ.elementDimensions(child.parentElement, { padding: 1 }).width /
					childCount +
				"px";
		});

		children.each(
			setHtml({
				time: data.Timestamp.toLocaleTimeString({}, { hour12: false }),
				qty: data.Size,
				price: data.Price,
				amount: data.Size * data.Price
			})
		);

		row.attr("price", data.Price);
		row.attr("ts", data.Timestamp.getTime());

		allRows = side.find("cq-item");

		//set the price direction of this row and the row before this if applicable
		for (let idx = 0; idx < 2; idx++) {
			const _row = allRows[place - idx];
			const _nextRow = allRows[place - idx + 1];
			let dir = "";

			if (_row) {
				if (_nextRow) {
					dir =
						_row.getAttribute("price") < _nextRow.getAttribute("price")
							? "down"
							: _row.getAttribute("price") > _nextRow.getAttribute("price")
							? "up"
							: "";
				}
				_row.setAttribute("dir", dir);
				if (animation) {
					_row.setAttribute("animate", true);
					_row.addEventListener("animationend", () => {
						_row.removeAttribute("animate");
					});
				}
				if (idx) _row.setAttribute("corrected", true);
			}
		}

		// this removes any extra rows from the end.
		const scroll = this.node.find("cq-scroll");
		scroll.each(function () {
			this.resize();
		});
	}
}

CIQ.UI.addComponentDefinition("cq-tradehistory", TradeHistory);
