/// <reference types="node" />
import { EventEmitter } from 'node:events';
import { IApp, IConfig, IQlik, IUser } from './types';
export default class Qlik {
    config: IConfig;
    qlik: IQlik;
    baseUrl: string;
    user: IUser;
    docList: IApp[];
    currApps: any[];
    emitter: EventEmitter;
    constructor(config: IConfig);
    on(eventName: string, fn: (...args: any[]) => void): void;
    emit(eventName: string, params: string): void;
    callRequire(): Promise<unknown>;
    setQlik(): Promise<unknown>;
    setAuthUser(): Promise<unknown>;
    getDocs(): Promise<unknown>;
    getList(app: IApp, type: string): Promise<unknown>;
    getMeasure: (app: IApp) => Promise<any>;
    getVariable: (app: IApp) => Promise<any>;
    getFields: (app: IApp) => Promise<any>;
    getBookmark: (app: IApp) => Promise<any>;
    evaluateExpression: (app: {
        createGenericObject: (arg0: {
            value: {
                qStringExpression: any;
            };
        }, arg1: (reply: {
            value: unknown;
            qInfo: {
                qId: any;
            };
        }) => void) => any;
        destroySessionObject: (arg0: any) => void;
    }, title: any) => Promise<unknown>;
    objectProper: (app: any, model: {
        properties: any;
    }) => Promise<unknown>;
    getQlikObjectTitles: (app: IApp, id: string) => Promise<unknown>;
    getlist: (app: IApp, type: string) => Promise<unknown>;
    getSheet: (app: IApp) => Promise<any>;
    callObject: (app: IApp, id: string) => Promise<unknown>;
    checkAppOpen: (app: IApp) => Promise<IApp>;
    isAppOpen: (id: string) => Promise<IApp>;
    getApp(id: string): Promise<any[]>;
}
