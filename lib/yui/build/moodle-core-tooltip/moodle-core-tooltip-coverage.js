if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/moodle-core-tooltip/moodle-core-tooltip.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/moodle-core-tooltip/moodle-core-tooltip.js",
    code: []
};
_yuitest_coverage["build/moodle-core-tooltip/moodle-core-tooltip.js"].code=["YUI.add('moodle-core-tooltip', function (Y, NAME) {","","/**"," * Provides the base tooltip class."," *"," * @module moodle-core-tooltip"," */","","/**"," * A base class for a tooltip."," *"," * @param {Object} config Object literal specifying tooltip configuration properties."," * @class M.core.tooltip"," * @constructor"," * @extends M.core.dialogue"," */","function TOOLTIP(config) {","    if (!config) {","        config = {};","    }","","    // Override the default options provided by the parent class.","    if (typeof config.draggable === 'undefined') {","        config.draggable = true;","    }","","    if (typeof config.constrain === 'undefined') {","        config.constrain = true;","    }","","    if (typeof config.lightbox === 'undefined') {","        config.lightbox = false;","    }","","    TOOLTIP.superclass.constructor.apply(this, [config]);","}","","var SELECTORS = {","        CLOSEBUTTON: '.closebutton'","    },","","    CSS = {","        PANELTEXT: 'tooltiptext'","    },","    RESOURCES = {","        WAITICON: {","            pix: 'i/loading_small',","            component: 'moodle'","        }","    },","    ATTRS = {};","","/**"," * Static property provides a string to identify the JavaScript class."," *"," * @property NAME"," * @type String"," * @static"," */","TOOLTIP.NAME = 'moodle-core-tooltip';","","/**"," * Static property used to define the CSS prefix applied to tooltip dialogues."," *"," * @property CSS_PREFIX"," * @type String"," * @static"," */","TOOLTIP.CSS_PREFIX = 'moodle-dialogue';","","/**"," * Static property used to define the default attribute configuration for the Tooltip."," *"," * @property ATTRS"," * @type String"," * @static"," */","TOOLTIP.ATTRS = ATTRS;","","/**"," * The initial value of the header region before the content finishes loading."," *"," * @attribute initialheadertext"," * @type String"," * @default ''"," * @writeOnce"," */","ATTRS.initialheadertext = {","    value: ''","};","","/**","  * The initial value of the body region before the content finishes loading.","  *","  * The supplid string will be wrapped in a div with the CSS.PANELTEXT class and a standard Moodle spinner","  * appended.","  *","  * @attribute initialbodytext","  * @type String","  * @default ''","  * @writeOnce","  */","ATTRS.initialbodytext = {","    value: '',","    setter: function(content) {","        var parentnode,","            spinner;","        parentnode = Y.Node.create('<div />')","            .addClass(CSS.PANELTEXT);","","        spinner = Y.Node.create('<img />')","            .setAttribute('src', M.util.image_url(RESOURCES.WAITICON.pix, RESOURCES.WAITICON.component))","            .addClass('spinner');","","        if (content) {","            // If we have been provided with content, add it to the parent and make","            // the spinner appear correctly inline","            parentnode.set('text', content);","            spinner.addClass('iconsmall');","        } else {","            // If there is no loading message, just make the parent node a lightbox","            parentnode.addClass('content-lightbox');","        }","","        parentnode.append(spinner);","        return parentnode;","    }","};","","/**"," * The initial value of the footer region before the content finishes loading."," *"," * If a value is supplied, it will be wrapped in a <div> first."," *"," * @attribute initialfootertext"," * @type String"," * @default ''"," * @writeOnce"," */","ATTRS.initialfootertext = {","    value: null,","    setter: function(content) {","        if (content) {","            return Y.Node.create('<div />')","                .set('text', content);","        }","    }","};","","/**"," * The function which handles setting the content of the title region."," * The specified function will be called with a context of the tooltip instance."," *"," * The default function will simply set the value of the title to object.heading as returned by the AJAX call."," *"," * @attribute headerhandler"," * @type Function|String|null"," * @default set_header_content"," */","ATTRS.headerhandler = {","    value: 'set_header_content'","};","","/**"," * The function which handles setting the content of the body region."," * The specified function will be called with a context of the tooltip instance."," *"," * The default function will simply set the value of the body area to a div containing object.text as returned"," * by the AJAX call."," *"," * @attribute bodyhandler"," * @type Function|String|null"," * @default set_body_content"," */","ATTRS.bodyhandler = {","    value: 'set_body_content'","};","","/**"," * The function which handles setting the content of the footer region."," * The specified function will be called with a context of the tooltip instance."," *"," * By default, the footer is not set."," *"," * @attribute footerhandler"," * @type Function|String|null"," * @default null"," */","ATTRS.footerhandler = {","    value: null","};","","/**"," * The function which handles modifying the URL that was clicked on."," *"," * The default function rewrites '.php' to '_ajax.php'."," *"," * @attribute urlmodifier"," * @type Function|String|null"," * @default null"," */","ATTRS.urlmodifier = {","    value: null","};","","/**"," * Set the Y.Cache object to use."," *"," * By default a new Y.Cache object will be created for each instance of the tooltip."," *"," * In certain situations, where multiple tooltips may share the same cache, it may be preferable to"," * seed this cache from the calling method."," *"," * @attribute textcache"," * @type Y.Cache|null"," * @default null"," */","ATTRS.textcache = {","    value: null","};","","/**"," * Set the default size of the Y.Cache object."," *"," * This is only used if no textcache is specified."," *"," * @attribute textcachesize"," * @type Number"," * @default 10"," */","ATTRS.textcachesize = {","    value: 10","};","","Y.extend(TOOLTIP, M.core.dialogue, {","    // The bounding box.","    bb: null,","","    // Any event listeners we may need to cancel later.","    listenevents: [],","","    // Cache of objects we've already retrieved.","    textcache: null,","","    // The align position. This differs for RTL languages so we calculate once and store.","    alignpoints: [","        Y.WidgetPositionAlign.TL,","        Y.WidgetPositionAlign.RC","    ],","","    initializer: function() {","        // Set the initial values for the handlers.","        // These cannot be set in the attributes section as context isn't present at that time.","        if (!this.get('headerhandler')) {","            this.set('headerhandler', this.set_header_content);","        }","        if (!this.get('bodyhandler')) {","            this.set('bodyhandler', this.set_body_content);","        }","        if (!this.get('footerhandler')) {","            this.set('footerhandler', function() {});","        }","        if (!this.get('urlmodifier')) {","            this.set('urlmodifier', this.modify_url);","        }","","        // Set up the dialogue with initial content.","        this.setAttrs({","            headerContent: this.get('initialheadertext'),","            bodyContent: this.get('initialbodytext'),","            footerContent: this.get('initialfootertext'),","            zIndex: 150","        });","","        // Hide and then render the dialogue.","        this.hide();","        this.render();","","        // Hook into a few useful areas.","        this.bb = this.get('boundingBox');","","        // Change the alignment if this is an RTL language.","        if (right_to_left()) {","            this.alignpoints = [","                Y.WidgetPositionAlign.TR,","                Y.WidgetPositionAlign.LC","            ];","        }","","        // Set up the text cache if it's not set up already.","        if (!this.get('textcache')) {","            this.set('textcache', new Y.Cache({","                // Set a reasonable maximum cache size to prevent memory growth.","                max: this.get('textcachesize')","            }));","        }","","        // Disable the textcache when in developerdebug.","        if (M.cfg.developerdebug) {","            this.get('textcache').set('max', 0);","        }","","        return this;","    },","","    /**","     * Display the tooltip for the clicked link.","     *","     * The anchor for the clicked link is used.","     *","     * @method display_panel","     * @param {EventFacade} e The event from the clicked link. This is used to determine the clicked URL.","     */","    display_panel: function(e) {","        var clickedlink, thisevent, ajaxurl, config, cacheentry;","","        // Prevent the default click action and prevent the event triggering anything else.","        e.preventDefault();","        e.stopPropagation();","","        // Cancel any existing listeners and close the panel if it's already open.","        this.cancel_events();","","        // Grab the clickedlink - this contains the URL we fetch and we align the panel to it.","        clickedlink = e.target.ancestor('a', true);","","        // Align with the link that was clicked.","        this.align(clickedlink, this.alignpoints);","","        // Reset the initial text to a spinner while we retrieve the text.","        this.setAttrs({","            headerContent: this.get('initialheadertext'),","            bodyContent: this.get('initialbodytext'),","            footerContent: this.get('initialfootertext')","        });","","        // Now that initial setup has begun, show the panel.","        this.show();","","        // Add some listen events to close on.","        thisevent = this.bb.delegate('click', this.close_panel, SELECTORS.CLOSEBUTTON, this);","        this.listenevents.push(thisevent);","","        thisevent = Y.one('body').on('key', this.close_panel, 'esc', this);","        this.listenevents.push(thisevent);","","        // Listen for mousedownoutside events - clickoutside is broken on IE.","        thisevent = this.bb.on('mousedownoutside', this.close_panel, this);","        this.listenevents.push(thisevent);","","        // Modify the URL as required.","        ajaxurl = Y.bind(this.get('urlmodifier'), this, clickedlink.get('href'))();","","        cacheentry = this.get('textcache').retrieve(ajaxurl);","        if (cacheentry) {","            // The data from this help call was already cached so use that and avoid an AJAX call.","            this._set_panel_contents(cacheentry.response);","        } else {","            // Retrieve the actual help text we should use.","            config = {","                method: 'get',","                context: this,","                sync: false,","                on: {","                    complete: function(tid, response) {","                        this._set_panel_contents(response.responseText, ajaxurl);","                    }","                }","            };","","            Y.io(ajaxurl, config);","        }","    },","","    _set_panel_contents: function(response, ajaxurl) {","        var responseobject;","","        // Attempt to parse the response into an object.","        try {","            responseobject = Y.JSON.parse(response);","            if (responseobject.error) {","                this.close_panel();","                return new M.core.ajaxException(responseobject);","            }","        } catch (error) {","            this.close_panel();","            return new M.core.exception(error);","        }","","        // Set the contents using various handlers.","        // We must use Y.bind to ensure that the correct context is used when the default handlers are overridden.","        Y.bind(this.get('headerhandler'), this, responseobject)();","        Y.bind(this.get('bodyhandler'), this, responseobject)();","        Y.bind(this.get('footerhandler'), this, responseobject)();","","        if (ajaxurl) {","            // Ensure that this data is added to the cache.","            this.get('textcache').add(ajaxurl, response);","        }","","        this.get('buttons').header[0].focus();","    },","","    set_header_content: function(responseobject) {","        this.set('headerContent', responseobject.heading);","    },","","    set_body_content: function(responseobject) {","        var bodycontent = Y.Node.create('<div />')","            .set('innerHTML', responseobject.text)","            .setAttribute('role', 'alert')","            .addClass(CSS.PANELTEXT);","        this.set('bodyContent', bodycontent);","    },","","    modify_url: function(url) {","        return url.replace(/\\.php\\?/, '_ajax.php?');","    },","","    close_panel: function(e) {","        // Hide the panel first.","        this.hide();","","        // Cancel the listeners that we added in display_panel.","        this.cancel_events();","","        // Prevent any default click that the close button may have.","        if (e) {","            e.preventDefault();","        }","    },","","    cancel_events: function() {","        // Detach all listen events to prevent duplicate triggers.","        var thisevent;","        while (this.listenevents.length) {","            thisevent = this.listenevents.shift();","            thisevent.detach();","        }","    }","});","M.core = M.core || {};","M.core.tooltip = M.core.tooltip = TOOLTIP;","","","}, '@VERSION@', {","    \"requires\": [","        \"base\",","        \"node\",","        \"io-base\",","        \"moodle-core-notification\",","        \"json-parse\",","        \"widget-position\",","        \"widget-position-align\",","        \"event-outside\",","        \"cache\"","    ]","});"];
_yuitest_coverage["build/moodle-core-tooltip/moodle-core-tooltip.js"].lines = {"1":0,"17":0,"18":0,"19":0,"23":0,"24":0,"27":0,"28":0,"31":0,"32":0,"35":0,"38":0,"60":0,"69":0,"78":0,"88":0,"103":0,"106":0,"108":0,"111":0,"115":0,"118":0,"119":0,"122":0,"125":0,"126":0,"140":0,"143":0,"144":0,"160":0,"175":0,"189":0,"202":0,"218":0,"231":0,"235":0,"254":0,"255":0,"257":0,"258":0,"260":0,"261":0,"263":0,"264":0,"268":0,"276":0,"277":0,"280":0,"283":0,"284":0,"291":0,"292":0,"299":0,"300":0,"303":0,"315":0,"318":0,"319":0,"322":0,"325":0,"328":0,"331":0,"338":0,"341":0,"342":0,"344":0,"345":0,"348":0,"349":0,"352":0,"354":0,"355":0,"357":0,"360":0,"366":0,"371":0,"376":0,"379":0,"380":0,"381":0,"382":0,"383":0,"386":0,"387":0,"392":0,"393":0,"394":0,"396":0,"398":0,"401":0,"405":0,"409":0,"413":0,"417":0,"422":0,"425":0,"428":0,"429":0,"435":0,"436":0,"437":0,"438":0,"442":0,"443":0};
_yuitest_coverage["build/moodle-core-tooltip/moodle-core-tooltip.js"].functions = {"TOOLTIP:17":0,"setter:105":0,"setter:142":0,"initializer:251":0,"complete:365":0,"display_panel:314":0,"_set_panel_contents:375":0,"set_header_content:404":0,"set_body_content:408":0,"modify_url:416":0,"close_panel:420":0,"cancel_events:433":0,"(anonymous 1):1":0};
_yuitest_coverage["build/moodle-core-tooltip/moodle-core-tooltip.js"].coveredLines = 104;
_yuitest_coverage["build/moodle-core-tooltip/moodle-core-tooltip.js"].coveredFunctions = 13;
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 1);
YUI.add('moodle-core-tooltip', function (Y, NAME) {

/**
 * Provides the base tooltip class.
 *
 * @module moodle-core-tooltip
 */

/**
 * A base class for a tooltip.
 *
 * @param {Object} config Object literal specifying tooltip configuration properties.
 * @class M.core.tooltip
 * @constructor
 * @extends M.core.dialogue
 */
_yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "(anonymous 1)", 1);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 17);
function TOOLTIP(config) {
    _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "TOOLTIP", 17);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 18);
