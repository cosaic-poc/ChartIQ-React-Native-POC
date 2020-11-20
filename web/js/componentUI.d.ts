import { CIQ } from '../js/chartiq.js'
export { CIQ }

/**
 * CIQ namespace extension
 */
declare module '../js/chartiq.js' {
  export namespace CIQ.ChartEngine.Driver {
    /**
     * Lookup driver interface placeholder to be augmented in standard.js with properties
     */
    interface Lookup {
    }
  }

  /**
   * Namespace for UI helper objects.
   *
   * Designed to be used as helper methods for the included WebComponents. A full
   * tutorial on how to work with and customize the web components can be found here:
   * {@tutorial Web Component Interface}.
   *
   */
  export namespace CIQ.UI {
    /**
     * Web component instance to show loading status and having show and hide methods
     */
    interface Loader {
      show: Function
      hide: Function
    }
    /**
     * UI context helper class.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * Construct with an CIQ.ChartEngine object.
     *
     * 		should contain all of the UI elements associated with the CIQ.ChartEngine.
     *
     */
    class Context {
      /**
       * UI context helper class.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}.
       *
       * Construct with an CIQ.ChartEngine object.
       *
       * @param stx The chart object to associate this UI.
       * @param topNode The top node of the DOM tree for this context. That node
       * 		should contain all of the UI elements associated with the CIQ.ChartEngine.
       * @param [params] Optional parameters.
       *
       */
      constructor(stx: CIQ.ChartEngine, topNode: HTMLElement, params?: Object)
      /**
       * Abstract method that should be overridden. See example.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @param  data A symbol data object acceptable for CIQ.ChartEngine#loadChart
       * @example
       UIContext.changeSymbol=function(data){
       var stx=this.stx;
       if(this.loader) this.loader.show();
       if(data.symbol==data.symbol.toLowerCase())
       data.symbol=data.symbol.toUpperCase(); // set a pretty display version
       // reset comparisons - remove this loop to transfer from symbol to symbol.
       for(var field in stx.chart.series) {
       // keep studies
       if (stxx.chart.series[field].parameters.bucket != "study" ) stx.removeSeries(field);
       }
       var self=this;
       stx.loadChart(data, function(err) {
       if(err){
       // add 'symbol not found error' here if one needed.
       if(self.loader) self.loader.hide();
       return;
       }
       if(self.loader) self.loader.hide();
       CIQ.ChartEngine.restoreDrawings(stx, stx.chart.symbol);
       });
       };
       *
       */
      public changeSymbol(data: Object): void
      /**
       * Sets the [lookup driver]CIQ.ChartEngine.Driver.Lookup to be used with the [cq-lookup web component]WebComponents.cq-lookup.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * The lookup driver will be called to search for matching symbols as data is typed into the set `UIContext.UISymbolLookup` field.
       *
       * See `function startUI()` in sample-template-advanced.html for complete sample implementation.
       *
       * @param driver Lookup driver for cq-lookup component
       * @example
       * UIContext=new CIQ.UI.Context(stxx, document.querySelector("cq-context,[cq-context]"));
       * UIContext.setLookupDriver(new CIQ.ChartEngine.Driver.Lookup.ChartIQ());
       * UIContext.UISymbolLookup=document.querySelector(".ciq-search cq-lookup");
       * UIContext.UISymbolLookup.setCallback(function(context, data){
       *	context.changeSymbol(data);
       * });
       */
      public setLookupDriver(driver: CIQ.ChartEngine.Driver.Lookup): void
      /**
       * Attaches a Helper to the context, so that it can be found later on.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @param uiHelper A UI Helper to attach
       * @param helperName The helperName of the element. For instance "Loader"
       */
      public advertiseAs(uiHelper: CIQ.UI.Helper, helperName: String): void
      /**
       * Attaches a loader to a UI context.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @param loader Loader instance
       */
      public setLoader(loader: CIQ.UI.Loader): void
      /**
       * Checks if the context in modal mode.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @return true if in modal mode
       */
      public isModal(): Boolean
    }
    /**
     * Abstract class for WebComponents using this framework.
     *
     * Provides a base set of functionality for web components.
     *
     * @extends HTMLElement
     *
     * @see WebComponents
     */
    class BaseComponent {
      /**
       * Adds default markup to a web component if the component does not have any child nodes.
       *
       * @param component The component to which the markup is added.
       * @param [markup] The markup to add to the web component. Unused if the
       * 		component has a static markup property that specifies the markup; for example,
       * 		MyComponent.markup.
       *
       * @since 7.5.0
       */
      public addDefaultMarkup(component: HTMLElement, markup?: String): void
      /**
       * Writes in the chart engine communication channel.
       *
       * @param path The channel path.
       * @param value The value written to the channel.
       * @param stx A reference to the chart engine.
       *
       * @since 7.5.0
       */
      public channelWrite(path: String, value: any, stx: CIQ.ChartEngine): void
      /**
       * Merges an object in the chart engine communication channel.
       *
       * @param path The channel path.
       * @param value The value merged to the channel.
       * @param stx A reference to the chart engine.
       *
       * @since 7.5.0
       */
      public channelMergeObject(path: String, value: Object, stx: CIQ.ChartEngine): void
      /**
       * Reads the current value in the chart engine communication channel.
       *
       * @param path The channel path.
       * @param [stx] Unused.
       * @return The current value in channel.
       *
       * @since 7.5.0
       */
      public channelRead(path: String, stx?: CIQ.ChartEngine): any
      /**
       * Subscribes to the chart engine messaging channel.
       *
       * @param path The channel path.
       * @param cb A callback invoked upon subscribing and whenever a new message is posted
       * 		in the channel.
       * @param stx A reference to the chart engine.
       * @return A callback invoked when unsubscribing from the channel.
       *
       * @since 7.5.0
       */
      public channelSubscribe(path: any, cb: any, stx: CIQ.ChartEngine): Function
      /**
       * Adapts the
       * [querySelector]https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
       * method.
       *
       * @param path The CSS selectors for which to search.
       * @param context The chart context element, which is the starting
       * 		point of the DOM query, or "thisChart" to indicate the chart context in which this
       * 		function is called.
       * @return The selected DOM element or undefined if an element is
       * 		not found.
       *
       * @since 7.5.0
       */
      public qs(path: String, context: HTMLElement|String): HTMLElement|undefined
      /**
       * Adapts the
       * [querySelectorAll]https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
       * method. Returns an array instead of a node list to enable chaining of the array `map`,
       * `filter`, `forEach`, and `reduce` functions.
       *
       * @param path The CSS selectors for which to search.
       * @param context The chart context element, which is the starting
       * 		point of the DOM query, or "thisChart" to indicate the chart context in whidh this
       * 		function is called.
       * @return An array of selected DOM element or undefined if no
       * elements are found.
       *
       * @since 7.5.0
       */
      public qsa(path: String, context: HTMLElement|String): HTMLElement|undefined
      /**
       * Searches the DOM for the chart context element. Begins the search with `el` (or `this`
       * if `el` is not provided) and proceeds up the ancestry tree until an element is found or
       * the root of the tree has been reached.
       *
       * @param [el] The element on which to start the search. If not provided,
       * 		`this` is used.
       * @return The chart context element or undefined if an element
       * 		is not found.
       *
       * @since 7.5.0
       */
      public getContextContainer(el?: HTMLElement): HTMLElement|undefined
      /**
       * Searches the DOM for the chart container element. Begins the search with `el`
       * (or `this`) and proceeds parent-by-parent up the ancestry tree until an element is
       * found.
       *
       * @param [el] The element on which to start the search. If not provided,
       * 		`this` is used.
       * @return The chart container element or undefined if an element
       * 		is not found.
       *
       * @since 7.5.0
       */
      public getChartContainer(el?: HTMLElement): HTMLElement|undefined
      /**
       * Attaches a keyboard input entry event.
       *
       * @param node The element to which the input entry event is attached.
       * @param cb The callback function invoked when input entry occurs.
       *
       */
      public inputEntry(node: HTMLElement, cb: Function): void
      /**
       * Claim any keystrokes that come in. Once claimed, any keystrokes that come in are passed
       * to the helper. The helper can then choose to capture or propagate the keystrokes. This
       * enables a helper to capture keystrokes even if it doesn't have mouse focus.
       *
       * @param helper The element that should claim a keystroke.
       *
       */
      public addClaim(helper: HTMLElement): void
      /**
       * Remove a claim on keystrokes.
       *
       * @param helper Helper or `ContextTag` from which the claim on
       * 		keystrokes is removed.
       *
       */
      public removeClaim(helper: CIQ.UI.Helper): void
    }
    /**
     * Abstract class for web components that use a CIQ.UI.Context to gain access to an
     * instance of the chart engine.
     *
     * @extends CIQ.UI.BaseComponent
     *
     * @see WebComponents
     */
    class ContextTag {
      /**
       * Convenience function that creates an array of injections for the component and sets a
       * variable of node equal to self.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the WebComponents can be found here:
       * {@tutorial Web Component Interface}.
       *
       */
      public connectedCallback(): void
      /**
       * Removes all the the injections for a context tag and resets the tag to its default
       * state.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the WebComponents can be found here:
       * {@tutorial Web Component Interface}.
       *
       */
      public disconnectedCallback(): void
      /**
       * Stores the component in the context holder (an array associated with the `cq-context`
       * element) so that when the context is started, it knows that this tag is contextual.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the WebComponents can be found here:
       * {@tutorial Web Component Interface}.
       *
       */
      public setContextHolder(): void
      /**
       * Called for a registered component when the context is constructed. This method does
       * nothing; you must override it with a method that performs context initialization.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
    }
    /**
     * A tag that is modally aware of the chart.
     *
     * @extends CIQ.UI.ContextTag}
     * @private
     */
    class ModalTag {
    }
    /**
     * Base class for tags that are contained in a `cq-dialog` tag.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @extends CIQ.UI.BaseComponent}
     */
    class DialogContentTag {
      /**
       * Closes the dialog.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the WebComponents can be found here:
       * {@tutorial Web Component Interface}.
       *
       */
      public close(): void
      /**
       * Opens the parent dialog, the nearest `cq-dialog` element. Sets the chart context if a
       * context is provided in `params`.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the WebComponents can be found here:
       * {@tutorial Web Component Interface}.
       *
       * @param [params] Contains the chart context.
       * @param [params.context] A context to set. See
       * 		[setContext]CIQ.UI.DialogContentTag#setContext.
       *
       */
      public open(params?: {context?: CIQ.UI.Context}): void
      /**
       * Dynamically sets the context for a dialog so that it knows which chart to change when
       * there are multiple charts on the screen.
       *
       * @param context The context to set.
       *
       */
      public setContext(context: CIQ.UI.Context): void
    }
    /**
     * Abstract class for UI Helpers.
     *
     * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
     *
     */
    class Helper {
      /**
       * Abstract class for UI Helpers.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @param node DOM node.
       * @param context UIContext the helper is associated with
       */
      constructor(node: HTMLElement, context: CIQ.UI.Context)
      /**
       * Adds an injection. These will be automatically destroyed if the helper object is destroyed.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @param position  "prepend" or "append"
       * @param injection The injection name. i.e. "draw"
       * @param code      The code to be run
       */
      public addInjection(position: String, injection: String, code: Function): void
      /**
       * Removes injections from the ChartEngine
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       */
      public destroy(): void
    }
    /**
     * UI Helper that keeps the heads up display operating.
     *
     * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
     *
     * There are three modes:
     * - params.followMouse=true - The heads up display will follow the mouse
     * - params.staticNode=true - The heads up will simply update a DOM node managed by you
     * - default - The heads up will be a marker within the chart, positioned in the chart panel unless overidden
     *
     * that will be removed from the document and then added dynamically into the chart container.
     * @since
     * - 3.0.0
     * - 6.0.0 Now also has internationalizer support for dates. See CIQ.I18N.setLocale or CIQ.I18N.localize.
     */
    class HeadsUp {
      /**
       * UI Helper that keeps the heads up display operating.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * There are three modes:
       * - params.followMouse=true - The heads up display will follow the mouse
       * - params.staticNode=true - The heads up will simply update a DOM node managed by you
       * - default - The heads up will be a marker within the chart, positioned in the chart panel unless overidden
       *
       * @param node The node which should be the template for the heads up.
       * @param context The context
       * @param [params] Optional parameters
       * @param [params.autoStart=true] If true then start the heads up on construction
       * @param [params.followMouse=false] If true then the heads up will follow the mouse. In this case, the node should be a template
       * that will be removed from the document and then added dynamically into the chart container.
       * @param [params.staticNode=false] If true then the node will not be added as a marker
       * @param [params.showClass="stx-show"] The class that will be added to display the heads up
       * @since
       * - 3.0.0
       * - 6.0.0 Now also has internationalizer support for dates. See CIQ.I18N.setLocale or CIQ.I18N.localize.
       */
      constructor(
        node: HTMLElement,
        context: CIQ.UI.Context,
        params?: {
          autoStart?: boolean,
          followMouse?: boolean,
          staticNode?: boolean,
          showClass?: string
        }
      )
    }
    /**
     * UI Helper to allow drawings to be edited, cloned, or deleted with a context menu via <cq-drawing-context>.
     *
     * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
     *
     *
     * @example <caption>Required DOM</caption>
     * <cq-dialog>
     * 	<cq-drawing-context>
     * 		<div stxtap="DrawingEdit.text()" cq-edit-text>Text</div>
     * 		<div stxtap="DrawingEdit.edit()">Edit</div>
     * 		<div stxtap="DrawingEdit.clone()">Clone</div>
     * 		<div stxtap="DrawingEdit.remove()">Delete</div>
     * 	</cq-drawing-context>
     * </cq-dialog>
     *
     * @example <caption>Edit state attribute, value is the tool name</caption>
     * <cq-toolbar cq-drawing-edit="none"></cq-toolbar>
     *
     * @since 6.2.0
     */
    class DrawingEdit {
      /**
       * UI Helper to allow drawings to be edited, cloned, or deleted with a context menu via <cq-drawing-context>.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       *
       * @param [node=context.topNode] Automatically attaches to the top node of the context
       * @param context The context for the chart
       * @example <caption>Required DOM</caption>
       * <cq-dialog>
       * 	<cq-drawing-context>
       * 		<div stxtap="DrawingEdit.text()" cq-edit-text>Text</div>
       * 		<div stxtap="DrawingEdit.edit()">Edit</div>
       * 		<div stxtap="DrawingEdit.clone()">Clone</div>
       * 		<div stxtap="DrawingEdit.remove()">Delete</div>
       * 	</cq-drawing-context>
       * </cq-dialog>
       *
       * @example <caption>Edit state attribute, value is the tool name</caption>
       * <cq-toolbar cq-drawing-edit="none"></cq-toolbar>
       *
       * @since 6.2.0
       */
      constructor(node: HTMLElement | undefined, context: CIQ.UI.Context)
      /**
       * Teardown the current edit mode.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * Used internally by the DrawingEdit instance. May also be used by the UI
       * to explicitly stop editing.
       *
       * @param activator not used, passed by stxtap binding
       * @param action a friendly name that caused the edit mode to end
       * @fires CIQ.UI.DrawingEdit#drawing-edit-end
       * @example <caption>Button to manually end edit mode</caption>
       * <div class="ciq-drawing-edit-only" cq-section>
       * 	<div class="ciq-btn" stxtap="DrawingEdit.endEdit('close')">Done Editing</div>
       * </div>
       *
       * @since 6.2.0
       */
      public endEdit(activator: Object, action: String): void
      /**
       * Drawing context menu edit settings option.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       *
       * @since 6.2.0
       */
      public edit(): void
      /**
       * Drawing context menu edit text option.
       *
       * Used for drawing tools with an edit() function, such as annotation and callout.
       *
       * Will allow re-application of this function.
       *
       * @since 7.0.0
       */
      public text(): void
      /**
       * Drawing context menu clone option.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @since 6.2.0
       */
      public clone(): void
      /**
       * Drawing context menu remove/delete option.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @since 6.2.0
       */
      public remove(): void
    }
    /**
     * UI Helper for managing study interaction, editing, deleting, and so forth.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * Requires the [cq-study-dialog]WebComponents.cq-study-dialog web component.
     *
     * Sets up a [studyOverlayEdit]studyOverlayEditEventListener event listener to display
     * a context menu for editing or deleting overlays and a
     * [studyPanelEdit]studyPanelEditEventListener event listener to display a dialog for
     * editing study parameters.
     *
     * 		context.
     *
     * @since 4.1.0 The `contextDialog` parameter is no longer passed in.
     */
    class StudyEdit {
      /**
       * UI Helper for managing study interaction, editing, deleting, and so forth.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}.
       *
       * Requires the [cq-study-dialog]WebComponents.cq-study-dialog web component.
       *
       * Sets up a [studyOverlayEdit]studyOverlayEditEventListener event listener to display
       * a context menu for editing or deleting overlays and a
       * [studyPanelEdit]studyPanelEditEventListener event listener to display a dialog for
       * editing study parameters.
       *
       * @param [node=context.topNode] Automatically attaches to the top node of the
       * 		context.
       * @param context The context for the chart.
       *
       * @since 4.1.0 The `contextDialog` parameter is no longer passed in.
       */
      constructor(node: HTMLElement | undefined, context: CIQ.UI.Context)
      /**
       * Closes Study Edit dialog.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       */
      public remove(): void
      /**
       * Proxy for editing a study.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * Assumes the params for the study have already been set.
       */
      public edit(): void
      /**
       * Finds the [cq-study-dialog]WebComponents.cq-study-dialog web component and proxies
       * the parameters over to it.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}.
       *
       * @param params Parameters from the
       * 		[studyPanelEdit]studyPanelEditEventListener event listener.
       */
      public editPanel(params: object): void
      /**
       * Displays the Edit Settings, Delete Study context dialog for overlay studies and
       * prepares the parameters for editing.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}.
       *
       * @param params Parameters from the
       * 		[studyOverlayEdit]studyOverlayEditEventListener event listener.
       */
      public editOverlay(params: object): void
      /**
       * Creates the callbacks for self and the context.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       */
      public initialize(): void
    }
    /**
     * UI Helper for Layout changes, for instance tapping items on the display menu.
     *
     * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
     *
     * This Helper is also responsible for initializing menu items in the "display" menu based on the <a href="CIQ.ChartEngine.html#layout%5B%60chartType%60%5D">chart layout</a>
     *
     * It can be extended to manage other layout events. For example, assuming the following HTML:
     * ```
     * <cq-heading>Defaults</cq-heading>
     * <cq-item stxtap="Layout.doStuff('thing1')">Do this thing</cq-item>
     * <cq-item stxtap="Layout.doStuff('thing2')">Do this other thing</cq-item>
     * <cq-separator></cq-separator>
     * ```
     *  * You would need the following corresponding function:
     * ```
     * CIQ.UI.Layout.prototype.doStuff=function(node,whatToDo){
     *     var stx=this.context.stx;
     *     alert(whatToDo);
     * };
     * ```
     * where the first parameter is always the node that was clicked, and can be manipulated to change as needed to add or remove styling, for example.
     * @since 4.1.0 Layout no longer takes a node as its first parameter
     */
    class Layout {
      /**
       * UI Helper for Layout changes, for instance tapping items on the display menu.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * This Helper is also responsible for initializing menu items in the "display" menu based on the <a href="CIQ.ChartEngine.html#layout%5B%60chartType%60%5D">chart layout</a>
       *
       * It can be extended to manage other layout events. For example, assuming the following HTML:
       * ```
       * <cq-heading>Defaults</cq-heading>
       * <cq-item stxtap="Layout.doStuff('thing1')">Do this thing</cq-item>
       * <cq-item stxtap="Layout.doStuff('thing2')">Do this other thing</cq-item>
       * <cq-separator></cq-separator>
       * ```
       *  * You would need the following corresponding function:
       * ```
       * CIQ.UI.Layout.prototype.doStuff=function(node,whatToDo){
       *     var stx=this.context.stx;
       *     alert(whatToDo);
       * };
       * ```
       * where the first parameter is always the node that was clicked, and can be manipulated to change as needed to add or remove styling, for example.
       * @param context The context
       * @param [params] Parameters
       * @param [params.activeClassName="ciq-active"] The class name to be added to a node when a layout item is enabled
       * @since 4.1.0 Layout no longer takes a node as its first parameter
       */
      constructor(context: CIQ.UI.Context, params?: {activeClassName?: String})
      /**
       * Convenience function to set the chart style or aggregation type from the Display drop-down
       * menu.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}
       *
       * Leverages CIQ.ChartEngine#setChartType and
       * CIQ.ChartEngine#setAggregationType.
       *
       * @param [node] The user interface element that enables users to set the chart
       * 		style or aggregation type.
       * @param chartType The chart style or aggregation type to be set.
       *
       */
      public setChartType(node: HTMLElement | undefined, chartType: String): void
      /**
       * Convenience function to set the chart scale from the Display drop-down menu.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}
       *
       * Leverages CIQ.ChartEngine#setChartScale.
       *
       * @param [node] The user interface element that enables users to set the chart
       * 		scale.
       * @param chartScale The type of scaling, such as "log", "linear", "percent", or
       * 		"relative".
       *
       */
      public setChartScale(node: HTMLElement | undefined, chartScale: String): void
      /**
       * Convenience function to set the inverted y-axis mode from the Display drop-down menu.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}
       *
       * Leverages CIQ.ChartEngine#flipChart.
       *
       * @param [node] The user interface element that enables users to flip the chart.
       *
       * @since 6.3.0
       */
      public setFlippedChart(node?: HTMLElement): void
      /**
       * Convenience function to set extended hours mode from the Display drop-down menu.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}
       *
       * See CIQ.Market and CIQ.ExtendedHours.
       *
       * @param [node] The user interface element that enables users to enable and
       * 		disable extended hours.
       *
       */
      public setExtendedHours(node?: HTMLElement): void
      /**
       * Convenience function to toggle the range slider mode from the Display drop-down menu.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}
       *
       * See CIQ.RangeSlider.
       *
       * @param [node] The user interface element that enables users to enable and
       * 		disable the range slider.
       *
       */
      public setRangeSlider(node?: HTMLElement): void
      /**
       * Convenience function that toggles the outliers layout property between on and off (true
       * and false). Invoked from the Display drop-down menu.
       *
       * @param [node] The user interface element that enables users to show and hide
       * 		outliers.
       *
       * @since 7.5.0
       */
      public setOutliers(node?: HTMLElement): void
      /**
       * Convenience function to set the aggregation type from the Display drop-down menu.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}
       *
       * Leverages CIQ.ChartEngine#setAggregationType.
       *
       * @param [node] The user interface element that enables users to set the
       * 		aggregation type.
       * @param aggregationType The aggregation type to be set.
       *
       */
      public setAggregationType(node: HTMLElement | undefined, aggregationType: string): void
      /**
       * Removes all studies from the top most node.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @param [node] The HTML user interface element used to clear all studies from the chart.
       */
      public clearStudies(node?: HTMLElement): void
      /**
       * Convenience function to set periodicity from the drop-down menu.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}
       *
       * Leverages CIQ.ChartEngine#setPeriodicity.
       * @param [node] The user interface element that enables users to set periodicity.
       * @param periodicity Same as `period` from CIQ.ChartEngine#setPeriodicity.
       * @param interval Same as `interval` from CIQ.ChartEngine#setPeriodicity.
       * @param timeUnit Same as `timeUnit` from CIQ.ChartEngine#setPeriodicity.
       *
       */
      public setPeriodicity(
        node: HTMLElement | undefined,
        periodicity: number,
        interval: number,
        timeUnit: number
      ): void
      /**
       * Populates and displays the language widget.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       */
      public setLanguage(): void
      /**
       * Displays the current language in the language widget.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the web components can be found here:
       * {@tutorial Web Component Interface}
       *
       * @param node The user interface element that enables users to select the chart
       * 		language.
       *
       * @since 6.1.0 Defaults to English.
       */
      public getLanguage(node: HTMLElement): void
    }
    /**
     * UI Helper for managing the 'Events' menu drop down for showing markers on the chart.
     *
     * @since 7.1.0
     */
    class Markers {
      /**
       * UI Helper for managing the 'Events' menu drop down for showing markers on the chart.
       *
       * @param context The context
       * @param params initialization parameters
       * @param params.menuItemSelector The selector used to identify menu items for selecting markers
       * @param [params.activeClassName="ciq-active"] The class name to be added to a node when a layout item is enabled
       * @param [params.implementation] A class for showing markers which implements the `showMarkers` method
       * @since 7.1.0
       */
      constructor(
        context: CIQ.UI.Context,
        params: {
          menuItemSelector: String,
          activeClassName?: String,
          implementation?: Object
        }
      )
      /**
       * Displays the markers of the type indicated or removes them all.
       * Updates display state of menu items
       *
       * 	Must be called from a menu item.
       *
       * To use, first create the methods for managing the markers:
       * ```
       * var markerImplementation=new MarkersSample(stxx);
       * ```
       *
       * Inside the `startUI` function add this line ( See sample-template-advanced.html for exact placement ):
       * ```
       * var UIMarkers=new CIQ.UI.Markers(UIContext, {menuItemSelector:".stx-markers cq-item", implementation:markerImplementation});
       * ```
       *
       * markerImplementation should include showMarkers function which should accept the following parameters:
       * - type 			: primary type of marker, such as: circle, square or of a specialized type such as: trade, video etc.
       * 								if type parameter is not provided all currently displayed markers are removed
       * - renderType : a secondary marker type
       *
       * A full implementation of the `MarkersSample` class can be found in the `examples/markers` directory.
       * @param node
       * @param type marker type (Circle, Square, Callout)
       * @param markerType Class of marker to draw (Simple or Performance)
       * @example
       * 	<cq-item stxtap="Markers.showMarkers('square')">
       * 	Simple Square<span></span>
       * </cq-item>
       * @since 7.1.0 Adds `markerType`.
       */
      public showMarkers(node: HTMLElement, type: String, markerType: String): void
    }
    /**
     * UI Helper for capturing and handling keystrokes. cb to capture the key.
     *
     * Developer is responsible for calling e.preventDefault() and/or e.stopPropagation();
     *
     */
    class Keystroke {
      /**
       * UI Helper for capturing and handling keystrokes. cb to capture the key.
       *
       * Developer is responsible for calling e.preventDefault() and/or e.stopPropagation();
       *
       * @param [cb] Callback when key pressed
       * @param [params]
       * @param [params.keysToRepeat] Keys to process multiple times if key is held down
       */
      constructor(cb?: Function, params?: {keysToRepeat?: any[]})
      /**
       * Map command key values from keyboard to their internal values.
       *
       * Note: `ctrl` and `cmd` should only be used with care as they may conflict with browser and OS hotkeys.
       *
       * @param key
       * @returns
       */
      public mapKey(key: string): string
      /**
       * Identifies a keypress event.
       * @param e
       */
      public keypress(e: KeyboardEvent): void
    }
    /**
     * UI Helper for capturing and handling keystrokes.
     *
     * A helper or ContextTag can "claim" keystrokes and intercept them, otherwise the keystrokes will be handled by keyup and keydown.
     *
     * If set to any other element (selector) then hot keys will only function when the mouse is hovering over that element.
     * @since 5.1.0 Setting `node` to anything other than `document` allows keystrokes to be restricted by hover focus.
     */
    class KeystrokeHub {
      /**
       * UI Helper for capturing and handling keystrokes.
       *
       * A helper or ContextTag can "claim" keystrokes and intercept them, otherwise the keystrokes will be handled by keyup and keydown.
       *
       * @param [node] The node or selector to which to attach. Defaults to `document` which means that hot keys will act globally.
       * If set to any other element (selector) then hot keys will only function when the mouse is hovering over that element.
       * @param context The context for the chart
       * @param [params] Parameters to drive the helper
       * @param [params.cb] Callback to handle hot keys.
       * @since 5.1.0 Setting `node` to anything other than `document` allows keystrokes to be restricted by hover focus.
       */
      constructor(
        node: HTMLElement | undefined,
        context: CIQ.UI.Context,
        params?: {
          cb?: Function
        }
      )
      /**
       * Change the active context for the hub, for instance when dealing with multiple charts.
       *
       * @param context The context
       */
      public setActiveContext(context: CIQ.UI.Context): void
    }
    /**
     * Self registering global web component that manages the overall UI on the attached div tag.
     *
     * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
     *
     * This component keeps track of open menus and dialogs and attaches click and tap (onclick or ontouch) events in order to close them.
     *
     * By default it is attached to the **"body"**, but it can be changed to a different div tag if this behavior is too broad for your particular implementation.
     */
    class UIManager {
      /**
       * Prevents underlay clicks and handles tap events and callbacks.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the WebComponents can be found here: {@tutorial Web Component Interface}
       *
       * Creates an array of the active Menus to keep track of which component is currently active.
       */
      public constructor()
      /**
       * Attach a callback to an individual component as part of the context.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the WebComponents can be found here: {@tutorial Web Component Interface}
       *
       */
      public connectedCallback(): void
      /**
       * Removes a callback from a component.
       *
       * Designed to be used as a helper method for the included WebComponents. A full
       * tutorial on how to work with and customize the WebComponents can be found here:
       * {@tutorial Web Component Interface}.
       *
       */
      public disconnectedCallback(): void
      /**
       * Closes the current active menu and resets the activeMenuStack.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the WebComponents can be found here: {@tutorial Web Component Interface}
       *
       * @param menu
       */
      public closeMenu(menu: HTMLElement): void
      /**
       * @example
       * <cq-dialog>
       * 	<cq-drawing-context>
       * 		<cq-menu cq-close-top="cq-dialog[cq-drawing-context]">
       * 			<div>This is a sub-menu</div>
       * 			<cq-menu-dropdown>
       * 				<cq-item>A stxtap event that bubbles to body will call UIManager#closeTopMenu</cq-item>
       * 				<cq-item>With the cq-close-top attribute above, the dialog will be closed as well</cq-item>
       * 			</cq-menu-dropdown>
       * 		</cq-menu>
       * 	</cq-drawing-context>
       * </cq-dialog>
       * @since 6.2.0 Added `cq-close-top` menu attribute to optionally close parent menus.
       */
      public closeTopMenu(): void
      public ifAllClosed(): void
      /**
       * Lifts a menu to an absolute position on the body, so that it can rise above any
       * overflow: hidden, scroll or iscroll situations.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the WebComponents can be found here: {@tutorial Web Component Interface}
       *
       * Use cq-lift attribute to indicate that the menu should be lifted when opened
       *
       * context.lifts is an array that contains all of the current lifts so that they can be restored when the menu is closed
       *
       * @param element DOM node to be lifted.
       */
      public lift(element: HTMLElement): void
      /**
       * Opens a menu item within the UI.Context.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the WebComponents can be found here: {@tutorial Web Component Interface}
       *
       * @param menu
       * @param params
       */
      public openMenu(menu: HTMLElement, params: Object): void
      /**
       *
       * @param element
       */
      public restoreLift(element: HTMLElement): void
      /**
       * Sets the top level menu in the activeMenuStack.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the WebComponents can be found here: {@tutorial Web Component Interface}
       *
       * @return activeMenuStack
       */
      public topMenu(): void
    }
    /**
     * The Chart class contains a collection of methods used to instantiate and configure charts
     * and the chart user interface.
     *
     * The decisions on what to initiate and how it gets initiated are based on the provided
     * configuration object and the availabilty of resources loaded in the CIQ namespace.
     *
     * @since 7.5.0
     */
    class Chart {
      /**
       * Creates the chart engine and user interface, including the UI context.
       *
       * @param [params] function parameters
       * @param [params.container] The HTML element that hosts the user interface elements
       * 		of the chart. The element is a `cq-context` element, or it contains a `cq-context`
       * 		element or element with a `cq-context` attribute. The context element, in turn,
       * 		contains a chart container element; that is, an element with class
       * 		`chartContainer`.
       * @param [params.config] Configuration for the chart engine, UI elements, and plug-ins.
       * 		See individual methods for configuration options.
       * @returns
       *
       * @since 7.5.0
       */
      public createChartAndUI(params?: {container?: HTMLElement, config?: Object}): CIQ.UI.Context
      /**
       * Initializes the chart container size change listener, channel subscriptions, and the
       * keystroke hub and its focus management (see CIQ.UI.KeystrokeHub).
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public initContainerListeners(uiContext: CIQ.UI.Context): void
      /**
       * Creates a symbol change filter and attaches it to the chart UI context and lookup
       * containers.
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public initLookup(uiContext: CIQ.UI.Context): void
      /**
       * Attaches a CIQ.UI.KeystrokeHub to the `body` element to enable users to start
       * typing anywhere on the page to activate the chart's symbol input box.
       *
       * Modify this method to use a different tag, such as a `div`, if this behavior is too
       * broad for your implementation.
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public initKeystrokeHub(uiContext: CIQ.UI.Context): void
      /**
       * Gets a callback that set the the active context of the keystroke hub based on the mouse
       * pointer location.
       *
       * When multiple charts are on a page, the chart with the mouse pointer over it responds
       * to keyboard input, such as shortcuts or symbol entry.
       *
       * @param uiContext The chart user interface context.
       * @param keystrokeHub A reference to the keystroke hub.
       * @returns A callback that sets the active context of the keystroke hub.
       *
       * @since 7.5.0
       */
      public getKeystrokeHubSetter(uiContext: CIQ.UI.Context, keystrokeHub: CIQ.UI.KeystrokeHub): Function
      /**
       * Subscribes to the dialog channel.
       *
       * Creates an element for the requested dialog if one does not exist in the document scope.
       * Opens the dialog in response to channel messages.
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public initDialogHandler(uiContext: CIQ.UI.Context): void
      /**
       * Subscribes to the drawing channel to manage drawing tool visibility based on channel
       * messages.
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public initDrawingTools(uiContext: CIQ.UI.Context): void
      /**
       * Creates a CIQ.UI.DrawingEdit helper and adds listeners to the helper. The
       * listeners post messages in the drawing channel when drawing starts and ends.
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public initDrawingEditListeners(uiContext: CIQ.UI.Context): void
      /**
       * Creates and appends a [cq-color-picker]WebComponents.cq-color-picker component
       * to the document body if one is not already attached.
       *
       * @since 7.5.0
       */
      public initColorPicker(): void
      /**
       * Loads a chart with an initial symbol. When configured to restore the layout (which is
       * the default), recreates the settings used in the previous session, including the last
       * viewed symbol.
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public loadChart(uiContext: CIQ.UI.Context): void
      /**
       * Event handler for chart container size changes. Posts messages in the `breakpoint` and
       * `containerSize` channels when the context container size has changed.
       *
       * Listening for container size changes in some browsers can be inefficient. This function
       * improves notification efficiency by posting messages for specific changes, such as
       * changes in responsive layout break points.
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public notifySizeChanges(uiContext: CIQ.UI.Context): void
      /**
       * Maps numeric widths to responsive break types. Break types include small (`break-sm`),
       * medium (`break-md`), and large (`break-lg`).
       *
       * @param width The widht in pixels for which a break type is determined.
       * @return The break type, one of `break-sm`, `break-md`, or `break-lg`.
       *
       * @since 7.5.0
       */
      public getBreakpoint(width: Number): String
      /**
       * Initiates event marker functionality.
       *
       * @param uiContext The chart user interface context.
       *
       * @since 7.5.0
       */
      public initEventMarkers(uiContext: CIQ.UI.Context): void
      /**
       * Installs add-ons and plug-ins.
       *
       * @param params
       * @param [params.stx] A reference to the chart engine.
       * @param [params.uiContext] The chart user interface context.
       * @param [params.config] Contains the chart configuration, which includes a list of
       * 		add-ons and a list of plug-ins.
       * @param [params.type] Type of extension, either "addOns" or "plugins".
       *
       * @since 7.5.0
       */
      public initExtensions(
        params: {
          stx?: CIQ.ChartEngine,
          uiContext?: CIQ.UI.Context,
          config?: Object,
          type?: String
        }
      ): void
      /**
       * Returns a setter function that updates the size of the side navigation panel by
       * positioning the chart container `div`.
       *
       * @param uiContext The chart user interface context.
       * @returns A function that sets the size of the side navigation panel.
       *
       * @since 7.5.0
       */
      public chartPositionSetter(uiContext: CIQ.UI.Context): Function
      /**
       * Returns a setter that updates the width of the side navigation panel by positioning the
       * chart area (the HTML element that has the CSS class `ciq-chart-area`).
       *
       * @param uiContext The chart user interface context.
       * @returns A function that sets the size of the side navigation panel.
       *
       * @since 7.5.0
       */
      public sidenavSizeSetter(uiContext: CIQ.UI.Context): Function
      /**
       * Returns a setter that updates the top position of the chart area (the HTML element that
       * has the CSS class `ciq-chart-area`) based on the height of the plug-ins panel.
       *
       * @param uiContext The chart user interface context.
       * @returns A function that sets the top position of the chart area.
       *
       * @since 7.5.0
       */
      public chartAreaTopSetter(uiContext: CIQ.UI.Context): Function
      /**
       * Returns a setter that updates the width of the side panel by setting the right position
       * of the chart area (the HTML element that has the CSS class `ciq-chart-area`) and the
       * right margin of the Analyst Views plug-in, `cq-analystviews`.
       *
       * @param uiContext The chart user interface context.
       * @returns A function that sets the width of the side panel.
       *
       *
       * @since 7.5.0
       */
      public sidepanelSizeSetter(uiContext: CIQ.UI.Context): Function
      /**
       * Returns a setter that updates the responsive break point of the top node of the chart
       * user interface context.
       *
       * @param uiContext The chart user interface context.
       * @returns A function that sets the responsive break point of the UI context.
       *
       * @since 7.5.0
       */
      public breakpointSetter(uiContext: CIQ.UI.Context): Function
    }
    /**
     * Attaches an event listener to the supplied element.
     *
     * Designed to be used as a helper method for the included WebComponents.
     * A full tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @param element The DOM element to which the listener is attached.
     * @param listener The listener function to attach to the DOM element.
     * @param [selector] A CSS selector to apply to `element` to obtain the descendant
     * 		element to which the listener is attached.
     *
     * @since 8.1.0
     */
    function stxtap(element: HTMLElement, listener: Function, selector?: string): void
    /**
     * Determines the visibility of a DOM element based on the following CSS properties:
     * - opacity
     * - display
     * - visibility
     * - width
     * - height
     *
     * @param node The node for which visibility is determined.
     * @return Whether the element is visible.
     *
     * @since 8.1.0
     */
    function trulyVisible(node: HTMLElement): boolean
    /**
     * Attaches a callback to listen for resize events on the DOM.
     *
     * Designed to be used as a helper method for the included WebComponents.
     * A full tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @param element The node to which the listener is attached.
     * @param fn The listener function to attach to the DOM element.
     *
     * @since 7.4.0 Replaces CIQ.addResizeListener.
     */
    function addResizeListener(element: Node, fn: Function): void
    /**
     * Removes an attached resize event listener from a DOM element.
     *
     * Designed to be used as a helper method for the included WebComponents.
     * A full tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @param element The node from which the listener is removed.
     *
     * @since 7.4.0 Replaces CIQ.removeResizeListener.
     */
    function removeResizeListener(element: Node): void
    /**
     * Executes a function in the nearest parent component (container). For instance, a `cq-close`
     * component might call "close" on its containing component.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @param self A reference to a web component. The function is called on a parent of
     * 		the component.
     * @param fn The name of the function to execute.
     * @param args Arguments array (a "spread" is also supported).
     *
     */
    function containerExecute(self: Object, fn: String, args: any[]): void
    /**
     * Convenience function to display the changing price of a node (price flash green/red).
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * This functionality, especially with the fade effect, can be CPU expensive if many updates
     * per second or multiple charts on a screen exist. To disable simply set
     * `CIQ.UI.animatePrice = function () { };`.
     *
     * @param node The HTML element on which to apply the changing price effect.
     * @param newPrice The new price; can be higher or lower than the previous price.
     * @param oldPrice The previous price.
     * @param fade If `true`, animate the price with a fade transition effect;
     * 		otherwise, do not use a transition effect.
     *
     * @since 7.2.0 Added the `fade` argument.
     */
    function animatePrice(
      node: Node,
      newPrice: number,
      oldPrice: number,
      fade: boolean
    ): void
    /**
     * Convenience function for making a new node collection from an HTML5 template.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @param node The template from which the node collection is created, can be a jQuery object.
     * @param [appendTo] If set to an element, then the template is
     * 		automatically appended to the element. If set to true, then the new node collection is
     * 		automatically added in place (appended to the template's parent). A falsey value prevents
     * 		the contents of the template from being added to the DOM.
     * @return The node collection extracted from the template as a jQuery, if available, or Faquery object.
     *
     * @since 8.1.0 Input parameters continue to support jQuery elements. If `node` is a jQuery
     * 		element, then the return type is also a jQuery element.
     */
    function makeFromTemplate(node: string|HTMLElement|object, appendTo?: HTMLElement|boolean): object
    /**
     * Observes an object's property. The listener receives an object of the form:
     * `{obj, property, value}`. This uses getters and setters. Thus, you should not attempt to
     * observe a property which already has a getter or setter.
     *
     * **Note:** The listener is only executed when the property is assigned a different value
     * than it already has.
     *
     * @param property Name of the observed property.
     * @param obj Object that contains the property.
     * @param listener Function to execute when the property changes.
     *
     * @since 7.2.0 Replaces CIQ.UI.observe.
     *
     * @example
     * var stx=this.context.stx, className=this.params.activeClassName;
     * var listener=function(obj){
     *		if(obj.value) node.classList.add(className);
     *		else node.classList.remove(className);
     * };
     * CIQ.UI.observeProperty("flipped", stx.layout, listener);
     */
    function observeProperty(property: String, obj: Object, listener: Function): void
    /**
     * Removes the listener from an object's property.
     *
     * @param property Name of the property from which the listener is removed.
     * @param obj Object that contains the property.
     * @param [listener] Optional listener to remove; otherwise, the entire object will
     * 		be removed and made unobservable.
     *
     * @since 7.2.0 Replaces CIQ.UI.unobserve.
     */
    function unobserveProperty(property: String, obj: Object, listener?: Function): void
    /**
     * Utility to get the context for a tag.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * It traverses up the parent stack looking for a parent with a context member, or the actual
     * `cq-context`. If no context can be found then returns null.
     *
     * @param me The element for which to get the context.
     * @return The context or null if none found.
     *
     */
    function getMyContext(me: HTMLElement): CIQ.UI.Context
    /**
     * Utility to run a function across all contexts.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * The value of `this` is set to the context.
     *
     * @param func Function to run.
     *
     *
     * @example
     *  CIQ.UI.contextsForEach(function(){
     *  	this.stx.doSomething();
     *  });
     */
    function contextsForEach(func: Function): void
    /**
     * Set this flag to true to bypass bindings when adding a component to the DOM.
     *
     * Designed to be used with the included WebComponents. A full tutorial on how to work
     * with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * For instance, when components are created by html2canvas, we don't want them to do any
     * heavy lifting.
     *
     *
     */
    let bypassBindings: Boolean
    /**
     * Starts the UI.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @param [cb] Optional callback returns when web components are initialized.
     *
     */
    function begin(cb?: Function): void
    /**
     * Adds a web component definition to the list of web components.
     *
     * The component is ultimately registered as a custom element by
     * CIQ.UI.registerComponents.
     *
     * Separating registration of the component from addition of the component to the component
     * list provides the ability to customize the web component via class extension. Customized
     * classes can be re-added using the original tag name.
     *
     * @param [customTagName] Tag name that identifies the web component class; for
     * 		example, cq-abstract-marker.
     * @param [classDefinition] The class definition of the component; for example, the
     * 		definition of the AbstractMarker class.
     *
     * @since 7.5.0
     */
    function addComponentDefinition(customTagName?: String, classDefinition?: Function): void
    /**
     * Registers components added with CIQ.UI.addComponentDefinition.
     *
     * @param config Configuration
     * @param [config.except=[]] A list of tags that should not be registered, reserving the
     * 		tag names for an alternative use.
     *
     * @since 7.5.0
     */
    function registerComponents(config: {except?: String[]}): void
    /**
     * Ensures that all web components in the web component list (see
     * [addComponentDefinition]CIQ.UI.addComponentDefinition) have been registered.
     *
     * @since 7.5.0
     *
     * @see CIQ.UI.registerComponents
     */
    function ensureComponentsRegistered(): void
    /**
     * Gets an array of components from the list of registered components.
     *
     * @param identifier Tag, class name, or class definition used to identify
     * 		registered components.
     * @return An array of components identified by `identifier`. The array elements
     * 		contain the tag, name, registration status, and markup of the matched components.
     * 		If an identifier is not provided, data for all registered components is returned.
     *
     * @since 8.0.0
     */
    function components(identifier: string|Function): any[]
    /**
     * Getter and setter for component markup.
     *
     * @param identifier Tag, class name, or class definition that identifies a
     * 		component.
     * @param markup If provided, sets the markup for the identified component.
     * @return An object containing the tag, name, registration status, and
     * 		markup of the identified component. If an identifier is not provided, returns data for
     *		all registered components. If an identifier is provided, but a registered component
     *		cannot be found, returns undefined.
     *
     * @since 7.5.0
     */
    function componentMarkup(identifier: String|Function, markup: String): Object|undefined
    /**
     * Returns the dependencies of all web components based on the web component markup.
     *
     * Any web component that has markup that relies on another web component is listed in the
     * returned object along with an array of the component's dependencies.
     *
     * **Note:** Call this function after all web components have been loaded, otherwise the
     * results will not accurately reflect the dependencies.
     *
     * @return An object with the following properties:
     * - `dependencies` — An object whose properties are the names of web components that
     *    have dependencies. The value of each property is an array of the dependencies.
     * - `timesNeeded` — An object whose properties are the names of the web components that
     *    are dependencies for other web components. The value of each property is the number of
     *    times the component is needed as a dependency.
     *
     * For example:
     *
     * ```js
     * {
     *     dependencies: {
     *         cq-aggregation-dialog: ["cq-close"],
     *         cq-chartcontrol-group: ["cq-clickable", "cq-lookup", "cq-menu", "cq-menu-container", "cq-toggle", "cq-menu-dropdown"],
     *         cq-chart-legend: ["cq-comparison", "cq-study-legend", "cq-swatch"],
     *         cq-comparison-lookup: ["cq-comparison", "cq-lookup", "cq-menu", "cq-swatch"],
     *         cq-drawing-context: ["cq-menu", "cq-menu-dropdown"],
     *         cq-fib-settings-dialog: ["cq-scroll"],
     *         cq-info-toggle: ["cq-toggle"],
     *         cq-language-dialog: ["cq-close"],
     *         cq-lookup: ["cq-scroll"],
     *         cq-share-dialog: ["cq-close"],
     *         cq-study-dialog: ["cq-menu", "cq-scroll", "cq-study-input", "cq-study-output", "cq-study-parameter", "cq-swatch",
     *                           "cq-menu-dropdown"],
     *         cq-theme-dialog: ["cq-close", "cq-scroll", "cq-swatch", "cq-theme-piece"],
     *         cq-themes: ["cq-close"],
     *         cq-timezone-dialog: ["cq-close"],
     *         cq-views: ["cq-heading"],
     *         cq-drawing-palette: ["cq-menu", "cq-redo", "cq-scroll", "cq-toggle", "cq-undo", "cq-menu-dropdown"],
     *         cq-drawing-settings: ["cq-clickable", "cq-cvp-controller", "cq-menu", "cq-wave-parameters", "cq-menu-dropdown"]
     *     },
     *     timesNeeded: {
     *         cq-close: 6,
     *         cq-clickable: 2,
     *         cq-lookup: 2,
     *         cq-menu: 6,
     *         cq-menu-container: 1,
     *         cq-toggle: 3,
     *         cq-menu-dropdown: 5,
     *         cq-comparison: 2,
     *         cq-study-legend: 1,
     *         cq-swatch: 4,
     *         cq-scroll: 5,
     *         cq-study-input: 1,
     *         cq-study-output: 1,
     *         cq-study-parameter: 1,
     *         cq-theme-piece: 1,
     *         cq-heading: 1,
     *         cq-redo: 1,
     *         cq-undo: 1,
     *         cq-cvp-controller: 1,
     *         cq-wave-parameters: 1
     *     }
     * }
     *```
     *
     * @since 8.0.0
     */
    function markupDependencies(): object
    /**
     * Utility method for adding multiple inheritances to a base object.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @param target Target object.
     * @param source Source object.
     *
     */
    function addInheritance(target: Object, source: Object): void
    /**
     * Utility method for checking if an HTML5 input type is supported.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * Returns the type passed in if it's supported or a fallback type if it is not.
     *
     * @param type HTML5 input type to be tested.
     * @return The supported input type, or the fallback input type (usually "text").
     *
     * @since 6.3.0
     */
    function supportedInputType(type: String): String
    /**
     * Obtains a reference to the document's [cq-ui-manager]WebComponents.cq-ui-manager
     * instance or, if one does not exist, creates an instance.
     *
     * Avoids the need for a `cq-ui-manager` singleton when multiple charts are present in one
     * document.
     *
     * @returns A reference to the document's UI manager.
     *
     * @since 7.5.0
     */
    function getUIManager(): CIQ.UI.UIManager
  }

