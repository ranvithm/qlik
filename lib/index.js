(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('node:events')) :
    typeof define === 'function' && define.amd ? define(['node:events'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory(global.node_events));
})(this, (function (node_events) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var Qlik = /** @class */ (function () {
        function Qlik(config) {
            var _this = this;
            this.currApps = [];
            this.emitter = new node_events.EventEmitter();
            this.getMeasure = function (app) {
                return new Promise(function (resolve) {
                    _this.getList(app, "MeasureList").then(function (props) {
                        resolve(props.qMeasureList.qItems);
                    });
                });
            };
            this.getVariable = function (app) {
                return new Promise(function (resolve) {
                    _this.getList(app, "VariableList").then(function (props) {
                        resolve(props.qVariableList.qItems);
                    });
                });
            };
            this.getFields = function (app) {
                return new Promise(function (resolve) {
                    _this.getList(app, "FieldList").then(function (props) {
                        resolve(props.qFieldList.qItems);
                    });
                });
            };
            this.getBookmark = function (app) {
                return new Promise(function (resolve) {
                    _this.getList(app, "BookmarkList").then(function (props) {
                        resolve(props.qBookmarkList.qItems);
                    });
                });
            };
            this.evaluateExpression = function (app, title) {
                return new Promise(function (resolve) {
                    var _a;
                    if (title && title !== " " && typeof title === "object") {
                        app &&
                            app.createGenericObject({ value: { qStringExpression: (_a = title === null || title === void 0 ? void 0 : title.qStringExpression) === null || _a === void 0 ? void 0 : _a.qExpr } }, function (reply) {
                                resolve(reply.value);
                                app.destroySessionObject(reply.qInfo.qId);
                            });
                    }
                    else
                        resolve(title);
                });
            };
            this.objectProper = function (app, model) {
                return new Promise(function (resolve) {
                    var proper = model.properties, title = proper.title, subtitle = proper.subtitle, footnote = proper.footnote, options = { title: null, subtitle: null, footnote: null };
                    _this.evaluateExpression(app, title)
                        .then(function (val) {
                        options["title"] = val;
                        return _this.evaluateExpression(app, subtitle);
                    })
                        .then(function (val) {
                        options["subtitle"] = val;
                        return _this.evaluateExpression(app, footnote);
                    })
                        .then(function (val) {
                        options["footnote"] = val;
                        resolve(options);
                    });
                });
            };
            this.getQlikObjectTitles = function (app, id) {
                return new Promise(function (resolve) {
                    app.getObjectProperties(id).then(function (model) {
                        var proper = model.properties;
                        if (proper.qExtendsId) {
                            app.getObjectProperties(proper.qExtendsId).then(function (model) {
                                _this.objectProper(app, model).then(function (val) {
                                    resolve(val);
                                });
                            });
                        }
                        else {
                            _this.objectProper(app, model).then(function (val) {
                                resolve(val);
                            });
                        }
                    });
                });
            };
            this.getSheet = function (app) {
                return new Promise(function (resolve) {
                    _this.getList(app, "sheet").then(function (props) {
                        var sheets = [];
                        var _loop_1 = function (sheet) {
                            var cells = [];
                            var _loop_2 = function (cell) {
                                _this.getQlikObjectTitles(app, cell.name).then(function (_titles) {
                                    var title = _titles["title"] ||
                                        _titles["subtitle"] ||
                                        _titles["footnote"] ||
                                        cell["name"];
                                    cells.push(__assign(__assign({}, cell), { options: _titles, obj_id: cell.name, id: cell.name, title: title }));
                                });
                                sheet["obj"] = cells;
                            };
                            for (var _b = 0, _c = sheet.qData.cells; _b < _c.length; _b++) {
                                var cell = _c[_b];
                                _loop_2(cell);
                            }
                        };
                        for (var _i = 0, _a = props.qAppObjectList.qItems; _i < _a.length; _i++) {
                            var sheet = _a[_i];
                            _loop_1(sheet);
                        }
                        resolve(sheets);
                    });
                });
            };
            this.callObject = function (app, id) {
                return new Promise(function (resolve) {
                    var _a;
                    if ((_a = app.visualization) === null || _a === void 0 ? void 0 : _a.get) {
                        app.visualization
                            .get(id)
                            .then(function (vis) {
                            resolve(vis);
                        })
                            .catch(function (err) {
                            console.log(err);
                        });
                    }
                });
            };
            this.checkAppOpen = function (app) {
                return new Promise(function (resolve, reject) {
                    app.model.waitForOpen.promise
                        .then(function () {
                        resolve(app);
                    })
                        .catch(function (err) {
                        reject(err);
                    });
                });
            };
            this.isAppOpen = function (id) { return __awaiter(_this, void 0, void 0, function () {
                var app;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            app = this.qlik.openApp(id, this.config);
                            return [4 /*yield*/, this.checkAppOpen(app)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, app];
                    }
                });
            }); };
            var host = config.host, port = config.port, prefix = config.prefix, isSecure = config.isSecure; config.ticket;
            var _prefix = prefix !== "/" ? prefix : "/";
            var _secure = isSecure ? "https://" : "http://";
            var _port = port ? ":".concat(port) : "";
            this.config = config;
            this.baseUrl = "".concat(_secure).concat(host).concat(_port).concat(_prefix, "resources");
        }
        Qlik.prototype.on = function (eventName, fn) {
            this.emitter.on(eventName, fn);
        };
        Qlik.prototype.emit = function (eventName, params) {
            console.log(eventName, params);
            this.emitter.emit(eventName, params);
        };
        Qlik.prototype.callRequire = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    if (!document.getElementById("qlik-require-file")) {
                        var jsFileLoad_1 = document.createElement("script");
                        jsFileLoad_1.src = "".concat(_this.baseUrl, "/assets/external/requirejs/require.js");
                        jsFileLoad_1.id = "qlik-require-file";
                        document.head.appendChild(jsFileLoad_1);
                        var loadedJS = new Promise(function (resolve, reject) {
                            jsFileLoad_1.onload = function () { return resolve("loaded"); };
                            jsFileLoad_1.onerror = function (error) { return reject(error); };
                        });
                        var cssFileLoad_1 = document.createElement("link");
                        cssFileLoad_1.href = "".concat(_this.baseUrl, "/autogenerated/qlik-styles.css");
                        cssFileLoad_1.type = "text/css";
                        cssFileLoad_1.rel = "stylesheet";
                        document.head.insertBefore(cssFileLoad_1, document.head.firstChild);
                        var loadedCSS = new Promise(function (resolve, reject) {
                            cssFileLoad_1.onload = function () { return resolve("loaded"); };
                            cssFileLoad_1.onerror = function (error) { return reject(error); };
                        });
                        Promise.all([loadedJS, loadedCSS])
                            .then(function (result) {
                            resolve(result);
                        })
                            .catch(function (err) {
                            reject(err);
                        });
                    }
                }
                catch (err) {
                    console.log(err);
                    reject(err);
                }
            });
        };
        Qlik.prototype.setQlik = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // @ts-ignore-next-line
                window.require.config({
                    baseUrl: _this.baseUrl,
                    paths: { qlik: "".concat(_this.baseUrl, "/js/qlik") },
                    config: {
                        text: {
                            useXhr: function () {
                                return true;
                            },
                        },
                    },
                });
                // @ts-ignore
                window.require(["js/qlik"], function (qlik) {
                    if (qlik) {
                        qlik.setOnError(function (err) {
                            _this.emit("qlik", "qlik error");
                            reject(err);
                        });
                        // @ts-ignore
                        _this.qlik = qlik;
                        resolve(qlik);
                    }
                });
            });
        };
        Qlik.prototype.setAuthUser = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.qlik
                    .callRepository("/api/hub/v1/user/info")
                    .then(function (reply) {
                    var res = reply.data.data[0];
                    var _a = res.attributes, userDirectory = _a.userDirectory, userId = _a.userId;
                    _this.user = {
                        directory: userDirectory,
                        userId: userId,
                        authUser: res,
                    };
                    resolve(true);
                })
                    .catch(function (err) {
                    console.log(err);
                });
            });
        };
        Qlik.prototype.getDocs = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.qlik.getAppList(function (list) {
                    _this.docList = list;
                    resolve(list);
                }, _this.config);
            });
        };
        Qlik.prototype.getList = function (app, type) {
            return new Promise(function (resolve) {
                app.getList(type, function (reply) {
                    resolve(reply);
                    app.destroySessionObject(reply.qInfo.qId);
                });
            });
        };
        Qlik.prototype.getApp = function (id) {
            var _this = this;
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var checkApp, app, sheet, measure, fields, variable, bookmark;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            checkApp = this.currApps.find(function (ap) { return ap.app.id === id; });
                            if (!!checkApp) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.isAppOpen(id)];
                        case 1:
                            app = _a.sent();
                            return [4 /*yield*/, this.getSheet(app)];
                        case 2:
                            sheet = _a.sent();
                            return [4 /*yield*/, this.getMeasure(app)];
                        case 3:
                            measure = _a.sent();
                            return [4 /*yield*/, this.getFields(app)];
                        case 4:
                            fields = _a.sent();
                            return [4 /*yield*/, this.getVariable(app)];
                        case 5:
                            variable = _a.sent();
                            return [4 /*yield*/, this.getBookmark(app)];
                        case 6:
                            bookmark = _a.sent();
                            this.currApps = __spreadArray([
                                { id: id, app: app, sheet: sheet, measure: measure, fields: fields, variable: variable, bookmark: bookmark }
                            ], this.currApps, true);
                            return [2 /*return*/, this.currApps];
                        case 7: return [2 /*return*/];
                    }
                });
            }); })();
        };
        return Qlik;
    }());

    return Qlik;

}));