if (!config) {
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 19);
config = {};
    }

    // Override the default options provided by the parent class.
    _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 23);
if (typeof config.draggable === 'undefined') {
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 24);
config.draggable = true;
    }

    _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 27);
if (typeof config.constrain === 'undefined') {
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 28);
config.constrain = true;
    }

    _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 31);
if (typeof config.lightbox === 'undefined') {
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 32);
config.lightbox = false;
    }

    _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 35);
TOOLTIP.superclass.constructor.apply(this, [config]);
}

_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 38);
var SELECTORS = {
        CLOSEBUTTON: '.closebutton'
    },

    CSS = {
        PANELTEXT: 'tooltiptext'
    },
    RESOURCES = {
        WAITICON: {
            pix: 'i/loading_small',
            component: 'moodle'
        }
    },
    ATTRS = {};

/**
 * Static property provides a string to identify the JavaScript class.
 *
 * @property NAME
 * @type String
 * @static
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 60);
TOOLTIP.NAME = 'moodle-core-tooltip';

/**
 * Static property used to define the CSS prefix applied to tooltip dialogues.
 *
 * @property CSS_PREFIX
 * @type String
 * @static
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 69);
TOOLTIP.CSS_PREFIX = 'moodle-dialogue';

/**
 * Static property used to define the default attribute configuration for the Tooltip.
 *
 * @property ATTRS
 * @type String
 * @static
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 78);
TOOLTIP.ATTRS = ATTRS;

/**
 * The initial value of the header region before the content finishes loading.
 *
 * @attribute initialheadertext
 * @type String
 * @default ''
 * @writeOnce
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 88);
ATTRS.initialheadertext = {
    value: ''
};

/**
  * The initial value of the body region before the content finishes loading.
  *
  * The supplid string will be wrapped in a div with the CSS.PANELTEXT class and a standard Moodle spinner
  * appended.
  *
  * @attribute initialbodytext
  * @type String
  * @default ''
  * @writeOnce
  */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 103);
