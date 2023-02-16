interface IConfig {
    host: string;
    prefix: string;
    isSecure: boolean;
    port: number;
    ticket?: string;
}
interface IApp {
    qDocId: string;
    qDocName: string;
    qTitle: string;
    model: any;
    close(): void;
    destroySessionObject(id: string): Promise<any>;
    getAppLayout(callback?: any): Promise<any>;
    getAppObjectList(type?: string, callback?: any): void;
    getFullPropertyTree(id: string): Promise<any>;
    getList(type: string, callback?: any): Promise<any>;
    getObject(id: string, elem?: any | string, options?: any): Promise<any>;
    visualization: {
        get?: (id: string, elem?: any | string, options?: any) => Promise<any>;
    };
    getObjectProperties(id: string): Promise<any>;
}
interface IQlik {
    callRepository(path: string, method?: string, body?: string): Promise<any>;
    currApp(object?: any): IApp;
    getAppList(callback: any, config?: IConfig): void;
    getGlobal(config: IConfig): any;
    openApp(appId: string, config?: IConfig): IApp;
    resize(ID?: string): void;
    setLanguage(lang: string): void;
    setOnError(onError: any, onWarning?: any): void;
}
interface IUser {
    directory: string;
    userId: string;
    authUser: any;
}
export default class Qlik {
    qlik: IQlik;
    user: IUser;
    ticket: string;
    config: IConfig;
    baseUrl: string;
    docList: IApp[];
    currApps: any[];
    emitter: {};
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
export {};
