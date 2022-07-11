import { CIQ } from "../../js/chartiq.js";
CIQ.Help = CIQ.Help || function () {};
CIQ.Help.Message =
	"Glowing dots indicate which items have help available. At any time, long press a feature to make the help window appear.";
CIQ.Help.Actions = {
	close: {
		label: "Exit Help",
		action: "close" // Close is handled by the floating window
	},
	enable: {
		label: "Enable This Feature",
		action: function (target) {
			// Click the target (parent of the <cq-help> element)
			target.dispatchEvent(new Event("stxtap"));
		}
	}
};
CIQ.Help.Content = {
	drawing_tools_toggle: {
		title: "Toggle: Drawing Tools",
		content:
			"Toggles display of the drawing tools palette. Drawing tools allow you to add custom markings and annotations to the chart."
	},
	drawing_palette_rectangle: {
		title: "Drawing Tool: Rectangle",
		content:
			"<img src='./examples/help/rectangle.png' width='200' style='float:right; margin:1em;'/> Add a rectangle shape onto the chart."
	},
	drawing_palette_annotation: {
		title: "Drawing Tool: Annotation",
		content: "Add text annotations onto the chart."
	},
	drawing_palette_arrow: {
		title: "Drawing Tool: Arrow",
		content: "Add an arrow shape onto the chart."
	},
	drawing_palette_line: {
		title: "Drawing Tool: Line",
		content: "Add a line at any angle or position across the chart."
	},
	drawing_palette_horizontal: {
		title: "Drawing Tool: Horizontal",
		content: "Add a horizontal line at any point onto the chart."
	},
	drawing_palette_vertical: {
		title: "Drawing Tool: Vertical",
		content: "Add a vertical line at any point onto the chart."
	},
	drawing_palette_segment: {
		title: "Drawing Tool: Segment",
		content: "Add a line segment onto the chart."
	},
	default: {
		title: "Help not available.",
		content: "No documentation for this topic could be found.",
		actions: [CIQ.Help.Actions.close]
	}
};