  export namespace CIQ {
    /**
     * Namespace for UI helper objects.
     *
     * Designed to be used as helper methods for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     */
    class UI {
      /**
       * Wraps a node or node list in a jQuery object or Faquery object.
       *
       * If jQuery is enabled, performs `$()` on the argument and returns it. If jQuery is not enabled
       * or the `force` parameter is true, uses the Faquery emulator.
       *
       * @param element Node or node list to be wrapped in a jQuery or Faquery
       * 		object.
       * @param force If true, the function never uses jQuery, instead always uses
       * 		Faquery.
       * @returns A jQuery object if jQuery is enabled and `force` is false; otherwise,
       * 		a Faquery object. The returned object wraps `element`.
       *
       * @since 8.1.0
       */
      public static $(element: Node|NodeList, force: boolean): object
    }
  }

  export namespace CIQ.Marker {
    /**
     * A heads up marker for displaying OHLC values on the chart.
     *
     * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
     *
     */
    class HeadsUp {
      /**
       * A heads up marker for displaying OHLC values on the chart.
       *
       * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
       *
       * @param params
       * @param showClass
       */
      constructor(params: Object, showClass: string)
    }
  }

  /**
   * Abstract class for WebComponents using this framework.
   *
   * Provides a base set of functionality for web components.
   *
   * @extends HTMLElement
   *
   * @see WebComponents
   */
  export namespace CIQ.UI.BaseComponent {
    /**
     * Locates the nearest UI helper for a given attribute. If none exists, then it is created
     * at the top node of the chart context.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the WebComponents can be found here:
     * {@tutorial Web Component Interface}.
     *
     * @param node A node with either the `stxbind` or `stxtap` attribute.
     * @param [binding] The type of binding or helper name being looked for,
     * 		otherwise the stxbind and then stxtap attributes are queried
     * @param attribute Either "stxtap" or "stxbind". Only required if
     * 		`binding==null`.
     * @return A UI helper object.
     *
     */
    function getHelper(
      node: HTMLElement,
      binding: String | undefined,
      attribute: String
    ): CIQ.UI.Helper
    /**
     * Set bindings for a node that has been created dynamically. The attribute can be either
     * "stxbind", "stxtap" or "stxsetget".
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the WebComponents can be found here:
     * {@tutorial Web Component Interface}.
     *
     * In the case of stxsetget, a "set" and "get" will be prepended to the bound method.
     * <Helper>.getXxxxx() will be called once during this initialization. That method should
     * set up a binding.
     *
     * When tapping (or changing value in the case of an input field) <Helper>.setXxxx() will
     * be called.
     *
     * Bindings in web components will search for the nearest parent component that contains
     * the expected function (see the examples).
     *
     * @param node The node to bind.
     * @param [params] Parameters passed as the final argument.
     *
     * @since 7.0.0 Previously CIQ.UI.BaseComponent.bind.
     *
     * @example
     * <caption>Look for the next parent with method <code>tool()</code>.</caption>
     * stxtap="tool('gartley')"
     *
     * @example
     * <caption>To explicitly target a web component, use a prefix.</caption>
     * stxtap="DrawingToolbar.tool('gartley')"
     */
    function bindNode(node: HTMLElement, params?: Object): void
    /**
     * Travels the DOM tree and locates `stxbind` attributes.
     *
     * Designed to be used as a helper method for the included WebComponents. A full
     * tutorial on how to work with and customize the web components can be found here:
     * {@tutorial Web Component Interface}.
     *
     * UI elements can use these to configure menus or dialogs. To effect reverse binding,
     * set the value of the `stxbind` attribute to a Helper class name and data element. For
     * instance `Layout.chartStyle`.
     *
     * The Helper element will seek out all children with `stxtap` attribution and examine
     * the arguments to that function call for a match.
     *
     * @param [traverseNode] Specify the node to traverse. Defaults to `topNode`
     * 		for the context.
     *
     */
    function buildReverseBindings(traverseNode?: HTMLElement): void
    /**
     * Searches the DOM for an element that has the CSS class, HTML attribute, or tag name
     * (node name) specified in `classOrAttributeOrTag`.
     *
     * Begins the search with `startEl` and proceeds up the ancestry tree until an element is
     * found or the root of the tree has been reached.
     *
     * @param startEl The element on which to start the search.
     * @param classOrAttributeOrTag The CSS class, HTML attribute, or node name for
     * 		which to search.
     * @return The found element or undefined if an element was not
     * 		found.
     *
     * @since 7.5.0
     */
    function selfOrParentElement(startEl: HTMLElement, classOrAttributeOrTag: String): HTMLElement|undefined
    /**
     * Walks an object path by means of the elements of the `path` argument, excluding the
     * last element. Starts the walk with `startObj`.
     *
     * For example, if the path is "x.y.z.end" and the starting object is myObj, the function
     * attempts to find myObj.x.y.z.
     *
     * @param path A string of dot-separated elements, such as "channel.breakpoint".
     * @param startObj The initial object in the object path, such as an instance of
     * 		`CIQ.ChartEngine`.
     * @return An object literal containing the last property in the path and an
     * 		object referenced by the succession of the preceding path elements; for example,
     * 		the path `channel.breakpoint` and an instance of the chart engine as the starting
     * 		object would produce {"breakpoint", chartEngine.channel}. If any of the path
     * 		elements (excluding the last) is not a property of the object path, the function
     * 		returns an empty object ({}).
     *
     * @since 7.5.0
     */
    function toPropAndObject(path: String, startObj: Object): Object
    /**
     * Retrieves a channel object and property from the given path.
     *
     * @param path The channel path.
     * @param [stx] A reference to the chart engine.
     * @param [self] A component reference used to optionally obtain a reference to
     * 		the chart engine.
     * @return An object containing the channel object and property name.
     * 		Returns undefined if the path is not provided or if one of `stx` or `self` is not
     * 		provided.
     *
     * @since 7.5.0
     */
    function getChannel(path: any, stx?: CIQ.ChartEngine, self?: Object): Object|undefined
  }