ATTRS.initialbodytext = {
    value: '',
    setter: function(content) {
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "setter", 105);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 106);
var parentnode,
            spinner;
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 108);
parentnode = Y.Node.create('<div />')
            .addClass(CSS.PANELTEXT);

        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 111);
spinner = Y.Node.create('<img />')
            .setAttribute('src', M.util.image_url(RESOURCES.WAITICON.pix, RESOURCES.WAITICON.component))
            .addClass('spinner');

        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 115);
if (content) {
            // If we have been provided with content, add it to the parent and make
            // the spinner appear correctly inline
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 118);
parentnode.set('text', content);
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 119);
spinner.addClass('iconsmall');
        } else {
            // If there is no loading message, just make the parent node a lightbox
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 122);
parentnode.addClass('content-lightbox');
        }

        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 125);
parentnode.append(spinner);
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 126);
return parentnode;
    }
};

/**
 * The initial value of the footer region before the content finishes loading.
 *
 * If a value is supplied, it will be wrapped in a <div> first.
 *
 * @attribute initialfootertext
 * @type String
 * @default ''
 * @writeOnce
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 140);
ATTRS.initialfootertext = {
    value: null,
    setter: function(content) {
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "setter", 142);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 143);
if (content) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 144);
return Y.Node.create('<div />')
                .set('text', content);
        }
    }
};

/**
 * The function which handles setting the content of the title region.
 * The specified function will be called with a context of the tooltip instance.
 *
 * The default function will simply set the value of the title to object.heading as returned by the AJAX call.
 *
 * @attribute headerhandler
 * @type Function|String|null
 * @default set_header_content
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 160);
ATTRS.headerhandler = {
    value: 'set_header_content'
};

/**
 * The function which handles setting the content of the body region.
 * The specified function will be called with a context of the tooltip instance.
 *
 * The default function will simply set the value of the body area to a div containing object.text as returned
 * by the AJAX call.
 *
 * @attribute bodyhandler
 * @type Function|String|null
 * @default set_body_content
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 175);
ATTRS.bodyhandler = {
    value: 'set_body_content'
};

/**
 * The function which handles setting the content of the footer region.
 * The specified function will be called with a context of the tooltip instance.
 *
 * By default, the footer is not set.
 *
 * @attribute footerhandler
 * @type Function|String|null
 * @default null
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 189);
ATTRS.footerhandler = {
    value: null
};

/**
 * The function which handles modifying the URL that was clicked on.
 *
 * The default function rewrites '.php' to '_ajax.php'.
 *
 * @attribute urlmodifier
 * @type Function|String|null
 * @default null
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 202);
ATTRS.urlmodifier = {
    value: null
};

/**
 * Set the Y.Cache object to use.
 *
 * By default a new Y.Cache object will be created for each instance of the tooltip.
 *
 * In certain situations, where multiple tooltips may share the same cache, it may be preferable to
 * seed this cache from the calling method.
 *
 * @attribute textcache
 * @type Y.Cache|null
 * @default null
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 218);
ATTRS.textcache = {
    value: null
};

/**
 * Set the default size of the Y.Cache object.
 *
 * This is only used if no textcache is specified.
 *
 * @attribute textcachesize
 * @type Number
 * @default 10
 */
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 231);
ATTRS.textcachesize = {
    value: 10
};

