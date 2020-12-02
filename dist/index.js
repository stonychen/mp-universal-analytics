"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO remove request
// import request = require("request")
var uuid_1 = __importDefault(require("uuid"));
var querystring_1 = __importDefault(require("querystring"));
var utils_1 = require("./utils");
var config_1 = __importDefault(require("./config"));
var url = require("url");
var debug = require("debug")("mp-universal-analytics");
module.exports = init;
function init(tid, cid, options) {
    return new Visitor(tid, cid, options);
}
module.exports.middleware = function (tid, options) {
    this.tid = tid;
    this.options = options;
    var cookieName = (this.options || {}).cookieName || "_ga";
    return function (req, res, next) {
        req.visitor = module.exports.createFromSession(req.session);
        if (req.visitor)
            return next();
        var cid = "";
        if (req.cookies && req.cookies[cookieName]) {
            var gaSplit = req.cookies[cookieName].split('.');
            cid = gaSplit[2] + "." + gaSplit[3];
        }
        req.visitor = init(tid, cid, options);
        if (req.session) {
            req.session.cid = req.visitor.cid;
        }
        next();
    };
};
module.exports.createFromSession = function (session) {
    if (session && session.cid) {
        return init(this.tid, session.cid, this.options);
    }
};
var Visitor = /** @class */ (function () {
    function Visitor(tid, cid, options, context, persistentParams) {
        this._queue = [];
        this.options = {};
        this._context = {};
        this._persistentParams = {};
        this.cid = {};
        this.tid = {};
        this.uid = {};
        this.pv = this.pageview;
        this.e = this.event;
        this.t = this.transaction;
        this.i = this.item;
        if (typeof tid === 'object') {
            options = tid;
            tid = cid = null;
        }
        else if (typeof cid === 'object') {
            options = cid;
            cid = null;
        }
        this._queue = [];
        this.options = options || {};
        if (this.options.hostname) {
            config_1.default.hostname = this.options.hostname;
        }
        if (this.options.path) {
            config_1.default.path = this.options.path;
        }
        if (this.options.http) {
            var parsedHostname = url.parse(config_1.default.hostname);
            config_1.default.hostname = 'http://' + parsedHostname.host;
        }
        if (this.options.enableBatching !== undefined) {
            config_1.default.batching = options.enableBatching;
        }
        if (this.options.batchSize) {
            config_1.default.batchSize = this.options.batchSize;
        }
        this._context = context || {};
        this._persistentParams = persistentParams || {};
        this.tid = tid || this.options.tid;
        this.cid = this._determineCid(cid, this.options.cid, (this.options.strictCidFormat !== false));
        if (this.options.uid) {
            this.uid = this.options.uid;
        }
    }
    Visitor.prototype.debug = function (d) {
        debug.enabled = arguments.length === 0 ? true : d;
        debug("visitor.debug() is deprecated: set DEBUG=mp-universal-analytics to enable logging");
        return this;
    };
    Visitor.prototype.reset = function () {
        this._context = null;
        return this;
    };
    Visitor.prototype.set = function (key, value) {
        this._persistentParams = this._persistentParams || {};
        this._persistentParams[key] = value;
    };
    Visitor.prototype.pageview = function (path, hostname, title, params, fn) {
        if (typeof path === 'object' && path != null) {
            params = path;
            if (typeof hostname === 'function') {
                fn = hostname;
            }
            path = hostname = title = null;
        }
        else if (typeof hostname === 'function') {
            fn = hostname;
            hostname = title = null;
        }
        else if (typeof title === 'function') {
            fn = title;
            title = null;
        }
        else if (typeof params === 'function') {
            fn = params;
            params = null;
        }
        params = this._translateParams(params);
        params = Object.assign({}, this._persistentParams || {}, params);
        params.dp = path || params.dp || this._context.dp;
        params.dh = hostname || params.dh || this._context.dh;
        params.dt = title || params.dt || this._context.dt;
        this._tidyParameters(params);
        if (!params.dp && !params.dl) {
            return this._handleError("Please provide either a page path (dp) or a document location (dl)", fn);
        }
        return this._withContext(params)._enqueue("pageview", params, fn);
    };
    Visitor.prototype.screenview = function (screenName, appName, appVersion, appId, appInstallerId, params, fn) {
        if (typeof screenName === 'object' && screenName != null) {
            params = screenName;
            if (typeof appName === 'function') {
                fn = appName;
            }
            screenName = appName = appVersion = appId = appInstallerId = null;
        }
        else if (typeof appName === 'function') {
            fn = appName;
            appName = appVersion = appId = appInstallerId = null;
        }
        else if (typeof appVersion === 'function') {
            fn = appVersion;
            appVersion = appId = appInstallerId = null;
        }
        else if (typeof appId === 'function') {
            fn = appId;
            appId = appInstallerId = null;
        }
        else if (typeof appInstallerId === 'function') {
            fn = appInstallerId;
            appInstallerId = null;
        }
        else if (typeof params === 'function') {
            fn = params;
            params = null;
        }
        params = this._translateParams(params);
        params = Object.assign({}, this._persistentParams || {}, params);
        params.cd = screenName || params.cd || this._context.cd;
        params.an = appName || params.an || this._context.an;
        params.av = appVersion || params.av || this._context.av;
        params.aid = appId || params.aid || this._context.aid;
        params.aiid = appInstallerId || params.aiid || this._context.aiid;
        this._tidyParameters(params);
        if (!params.cd || !params.an) {
            return this._handleError("Please provide at least a screen name (cd) and an app name (an)", fn);
        }
        return this._withContext(params)._enqueue("screenview", params, fn);
    };
    Visitor.prototype.event = function (category, action, label, value, params, fn) {
        if (typeof category === 'object' && category != null) {
            params = category;
            if (typeof action === 'function') {
                fn = action;
            }
            category = action = label = value = null;
        }
        else if (typeof label === 'function') {
            fn = label;
            label = value = null;
        }
        else if (typeof value === 'function') {
            fn = value;
            value = null;
        }
        else if (typeof params === 'function') {
            fn = params;
            params = null;
        }
        params = this._translateParams(params);
        params = Object.assign({}, this._persistentParams || {}, params);
        params.ec = category || params.ec || this._context.ec;
        params.ea = action || params.ea || this._context.ea;
        params.el = label || params.el || this._context.el;
        params.ev = value || params.ev || this._context.ev;
        params.p = params.p || params.dp || this._context.p || this._context.dp;
        delete params.dp;
        this._tidyParameters(params);
        if (!params.ec || !params.ea) {
            return this._handleError("Please provide at least an event category (ec) and an event action (ea)", fn);
        }
        return this._withContext(params)._enqueue("event", params, fn);
    };
    Visitor.prototype.transaction = function (transaction, revenue, shipping, tax, affiliation, params, fn) {
        if (typeof transaction === 'object') {
            params = transaction;
            if (typeof revenue === 'function') {
                fn = revenue;
            }
            transaction = revenue = shipping = tax = affiliation = null;
        }
        else if (typeof revenue === 'function') {
            fn = revenue;
            revenue = shipping = tax = affiliation = null;
        }
        else if (typeof shipping === 'function') {
            fn = shipping;
            shipping = tax = affiliation = null;
        }
        else if (typeof tax === 'function') {
            fn = tax;
            tax = affiliation = null;
        }
        else if (typeof affiliation === 'function') {
            fn = affiliation;
            affiliation = null;
        }
        else if (typeof params === 'function') {
            fn = params;
            params = null;
        }
        params = this._translateParams(params);
        params = Object.assign({}, this._persistentParams || {}, params);
        params.ti = transaction || params.ti || this._context.ti;
        params.tr = revenue || params.tr || this._context.tr;
        params.ts = shipping || params.ts || this._context.ts;
        params.tt = tax || params.tt || this._context.tt;
        params.ta = affiliation || params.ta || this._context.ta;
        params.p = params.p || this._context.p || this._context.dp;
        this._tidyParameters(params);
        if (!params.ti) {
            return this._handleError("Please provide at least a transaction ID (ti)", fn);
        }
        return this._withContext(params)._enqueue("transaction", params, fn);
    };
    Visitor.prototype.item = function (price, quantity, sku, name, variation, params, fn) {
        if (typeof price === 'object') {
            params = price;
            if (typeof quantity === 'function') {
                fn = quantity;
            }
            price = quantity = sku = name = variation = null;
        }
        else if (typeof quantity === 'function') {
            fn = quantity;
            quantity = sku = name = variation = null;
        }
        else if (typeof sku === 'function') {
            fn = sku;
            sku = name = variation = null;
        }
        else if (typeof name === 'function') {
            fn = name;
            name = variation = null;
        }
        else if (typeof variation === 'function') {
            fn = variation;
            variation = null;
        }
        else if (typeof params === 'function') {
            fn = params;
            params = null;
        }
        params = this._translateParams(params);
        params = Object.assign({}, this._persistentParams || {}, params);
        params.ip = price || params.ip || this._context.ip;
        params.iq = quantity || params.iq || this._context.iq;
        params.ic = sku || params.ic || this._context.ic;
        params.in = name || params.in || this._context.in;
        params.iv = variation || params.iv || this._context.iv;
        params.p = params.p || this._context.p || this._context.dp;
        params.ti = params.ti || this._context.ti;
        this._tidyParameters(params);
        if (!params.ti) {
            return this._handleError("Please provide at least an item transaction ID (ti)", fn);
        }
        return this._withContext(params)._enqueue("item", params, fn);
    };
    Visitor.prototype.exception = function (description, fatal, params, fn) {
        if (typeof description === 'object') {
            params = description;
            if (typeof fatal === 'function') {
                fn = fatal;
            }
            description = fatal = null;
        }
        else if (typeof fatal === 'function') {
            fn = fatal;
            fatal = 0;
        }
        else if (typeof params === 'function') {
            fn = params;
            params = null;
        }
        params = this._translateParams(params);
        params = Object.assign({}, this._persistentParams || {}, params);
        params.exd = description || params.exd || this._context.exd;
        params.exf = +!!(fatal || params.exf || this._context.exf);
        if (params.exf === 0) {
            delete params.exf;
        }
        this._tidyParameters(params);
        return this._withContext(params)._enqueue("exception", params, fn);
    };
    Visitor.prototype.timing = function (category, variable, time, label, params, fn) {
        if (typeof category === 'object') {
            params = category;
            if (typeof variable === 'function') {
                fn = variable;
            }
            category = variable = time = label = null;
        }
        else if (typeof variable === 'function') {
            fn = variable;
            variable = time = label = null;
        }
        else if (typeof time === 'function') {
            fn = time;
            time = label = null;
        }
        else if (typeof label === 'function') {
            fn = label;
            label = null;
        }
        else if (typeof params === 'function') {
            fn = params;
            params = null;
        }
        params = this._translateParams(params);
        params = Object.assign({}, this._persistentParams || {}, params);
        params.utc = category || params.utc || this._context.utc;
        params.utv = variable || params.utv || this._context.utv;
        params.utt = time || params.utt || this._context.utt;
        params.utl = label || params.utl || this._context.utl;
        this._tidyParameters(params);
        return this._withContext(params)._enqueue("timing", params, fn);
    };
    Visitor.prototype.send = function (fn) {
        var self = this;
        var count = 1;
        fn = fn || function () { };
        debug("Sending %d tracking call(s)", self._queue.length);
        var getBody = function (params) {
            return params.map(function (x) { return querystring_1.default.stringify(x); }).join("\n");
        };
        var onFinish = function (err) {
            debug("Finished sending tracking calls");
            fn.call(self, err || null, count - 1);
        };
        var iterator = function () {
            if (!self._queue.length) {
                return onFinish(null);
            }
            var params = [];
            if (config_1.default.batching) {
                params = self._queue.splice(0, Math.min(self._queue.length, config_1.default.batchSize));
            }
            else {
                params.push(self._queue.shift());
            }
            var useBatchPath = params.length > 1;
            var path = config_1.default.hostname + (useBatchPath ? config_1.default.batchPath : config_1.default.path);
            debug("%d: %o", count++, params);
            var options = Object.assign({}, self.options.requestOptions, {
                body: getBody(params),
                headers: self.options.headers || {}
            });
            // TODO
            // request.post(path, options, nextIteration)
        };
        function nextIteration(err) {
            if (err)
                return onFinish(err);
            iterator();
        }
        iterator();
    };
    Visitor.prototype._enqueue = function (type, params, fn) {
        if (typeof params === 'function') {
            fn = params;
            params = {};
        }
        params = this._translateParams(params) || {};
        Object.assign(params, {
            v: config_1.default.protocolVersion,
            tid: this.tid,
            cid: this.cid,
            t: type
        });
        if (this.uid) {
            params.uid = this.uid;
        }
        this._queue.push(params);
        if (debug.enabled) {
            this._checkParameters(params);
        }
        debug("Enqueued %s (%o)", type, params);
        if (fn) {
            this.send(fn);
        }
        return this;
    };
    Visitor.prototype._handleError = function (message, fn) {
        debug("Error: %s", message);
        fn && fn.call(this, new Error(message));
        return this;
    };
    Visitor.prototype._determineCid = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id;
        var lastItem = args.length - 1;
        var strict = args[lastItem];
        if (strict) {
            for (var i = 0; i < lastItem; i++) {
                id = utils_1.ensureValidCid(args[i]);
                if (id !== false)
                    return id;
                if (id != null)
                    debug("Warning! Invalid UUID format '%s'", args[i]);
            }
        }
        else {
            for (var i = 0; i < lastItem; i++) {
                if (args[i])
                    return args[i];
            }
        }
        return uuid_1.default.v4();
    };
    Visitor.prototype._checkParameters = function (params) {
        var _loop_1 = function (param) {
            if (config_1.default.acceptedParameters.indexOf(param) !== -1 || config_1.default.acceptedParametersRegex.filter(function (r) {
                return r.test(param);
            }).length) {
                return "continue";
            }
            debug("Warning! Unsupported tracking parameter %s (%s)", param, params[param]);
        };
        for (var param in params) {
            _loop_1(param);
        }
    };
    Visitor.prototype._translateParams = function (params) {
        var translated = {};
        for (var key in params) {
            if (config_1.default.parametersMap.hasOwnProperty(key)) {
                translated[config_1.default.parametersMap[key]] = params[key];
            }
            else {
                translated[key] = params[key];
            }
        }
        return translated;
    };
    Visitor.prototype._tidyParameters = function (params) {
        for (var param in params) {
            if (params[param] === null || params[param] === undefined) {
                delete params[param];
            }
        }
        return params;
    };
    Visitor.prototype._withContext = function (context) {
        var visitor = new Visitor(this.tid, this.cid, this.options, context, this._persistentParams);
        visitor._queue = this._queue;
        return visitor;
    };
    return Visitor;
}());
exports.default = Visitor;