  /**
   * A heads up marker for displaying OHLC values on the chart.
   *
   * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
   *
   */
  export namespace CIQ.Marker.HeadsUp {
    /**
     * Determines the location of the HeadsUp Marker.
     *
     * Designed to be used as a helper method for the included WebComponents. A full tutorial on how to work with and customize the web components can be found here: {@tutorial Web Component Interface}
     *
     * @param params
     */
    function placementFunction(params: Object): void
  }

  /**
   * UI Helper for capturing and handling keystrokes. cb to capture the key.
   *
   * Developer is responsible for calling e.preventDefault() and/or e.stopPropagation();
   *
   */
  export namespace CIQ.UI.Keystroke {
    /**
     * Set this to true to bypass key capture. Shift, CTRL, CMD will still be toggled however.
     *
     */
    let noKeyCapture: Boolean
  }

  /**
   * UI Helper for capturing and handling keystrokes.
   *
   * A helper or ContextTag can "claim" keystrokes and intercept them, otherwise the keystrokes will be handled by keyup and keydown.
   *
   * If set to any other element (selector) then hot keys will only function when the mouse is hovering over that element.
   * @since 5.1.0 Setting `node` to anything other than `document` allows keystrokes to be restricted by hover focus.
   */
  export namespace CIQ.UI.KeystrokeHub {
    /**
     * Global default hotkey method. Pass this or your own method in to CIQ.UI.KeystrokeHub
     * @param  key The pressed key
     * @param  hub The hub that processed the key
     * @param  hub.hotkeyConfig Hotkey settings options
     * @param  hub.hotkeys Specifies the default hotkeys
     * @param  e The KeyboardEvent that triggered the function call
     * @return     Return true if you captured the key
     */
    function defaultHotKeys(
      key: number,
      hub: {
        hotkeyConfig: Object,
        hotkeys: Object
      },
      e: KeyboardEvent
    ): boolean
    /**
     * Default hotkey execution. Called from CIQ.UI.KeystrokeHub.defaultHotKeys.
     *
     * @param params
     * @param params.stx A reference to the chart engine.
     * @param params.action The action to execute
     * @param [params.options] Any options specified in the config
     * @return Return true if command was executed, false if invalid command
     */
    function executeHotkeyCommand(
      params: {
        stx: CIQ.ChartEngine,
        action: string,
        options?: object
      }
    ): boolean
  }
}