_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 235);
Y.extend(TOOLTIP, M.core.dialogue, {
    // The bounding box.
    bb: null,

    // Any event listeners we may need to cancel later.
    listenevents: [],

    // Cache of objects we've already retrieved.
    textcache: null,

    // The align position. This differs for RTL languages so we calculate once and store.
    alignpoints: [
        Y.WidgetPositionAlign.TL,
        Y.WidgetPositionAlign.RC
    ],

    initializer: function() {
        // Set the initial values for the handlers.
        // These cannot be set in the attributes section as context isn't present at that time.
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "initializer", 251);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 254);
if (!this.get('headerhandler')) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 255);
this.set('headerhandler', this.set_header_content);
        }
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 257);
if (!this.get('bodyhandler')) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 258);
this.set('bodyhandler', this.set_body_content);
        }
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 260);
if (!this.get('footerhandler')) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 261);
this.set('footerhandler', function() {});
        }
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 263);
if (!this.get('urlmodifier')) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 264);
this.set('urlmodifier', this.modify_url);
        }

        // Set up the dialogue with initial content.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 268);
this.setAttrs({
            headerContent: this.get('initialheadertext'),
            bodyContent: this.get('initialbodytext'),
            footerContent: this.get('initialfootertext'),
            zIndex: 150
        });

        // Hide and then render the dialogue.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 276);
