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


import { CIQ } from "../../components.js";
import getDefaultConfig from "../../defaultConfiguration.js";
export default function getConfig(
	resources,
	{
		dataSetField = "DataSet", // field name data is attached to quotes
		initialSymbol = "Scatterplot",
		xAxisField, // property of xAxisField, if not provide uses first property in xAxisProps
		xAxisProps = [], // array of property names for X axis menu, for example ["touchpoints", "score"],
		yAxisField, // property of yAxisField, if not provide uses first property inyAxisProps
		yAxisProps = [], // array of property names for Y axis menu
		groupProps = [], // array of property names grouping
		filterProps = [], // array of filter menu configuration objects containing prop and either value or double slider range step
		propToLabel, // dictionary for mapping property name to label if not a capitalized property, for example `{ name: "Client" }`,
		decimalPlaces, // function that takes field and returns number of decimal places for formatting
		fieldsToFormatAsPercent, // array of fields to format as percent
		symbolInputType, // label for UI `Add` label in theCompare widget
		trailLength = 2, // defaults to 2
		trailTension = 0.9, // curvature of trails, defaults to .9
		trailColor, // defaults to color of first point
		center = {
			color: "#77777744", // axis color defining center of chart
			lineParams: { pattern: "dashed" } // line type definition for center, defaults to
		},
		centerOn, // sets chart center for "xAxisproperty|yAxisproperty" for example `"tcv|touchpoints": { x: 3500, y: 150 }`,
		scalePoints = false, // do not scale vertex point sizes with zoom
		showTrailsMenu = true, // when set to true display trail menu
		pointAttributesFn
	} = {}
) {
	let config = getDefaultConfig(resources);
	config = config = {
		...config, // inherit defaullt config
		initialSymbol,
		chartId: "Scatterplot",
		menuXaxisField: getAxisMenu(xAxisProps, "X"),
		menuYaxisField: getAxisMenu(yAxisProps, "Y"),
		menuGroupField: groupProps && getGroupMenu(groupProps),
		menuFilterField: filterProps && getFilterMenu(filterProps),
		showTrailsMenu,
		menuChartPreferences: [
			{
				type: "checkbox",
				label: "X-Axis Scaling",
				cmd: "Layout.XAxisScaling()"
			},
			{
				type: "checkbox",
				label: "Show All Labels",
				cmd: "Layout.PointLabels()"
			},
			{
				type: "checkbox",
				label: "Timeline Date Selector",
				cmd: "Layout.TimelineDateSelector()"
			}
		],
		plugins: {
			// leave in only updated corssection plugin
			crossSection: {
				...config.plugins.crossSection,
				dataSetField,
				xaxisField:
					xAxisField || (xAxisProps && xAxisProps.length && xAxisProps[0]),
				yaxisField:
					yAxisField || (yAxisProps && yAxisProps.length && yAxisProps[0]),
				filter: filterProps && getEnabledFilters(filterProps),
				decimalPlaces,
				fieldsToFormatAsPercent,
				symbolInputType,
				enableTimeSeries: false,
				enableToggleLabel: true,
				showcaseFreshPoints: false,
				showUpdateAnimations: false,
				showUpdateStamp: false,
				sortFunction: (a, b) => {
					if (typeof a === "string")
						return (Number(a) || a) < (Number(b) || b) ? -1 : 1;
					return a[0] < b[0] ? -1 : 1;
				},
				pointAttributes: pointAttributesFn,
				formatter: formatterFn,
				avoidDuplicates: true,
				trailLength,
				trailTension, // define curvature for historic trails
				trailColor,
				trailTimeUnit: "day", // should be larger or equal to quote interval
				trailInterval: 1, // multiplier for trail interval
				center,
				scalePoints
			}
		}
	};
	if (centerOn)
		config.onEngineReady = (stx) => {
			const { layout, crossSection } = stx;
			CIQ.UI.observeProperty("xaxisField", layout, updateCenter);
			CIQ.UI.observeProperty("yaxisField", layout, updateCenter);
			function updateCenter() {
				const { xaxisField, yaxisField } = layout;
				const key = xaxisField + "|" + yaxisField;
				const { x = null, y = null } = centerOn[key] || {};
				const redraw =
					x !== crossSection.center.x || y !== crossSection.center.y;
				Object.assign(crossSection.center, { x, y });
				if (redraw) stx.draw();
			}
		};
	return config;
	function getAxisMenu(props, type) {
		return props.map((prop) => {
			return {
				label: formatterFn(prop),
				cmd: `Layout.set${type.toUpperCase()}axisField('${prop}')`
			};
		});
	}
	function getGroupMenu(props) {
		return props.map((prop) => {
			prop.replace("history", "_originalKey");
			return {
				label: formatterFn(prop),
				cmd: `Layout.setGroupField('${prop}')`
			};
		});
	}
	function getFilterMenu(filters) {
		return filters.map(({ prop, rangeStep, value }) => {
			return rangeStep
				? {
						type: "doubleslider",
						label: formatterFn(prop),
						attrs: `name='${prop}' step='${rangeStep}'`
				  }
				: {
						type: "checkbox",
						label: `${formatterFn(prop)} ${value}`,
						cmd: `Layout.Filter('${prop}','${value}')`
				  };
		});
	}
	function getEnabledFilters(filters) {
		return filters
			.filter(({ value }) => !!value)
			.reduce((acc, { prop, value }) => {
				return { [prop]: [...(acc[prop] || []), value] };
			}, {});
	}
	function formatterFn(label) {
		// menu field formatter
		const fieldToLabel = propToLabel || {
			name: "Client",
			_originalKey: "History"
		};
		return fieldToLabel[label] || CIQ.capitalize(label);
	}
}
