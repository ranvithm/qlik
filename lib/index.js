"use strict";
// interface define
Object.defineProperty(exports, "__esModule", { value: true });
class Qlik {
    constructor(config) {
        this.currApps = [];
        this.emitter = {};
        this.getMeasure = (app) => {
            return new Promise((resolve) => {
                this.getList(app, 'MeasureList').then((props) => {
                    resolve(props.qMeasureList.qItems);
                });
            });
        };
        this.getVariable = (app) => {
            return new Promise((resolve) => {
                this.getList(app, 'VariableList').then((props) => {
                    resolve(props.qVariableList.qItems);
                });
            });
        };
        this.getFields = (app) => {
            return new Promise((resolve) => {
                this.getList(app, 'FieldList').then((props) => {
                    resolve(props.qFieldList.qItems);
                });
            });
        };
        this.getBookmark = (app) => {
            return new Promise((resolve) => {
                this.getList(app, 'BookmarkList').then((props) => {
                    resolve(props.qBookmarkList.qItems);
                });
            });
        };
        this.evaluateExpression = (app, title) => {
            return new Promise((resolve) => {
                if (title && title !== ' ' && typeof title === 'object') {
                    app &&
                        app.createGenericObject({ value: { qStringExpression: title?.qStringExpression?.qExpr } }, function (reply) {
                            resolve(reply.value);
                            app.destroySessionObject(reply.qInfo.qId);
                        });
                }
                else
                    resolve(title);
            });
        };
        this.objectProper = (app, model) => {
            return new Promise((resolve) => {
                const proper = model.properties, title = proper.title, subtitle = proper.subtitle, footnote = proper.footnote, options = { title: null, subtitle: null, footnote: null };
                this.evaluateExpression(app, title)
                    .then((val) => {
                    options['title'] = val;
                    return this.evaluateExpression(app, subtitle);
                })
                    .then((val) => {
                    options['subtitle'] = val;
                    return this.evaluateExpression(app, footnote);
                })
                    .then((val) => {
                    options['footnote'] = val;
                    resolve(options);
                });
            });
        };
        this.getQlikObjectTitles = (app, id) => {
            return new Promise((resolve) => {
                app.getObjectProperties(id).then((model) => {
                    const proper = model.properties;
                    if (proper.qExtendsId) {
                        app.getObjectProperties(proper.qExtendsId).then((model) => {
                            this.objectProper(app, model).then((val) => {
                                resolve(val);
                            });
                        });
                    }
                    else {
                        this.objectProper(app, model).then((val) => {
                            resolve(val);
                        });
                    }
                });
            });
        };
        this.getlist = (app, type) => {
            return new Promise((resolve) => {
                app.getList(type, function (reply) {
                    resolve(reply);
                    app.destroySessionObject(reply.qInfo.qId);
                });
            });
        };
        this.getSheet = (app) => {
            return new Promise((resolve) => {
                this.getList(app, 'sheet').then((props) => {
                    const sheets = [];
                    for (const sheet of props.qAppObjectList.qItems) {
                        const cells = [];
                        for (const cell of sheet.qData.cells) {
                            this.getQlikObjectTitles(app, cell.name).then((_titles) => {
                                const title = _titles['title'] || _titles['subtitle'] || _titles['footnote'] || cell['name'];
                                cells.push({ ...cell, options: _titles, obj_id: cell.name, id: cell.name, title: title });
                            });
                            sheet['obj'] = cells;
                        }
                        sheets.push({ name: sheet.qMeta.title, id: sheet.qInfo.qId, ...sheet });
                    }
                    resolve(sheets);
                });
            });
        };
        this.callObject = (app, id) => {
            return new Promise((resolve) => {
                if (app.visualization?.get) {
                    app.visualization
                        .get(id)
                        .then((vis) => {
                        resolve(vis);
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
            });
        };
        this.checkAppOpen = (app) => {
            return new Promise((resolve, reject) => {
                app.model.waitForOpen.promise
                    .then(() => {
                    resolve(app);
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        };
        this.isAppOpen = async (id) => {
            const app = this.qlik.openApp(id, this.config);
            await this.checkAppOpen(app);
            return app;
        };
        const { host, port, prefix, isSecure, ticket } = config;
        const _prefix = prefix !== '/' ? prefix : '/';
        const _secure = isSecure ? 'https://' : 'http://';
        const _port = port ? `:${port}` : '';
        this.config = config;
        this.ticket = ticket;
        this.baseUrl = `${_secure}${host}${_port}${_prefix}resources`;
    }
    on(eventName, fn) {
        if (!this.emitter[eventName])
            this.emitter[eventName] = [];
        this.emitter[eventName].push(fn);
    }
    emit(eventName, params) {
        let cbs = this.emitter[eventName];
        if (cbs) {
            cbs.forEach((cb) => cb(params));
        }
    }
    callRequire() {
        return new Promise(async (resolve, reject) => {
            try {
                const _ticket = this.ticket ? (this.ticket.includes('qlikTicket') ? `?${this.ticket}` : `?qlikTicket=${this.ticket}`) : '';
                if (!document.getElementById('qlik-require-file')) {
                    const jsFileLoad = document.createElement('script');
                    jsFileLoad.src = `${this.baseUrl}/assets/external/requirejs/require.js${_ticket}`;
                    jsFileLoad.id = 'qlik-require-file';
                    document.head.appendChild(jsFileLoad);
                    const loadedJS = new Promise((resolve, reject) => {
                        jsFileLoad.onload = () => resolve('loaded');
                        jsFileLoad.onerror = (error) => reject(error);
                    });
                    await loadedJS;
                    const cssFileLoad = document.createElement('link');
                    cssFileLoad.href = `${this.baseUrl}/autogenerated/qlik-styles.css${_ticket}`;
                    cssFileLoad.type = 'text/css';
                    cssFileLoad.rel = 'stylesheet';
                    document.head.insertBefore(cssFileLoad, document.head.firstChild);
                    const loadedCSS = new Promise((resolve, reject) => {
                        cssFileLoad.onload = () => resolve('loaded');
                        cssFileLoad.onerror = (error) => reject(error);
                    });
                    loadedCSS
                        .then((result) => {
                        resolve(result);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            }
            catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
    setQlik() {
        return new Promise((resolve, reject) => {
            // @ts-ignore-next-line
            window.require.config({
                baseUrl: this.baseUrl,
                paths: { qlik: `${this.baseUrl}/js/qlik` },
                config: {
                    text: {
                        useXhr() {
                            return true;
                        },
                    },
                },
            });
            // @ts-ignore
            window.require(['js/qlik'], (qlik) => {
                if (qlik) {
                    qlik.setOnError((err) => {
                        this.emit('qlik', 'qlik error');
                        reject(err);
                    });
                    // @ts-ignore
                    this.qlik = qlik;
                    resolve(qlik);
                }
            });
        });
    }
    setAuthUser() {
        return new Promise((resolve) => {
            this.qlik
                .callRepository('/api/hub/v1/user/info')
                .then((reply) => {
                const res = reply.data.data[0];
                const { userDirectory, userId } = res.attributes;
                this.user = { directory: userDirectory, userId: userId, authUser: res };
                resolve(true);
            })
                .catch((err) => {
                console.log(err);
            });
        });
    }
    getDocs() {
        return new Promise((resolve) => {
            this.qlik.getAppList((list) => {
                this.docList = list;
                resolve(list);
            }, this.config);
        });
    }
    getList(app, type) {
        return new Promise((resolve) => {
            app.getList(type, (reply) => {
                resolve(reply);
                app.destroySessionObject(reply.qInfo.qId);
            });
        });
    }
    getApp(id) {
        return (async () => {
            const checkApp = this.currApps.find((ap) => ap.app.id === id);
            if (!checkApp) {
                const app = await this.isAppOpen(id);
                const sheet = await this.getSheet(app);
                const measure = await this.getMeasure(app);
                const fields = await this.getFields(app);
                const variable = await this.getVariable(app);
                const bookmark = await this.getBookmark(app);
                this.currApps = [{ id: id, app, sheet, measure, fields, variable, bookmark }, ...this.currApps];
                return this.currApps;
            }
        })();
    }
}
exports.default = Qlik;
//# sourceMappingURL=index.js.map