this.hide();
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 277);
this.render();

        // Hook into a few useful areas.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 280);
this.bb = this.get('boundingBox');

        // Change the alignment if this is an RTL language.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 283);
if (right_to_left()) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 284);
this.alignpoints = [
                Y.WidgetPositionAlign.TR,
                Y.WidgetPositionAlign.LC
            ];
        }

        // Set up the text cache if it's not set up already.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 291);
if (!this.get('textcache')) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 292);
this.set('textcache', new Y.Cache({
                // Set a reasonable maximum cache size to prevent memory growth.
                max: this.get('textcachesize')
            }));
        }

        // Disable the textcache when in developerdebug.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 299);
if (M.cfg.developerdebug) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 300);
this.get('textcache').set('max', 0);
        }

        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 303);
return this;
    },

    /**
     * Display the tooltip for the clicked link.
     *
     * The anchor for the clicked link is used.
     *
     * @method display_panel
     * @param {EventFacade} e The event from the clicked link. This is used to determine the clicked URL.
     */
    display_panel: function(e) {
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "display_panel", 314);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 315);
var clickedlink, thisevent, ajaxurl, config, cacheentry;

        // Prevent the default click action and prevent the event triggering anything else.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 318);
e.preventDefault();
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 319);
e.stopPropagation();

        // Cancel any existing listeners and close the panel if it's already open.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 322);
