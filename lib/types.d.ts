export interface IQlikContext {
    _event?: any;
    on?(arg0: string, arg1: () => void): unknown;
    qlik?: IQlik;
    callObject?(_1: IApp, _2: string): Promise<any>;
    uploadToQlik?: any;
    getDataFromQlik?(arg0: string): Promise<any>;
    currApps?: any[];
    user?: any;
    getApp?: (arg0: string) => unknown;
    baseUrl?: string;
    config?: IConfig;
    docList?: any[] | undefined;
}
export interface IConfig {
    host: string;
    prefix: string;
    isSecure: boolean;
    port: number;
    ticket?: string;
}
export interface IApp {
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
export interface IQlik {
    callRepository(path: string, method?: string, body?: string): Promise<any>;
    currApp(object?: any): IApp;
    getAppList(callback: any, config?: IConfig): void;
    getGlobal(config: IConfig): any;
    openApp(appId: string, config?: IConfig): IApp;
    resize(ID?: string): void;
    setLanguage(lang: string): void;
    setOnError(onError: any, onWarning?: any): void;
}
export interface IUser {
    directory: string;
    userId: string;
    authUser: any;
}
export interface IViz {
    show: (_1: string, _2?: any) => void;
    close: () => void;
    exportData: () => Promise<any>;
}
