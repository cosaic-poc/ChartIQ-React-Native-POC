/**
 *	8.7.0
 *	Generation date: 2022-06-10T18:37:49.036Z
 *	Client name: sonyl test
 *	Package Type: Technical Analysis e98f22c
 *	License type: trial
 *	Expiration date: "2022/12/31"
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



var _exports = typeof window !== "undefined" ? window : global;
import { CIQ as _CIQ } from "../../../js/chartiq.js";
/* global _CIQ, _timezoneJS, _SplinePlotter */
var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;
if (!CIQ.Studies) {
	console.error(
		"volatilityIndex feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.calculateRelativeVolatility = function (stx, sd) {
		sd.days = Number(sd.inputs["Smoothing Period"]);
		var smoothing = Number(sd.inputs["STD Period"]);
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days + smoothing) {
			sd.error = true;
			return;
		}
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		function computeRVI(avgGain, avgLoss) {
			if (avgGain + avgLoss === 0) return 100;
			return (100 * avgGain) / (avgGain + avgLoss);
		}
		sd.std = new CIQ.Studies.StudyDescriptor(sd.name, "sdev", sd.panel);
		sd.std.chart = sd.chart;
		sd.std.days = smoothing;
		sd.std.startFrom = sd.startFrom;
		sd.std.inputs = { Field: field, "Standard Deviations": 1, Type: "ma" };
		sd.std.outputs = { _STD: null };
		CIQ.Studies.calculateStandardDeviation(stx, sd.std);
		var avgGain = 0;
		var avgLoss = 0;
		if (sd.startFrom > 1) {
			avgGain = quotes[sd.startFrom - 1]["_avgG " + sd.name] || 0;
			avgLoss = quotes[sd.startFrom - 1]["_avgL " + sd.name] || 0;
		}
		for (var i = Math.max(sd.startFrom, sd.days); i < quotes.length; i++) {
			var quote = quotes[i],
				quote1 = quotes[i - 1];
			if (!quote[field] && quote[field] !== 0) continue;
			if (!quote1[field] && quote1[field] !== 0) continue;
			if (!quote["_STD " + sd.name] && quote["_STD " + sd.name] !== 0) continue;
			if (quote[field] > quote1[field]) {
				avgGain =
					(avgGain * (sd.days - 1) + quote["_STD " + sd.name]) / sd.days;
				avgLoss = (avgLoss * (sd.days - 1)) / sd.days;
			} else {
				avgLoss =
					(avgLoss * (sd.days - 1) + quote["_STD " + sd.name]) / sd.days;
				avgGain = (avgGain * (sd.days - 1)) / sd.days;
			}
			quote["Rel Vol " + sd.name] = computeRVI(avgGain, avgLoss);
			quote["_avgG " + sd.name] = avgGain;
			quote["_avgL " + sd.name] = avgLoss;
		}
		sd.zoneOutput = "Rel Vol";
	};
	CIQ.Studies.calculateHistoricalVolatility = function (stx, sd) {
		function intFactor(days) {
			if (isNaN(days)) days = 365;
			if (stx.layout.interval == "day") return days;
			else if (stx.layout.interval == "week") return 52;
			else if (stx.layout.interval == "month") return 12;
			return days;
		}
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		var mult = sd.inputs["Standard Deviations"];
		if (mult < 0) mult = 1;
		var annualizingFactor =
			100 * Math.sqrt(intFactor(sd.inputs["Days Per Year"])) * mult;
		var arr = [];
		var accum = 0;
		if (sd.startFrom > 1) {
			accum = quotes[sd.startFrom - 1]["_state " + sd.name][0];
			arr = quotes[sd.startFrom - 1]["_state " + sd.name][1].slice();
		}
		for (var i = Math.max(1, sd.startFrom); i < quotes.length; i++) {
			var denom = quotes[i - 1][field];
			if (denom) {
				var ln = Math.log(quotes[i][field] / denom);
				arr.push(ln);
				accum += ln;
				if (i >= sd.days) {
					var d2 = 0;
					accum /= sd.days;
					for (var j = 0; j < arr.length; j++) {
						d2 += Math.pow(arr[j] - accum, 2);
					}
					accum *= sd.days;
					accum -= arr.shift();
					quotes[i]["Result " + sd.name] =
						Math.sqrt(d2 / sd.days) * annualizingFactor;
				}
			}
			quotes[i]["_state " + sd.name] = [accum, arr.slice()];
		}
	};
	CIQ.Studies.calculateVolatilityCone = function (stx, sd) {
		const { periodicity, interval } = stx.layout;
		const studyName = sd.study ? sd.study.name : sd.type;
		if (!CIQ.ChartEngine.isDailyInterval(interval)) {
			sd.error = `${studyName} is not supported for intraday periodicities`;
			return;
		}
		let periods = Number(sd.inputs["Projection Bars"]);
		let totalIncrements = Number(sd.inputs["Days Per Year"]);
		if (interval == "week") totalIncrements = 52;
		if (interval == "month") totalIncrements = 12;
		periods = Math.min(periods, totalIncrements);
		const quotes = sd.chart.scrubbed;
		let field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		let start = quotes.length - 1;
		while (start > 0 && quotes[start][field] === undefined) {
			start--;
		}
		const startDate = quotes[start].DT;
		const currentValue = quotes[start][field];
		const implVol = quotes[start].implVol;
		const oneDay = 24 * 60 * 60 * 1000;
		const useHistoric = sd.inputs["Volatility source"] === "historical";
		if (!useHistoric && implVol === undefined) {
			sd.error = `${studyName} Study: Implied Volatility source data is not available`;
			return;
		}
		sd._graphs = [68, 95].filter(
			(value, index) => sd.inputs[`Probability ${value}% (${index + 1}σ)`]
		);
		// Add qoutes placeholders
		const futureTicks = [];
		if (!useHistoric && interval === "day" && periodicity === 1) {
			const expiryDates =
				quotes[start].expiryDates ||
				Array.from(
					new Set(
						Object.values(quotes[start].optionChain || {})
							.map(
								({ expiration }) =>
									+((expiration && expiration.value) || expiration || 0)
							)
							.filter((expiration) => expiration)
					)
				);
			sd._expiryDates = expiryDates.map((dt) => ({
				dt: new Date(dt)
			}));
		} else {
			sd._expiryDates = null;
		}
		for (let i = 0; i <= periods; i++) {
			if (quotes[i + start]) continue;
			futureTicks.push({
				[(sd.inputs["Probability 68% (1σ)"] && "Result 68% Upper " + sd.name) ||
				undefined]: 0,
				[(sd.inputs["Probability 95% (2σ)"] && "Result 95% Upper " + sd.name) ||
				undefined]: 0
			});
		}
		sd.appendFutureTicks(stx, futureTicks);
		if (useHistoric) {
			CIQ.Studies.calculateHistoricalVolatility(stx, sd);
		}
		const volatilityValue = useHistoric
			? quotes[start][`Result ${sd.name}`] / 100
			: implVol;
		for (let i = 0; i <= periods; i++) {
			const quote = quotes[i + start];
			const increments =
				totalIncrements < 365 ? i : Math.round((quote.DT - startDate) / oneDay);
			const diff =
				currentValue *
				volatilityValue *
				Math.sqrt(increments / totalIncrements);
			const { DT } = quote;
			sd._graphs.forEach(
				function (graph) {
					const { quote, diff, currentValue, sd } = this;
					const upper = currentValue + (graph < 95 ? 1 : 2) * diff;
					const lower = currentValue - (graph < 95 ? 1 : 2) * diff;
					quote[`Result ${graph}% Upper ${sd.name}`] = upper;
					quote[`Result ${graph}% Lower ${sd.name}`] = lower;
					(sd._expiryDates || []).forEach((item) => {
						if (item.dt < startDate) return;
						const diff = Math.abs(item.dt - DT);
						if (diff < oneDay) {
							item.Upper = upper;
							item.Lower = lower;
							item.DT = DT;
						}
					});
				},
				{ quote, diff, currentValue, sd }
			);
		}
		sd.outputMap = {};
		sd._graphs.forEach((graph) => {
			sd.outputMap[`Result ${graph}% Upper ${sd.name}`] = "Color";
			sd.outputMap[`Result ${graph}% Lower ${sd.name}`] = "Color";
		});
	};
	CIQ.Studies.displayVolatilityCone = function (stx, sd, quotes) {
		if (sd.error) return;
		const color = CIQ.Studies.determineColor(sd.outputs.Color);
		const panel = stx.panels[sd.panel];
		if (!panel || panel.hidden) return;
		const yAxis = sd.getYAxis(stx);
		const parameters = {
			topColor: color,
			bottomColor: color,
			skipTransform: panel.name != sd.chart.name,
			topAxis: yAxis,
			bottomAxis: yAxis,
			opacity: 0.3
		};
		if (!sd.highlight && stx.highlightedDraggable) parameters.opacity *= 0.3;
		sd._graphs.forEach((probability) => {
			parameters.topBand = `Result ${probability}% Upper ${sd.name}`;
			parameters.bottomBand = `Result ${probability}% Lower ${sd.name}`;
			if (sd.inputs.Fill) {
				CIQ.fillIntersecting(stx, sd.panel, parameters);
			}
			CIQ.Studies.displayIndividualSeriesAsLine(
				stx,
				sd,
				panel,
				parameters.topBand,
				quotes
			);
			CIQ.Studies.displayIndividualSeriesAsLine(
				stx,
				sd,
				panel,
				parameters.bottomBand,
				quotes
			);
		});
		if (sd._expiryDates) {
			const context = stx.chart.context;
			stx.startClip();
			context.beginPath();
			sd._expiryDates.forEach((item) => {
				if (!item.DT) return;
				const x = stx.pixelFromDate(item.DT);
				const y0 = stx.pixelFromPrice(item.Upper, panel);
				const y1 = stx.pixelFromPrice(item.Lower, panel);
				stx.plotLine({
					x0: x,
					x1: x,
					y0,
					y1,
					color,
					pattern: "dashed"
				});
				context.moveTo(x, y0);
				context.arc(x, y0, 3, 0, Math.PI * 2, false);
				context.moveTo(x, y1);
				context.arc(x, y1, 3, 0, Math.PI * 2, false);
				context.fillStyle = color;
				context.fill();
			});
			stx.endClip();
		}
	};
	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Hist Vol": {
			name: "Historical Volatility",
			calculateFN: CIQ.Studies.calculateHistoricalVolatility,
			inputs: {
				Period: 10,
				Field: "field",
				"Days Per Year": [252, 365],
				"Standard Deviations": 1
			},
			attributes: {
				"Standard Deviations": { min: 0.1, step: 0.1 }
			}
		},
		"Rel Vol": {
			name: "Relative Volatility",
			range: "0 to 100",
			calculateFN: CIQ.Studies.calculateRelativeVolatility,
			inputs: { Field: "field", "STD Period": 10, "Smoothing Period": 14 },
			outputs: { "Rel Vol": "auto" },
			centerline: 50,
			parameters: {
				init: {
					studyOverZonesEnabled: true,
					studyOverBoughtValue: 70,
					studyOverBoughtColor: "auto",
					studyOverSoldValue: 30,
					studyOverSoldColor: "auto"
				}
			}
		},
		"Volatility Cone": {
			name: "Volatility Cone",
			overlay: true,
			calculateFN: CIQ.Studies.calculateVolatilityCone,
			seriesFN: CIQ.Studies.displayVolatilityCone,
			inputs: {
				"Volatility source": ["historical", "implied"],
				"Probability 68% (1σ)": true,
				"Probability 95% (2σ)": false,
				"Projection Bars": 20,
				"Days Per Year": [252, 365],
				Field: "field",
				Period: 10,
				"Standard Deviations": 1,
				Fill: true
			},
			outputs: {
				Color: "#3a627d"
			},
			panelSelect: false,
			attributes: {
				"Volatility source": {
					hidden: function () {
						return !CIQ.Studies.impliedVolatilityAvailable;
					}
				},
				Field: {
					hidden: function () {
						return this.inputs["Volatility source"] === "Implied";
					}
				},
				"Standard Deviations": {
					hidden: function () {
						return this.inputs["Volatility source"] === "Implied";
					}
				},
				yaxisDisplayValue: { hidden: true },
				panelName: { hidden: true },
				flippedEnabled: { hidden: true },
				underlayEnabled: { hidden: true }
			}
		}
	});
}