this.cancel_events();

        // Grab the clickedlink - this contains the URL we fetch and we align the panel to it.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 325);
clickedlink = e.target.ancestor('a', true);

        // Align with the link that was clicked.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 328);
this.align(clickedlink, this.alignpoints);

        // Reset the initial text to a spinner while we retrieve the text.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 331);
this.setAttrs({
            headerContent: this.get('initialheadertext'),
            bodyContent: this.get('initialbodytext'),
            footerContent: this.get('initialfootertext')
        });

        // Now that initial setup has begun, show the panel.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 338);
this.show();

        // Add some listen events to close on.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 341);
thisevent = this.bb.delegate('click', this.close_panel, SELECTORS.CLOSEBUTTON, this);
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 342);
this.listenevents.push(thisevent);

        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 344);
thisevent = Y.one('body').on('key', this.close_panel, 'esc', this);
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 345);
this.listenevents.push(thisevent);

        // Listen for mousedownoutside events - clickoutside is broken on IE.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 348);
thisevent = this.bb.on('mousedownoutside', this.close_panel, this);
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 349);
this.listenevents.push(thisevent);

        // Modify the URL as required.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 352);
ajaxurl = Y.bind(this.get('urlmodifier'), this, clickedlink.get('href'))();

        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 354);
cacheentry = this.get('textcache').retrieve(ajaxurl);
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 355);
if (cacheentry) {
            // The data from this help call was already cached so use that and avoid an AJAX call.
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 357);
this._set_panel_contents(cacheentry.response);
        } else {
            // Retrieve the actual help text we should use.
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 360);
config = {
                method: 'get',
                context: this,
                sync: false,
                on: {
                    complete: function(tid, response) {
                        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "complete", 365);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 366);
this._set_panel_contents(response.responseText, ajaxurl);
                    }
                }
            };

            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 371);
