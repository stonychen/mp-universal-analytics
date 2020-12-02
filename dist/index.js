"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseXml = exports.XmlNode = void 0;
var XmlNode = /** @class */ (function () {
    function XmlNode() {
        this.tag = "";
        this.name = "";
        this.namespace = "";
        this.attrs = {};
        this.selfCloseNode = false;
        this.text = "";
        this.path = "";
        this.children = [];
    }
    return XmlNode;
}());
exports.XmlNode = XmlNode;
var ElementNode = /** @class */ (function () {
    function ElementNode() {
        this.tag = "";
        this.namespace = "";
        this.name = "";
        this.attrs = {};
        this.selfCloseNode = false;
        this.startNode = true;
        this.text = "";
    }
    return ElementNode;
}());
function getFirstMatch(str, reg) {
    var matches = str.match(reg);
    return matches && matches.length > 0 ? matches[0] : "";
}
function parseXml(xml, options) {
    if (options === void 0) { options = {}; }
    return parseToXmlNode(parseToElements(xml, options));
}
exports.parseXml = parseXml;
function parseToXmlNode(allNodes) {
    var stack = [];
    var root = undefined;
    while (allNodes.length > 0) {
        var curr = allNodes.shift();
        var last = stack.length > 0 ? stack[stack.length - 1] : undefined;
        var xmlNode = new XmlNode();
        if (curr.selfCloseNode) {
            xmlNode.name = curr.name;
            xmlNode.attrs = curr.attrs;
            xmlNode.namespace = curr.namespace;
            xmlNode.tag = curr.tag;
            xmlNode.selfCloseNode = curr.selfCloseNode;
            xmlNode.text = curr.text;
            if (last) {
                last.children.push(xmlNode);
            }
            stack.push(xmlNode);
            xmlNode.path = stack.map(function (m) { return m.name; }).join(".");
            root = stack.pop();
        }
        else if (curr.startNode) {
            xmlNode.name = curr.name;
            xmlNode.attrs = curr.attrs;
            xmlNode.namespace = curr.namespace;
            xmlNode.tag = curr.tag;
            if (last) {
                last.children.push(xmlNode);
            }
            stack.push(xmlNode);
            xmlNode.path = stack.map(function (m) { return m.name; }).join(".");
        }
        else {
            if (last) {
                last.text = curr.text;
            }
            root = stack.pop();
        }
    }
    return root;
}
function escape(val, esc) {
    if (esc === void 0) { esc = false; }
    if (esc)
        return val.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, '\'');
    else
        return val;
}
function parseToElements(xml, options) {
    xml = xml.replace(/<\?[\S\s]+\?\>/ig, '');
    var matches = xml.match(/(<)[^<\>]+(>)/ig) || [];
    var lastNode = undefined;
    var allNodes = [];
    var _loop_1 = function () {
        var currEle = matches.shift();
        var currNode = new ElementNode();
        currNode.tag = getFirstMatch(currEle, /(<|<\/)[^<\>\s]+(\s|>|\/\>)/)
            .replace(/<\/|\/\>|\>|<|\s/ig, "");
        currNode.selfCloseNode = /\/\>/.test(currEle);
        currNode.startNode = !/<\//.test(currEle);
        if (currNode.tag.indexOf(":") > -1) {
            currNode.name = currNode.tag.split(":")[1];
            currNode.namespace = currNode.tag.split(":")[0];
        }
        else {
            currNode.name = currNode.tag;
        }
        if (!currNode.startNode && lastNode && lastNode.tag === currNode.tag) {
            // parse text
            var content = getFirstMatch(xml, /[^<\>]+(<\/[^<\>]+\>)/);
            currNode.text = escape(content.replace(/(<)[^<\>]+(>)/, "").trim(), options.escape);
            xml = xml.replace(content, '');
        }
        else {
            xml = xml.replace(currEle, "");
        }
        // parse attrs  
        if (currNode.startNode) {
            var attMatches = currEle.replace(/""/g, "&quo;")
                .match(/\s[\S^=]+="[^"]+"/g);
            attMatches === null || attMatches === void 0 ? void 0 : attMatches.map(function (m) {
                var arr = m.split("=");
                var attr = arr[0].trim();
                arr.shift();
                var val = arr.join("=")
                    .replace(/"/g, "").replace(/&quo;/g, "\"");
                currNode.attrs[attr] = val;
            });
        }
        lastNode = currNode;
        allNodes.push(currNode);
    };
    while (matches.length > 0) {
        _loop_1();
    }
    return allNodes;
}