Y.io(ajaxurl, config);
        }
    },

    _set_panel_contents: function(response, ajaxurl) {
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "_set_panel_contents", 375);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 376);
var responseobject;

        // Attempt to parse the response into an object.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 379);
try {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 380);
responseobject = Y.JSON.parse(response);
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 381);
if (responseobject.error) {
                _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 382);
this.close_panel();
                _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 383);
return new M.core.ajaxException(responseobject);
            }
        } catch (error) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 386);
this.close_panel();
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 387);
return new M.core.exception(error);
        }

        // Set the contents using various handlers.
        // We must use Y.bind to ensure that the correct context is used when the default handlers are overridden.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 392);
Y.bind(this.get('headerhandler'), this, responseobject)();
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 393);
Y.bind(this.get('bodyhandler'), this, responseobject)();
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 394);
Y.bind(this.get('footerhandler'), this, responseobject)();

        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 396);
if (ajaxurl) {
            // Ensure that this data is added to the cache.
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 398);
this.get('textcache').add(ajaxurl, response);
        }

        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 401);
this.get('buttons').header[0].focus();
    },

    set_header_content: function(responseobject) {
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "set_header_content", 404);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 405);
this.set('headerContent', responseobject.heading);
    },

    set_body_content: function(responseobject) {
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "set_body_content", 408);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 409);
var bodycontent = Y.Node.create('<div />')
            .set('innerHTML', responseobject.text)
            .setAttribute('role', 'alert')
            .addClass(CSS.PANELTEXT);
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 413);
this.set('bodyContent', bodycontent);
    },

    modify_url: function(url) {
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "modify_url", 416);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 417);
return url.replace(/\.php\?/, '_ajax.php?');
    },

    close_panel: function(e) {
        // Hide the panel first.
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "close_panel", 420);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 422);
this.hide();

        // Cancel the listeners that we added in display_panel.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 425);
this.cancel_events();

        // Prevent any default click that the close button may have.
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 428);
if (e) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 429);
e.preventDefault();
        }
    },

    cancel_events: function() {
        // Detach all listen events to prevent duplicate triggers.
        _yuitest_coverfunc("build/moodle-core-tooltip/moodle-core-tooltip.js", "cancel_events", 433);
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 435);
var thisevent;
        _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 436);
while (this.listenevents.length) {
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 437);
thisevent = this.listenevents.shift();
            _yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 438);
thisevent.detach();
        }
    }
});
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 442);
M.core = M.core || {};
_yuitest_coverline("build/moodle-core-tooltip/moodle-core-tooltip.js", 443);
M.core.tooltip = M.core.tooltip = TOOLTIP;


}, '@VERSION@', {
    "requires": [
        "base",
        "node",
        "io-base",
        "moodle-core-notification",
        "json-parse",
        "widget-position",
        "widget-position-align",
        "event-outside",
        "cache"
    ]
});
