interface Size {
    qcx: number;
    qcy: number;
}
interface NxValidationError {
    qErrorCode: number;
    qContext: string;
    qExtendedMessage: string;
}
interface NxStateCounts {
    qLocked: number;
    qSelected: number;
    qOption: number;
    qDeselected: number;
    qAlternative: number;
    qExcluded: number;
    qSelectedExcluded: number;
    qLockedExcluded: number;
}
interface FieldAttributes {
    qType: "U" | "A" | "I" | "R" | "F" | "M" | "D" | "T" | "TS" | "IV";
    qnDec: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    qUseThou: 0 | 1;
    qFmt: string;
    qDec: string;
    qThou: string;
    qSAFEARRAY: any[];
}
interface CharRange {
    qCharPos: number;
    qCharCount: number;
}
interface NxHighlightRanges {
    qRanges: CharRange[];
}
interface NxSimpleValue {
    qText: string;
    qNum: number;
}
interface NxAttributeExpressionValues {
    qValues: NxSimpleValue[];
}
type NxCellRows = NxCell[];
interface NxGroupTail {
    qUp: number;
    qDown: number;
}
interface Rect {
    qLeft: number;
    qTop: number;
    qWidth: number;
    qHeight: number;
}
interface NxPivotDimensionCell {
    qText: string;
    qElemNo: number;
    qValue: number;
    qCanExpand: boolean;
    qCanCollapse: boolean;
    qType: "V" | "E" | "N" | "T" | "P" | "R" | "U";
    qUp: number;
    qDown: number;
    qSubNodes: NxPivotDimensionCell[];
    qAttrExps: NxAttributeExpressionValues[];
    qAttrDims: NxAttributeDimValues[];
}
interface NxPivotValuePoint {
    qLabel?: string;
    qText: string;
    qNum: number;
    qType: "V" | "E" | "N" | "T" | "P" | "R" | "U";
    qAttrExps: NxAttributeExpressionValues;
}
interface NxPivotPage {
    qLeft: NxPivotDimensionCell[];
    qTop: NxPivotDimensionCell[];
    qData: NxPivotValuePoint[];
    qArea: Rect;
}
interface NxStackedPivotCell {
    qText: string;
    qElemNo: number;
    qValue: number;
    qCanExpand: boolean;
    qCanCollapse: boolean;
    qType: "V" | "E" | "N" | "T" | "P" | "R" | "U";
    qMaxPos: number;
    qMinNeg: number;
    qUp: number;
    qDown: number;
    qRow: number;
    qSubNodes: NxStackedPivotCell[];
    qAttrExps: NxAttributeExpressionValues;
    qAttrDims: NxAttributeDimValues[];
}
interface NxStackPage {
    qData: NxStackedPivotCell[];
    qArea: Rect;
}
interface NxCellPosition {
    qx: number;
    qy: number;
}
interface NxDataPage {
    qMatrix: NxCellRows[];
    qTails: NxGroupTail[];
    qArea: Rect;
    qIsReduced: boolean;
}
interface NxAttributeDimValues {
    qValues: NxSimpleDimValue[];
}
interface NxSimpleDimValue {
    qText: string;
    qElemNo: number;
}
interface NxCell {
    qText: string;
    qNum: number;
    qElemNumber: number;
    qState: "L" | "S" | "O" | "D" | "A" | "X" | "XS" | "XL";
    qIsEmpty: boolean;
    qIsTotalCell: boolean;
    qIsOtherCell: boolean;
    qFrequency: string;
    qHighlightRanges: NxHighlightRanges;
    qAttrExps: NxAttributeExpressionValues;
    qIsNull: boolean;
    qAttrDims: NxAttributeDimValues;
}
interface NxAttrExprInfo {
    qMin: number;
    qMax: number;
    qContinuousAxes: boolean;
    qIsCyclic: boolean;
    qFallbackTitle: string;
}
interface NxAttrDimInfo {
    qCardinal: number;
    qSize: Size;
    qFallbackTitle: string;
    qLocked: boolean;
    qError: NxValidationError;
}
interface ColumnInfo {
    qFallbackTitle: string;
    qApprMaxGlyphCount: number;
    qCardinal: string;
    qSortIndicator: "N" | "A" | "D";
    qNumFormat: FieldAttributes;
    qIsAutoFormat: boolean;
    qMin: number;
    qMax: number;
    qError: NxValidationError;
    qReverseSort: boolean;
    qAttrExprInfo: NxAttrExprInfo[];
    qAttrDimInfo: NxAttrDimInfo[];
}
interface NxDimensionInfo extends ColumnInfo {
    qLocker: string;
    qGroupFallbackTitles: string[];
    qGroupPos: number;
    qStateCounts: NxStateCounts;
    qTags: string[];
    qDimensionType: "D" | "N" | "T";
    qGrouping: "N" | "H" | "C";
    qIsSemantic: boolean;
    qGroupFieldDefs: string[];
    qContinuousAxes: boolean;
    qIsCyclic: boolean;
    qDerivedField: boolean;
}
type NxMeasureInfo = ColumnInfo;
interface HyperCube {
    qStateName: string;
    qSize: Size;
    qError: NxValidationError;
    qDimensionInfo: NxDimensionInfo[];
    qMeasureInfo: NxMeasureInfo[];
    qEffectiveInterColumnSortOrder: number[];
    qGrandTotalRow: NxCell[];
    qDataPages: NxDataPage[];
    qPivotDataPages: NxPivotPage[];
    qStackedDataPages: NxStackPage[];
    qMode: "S" | "P" | "K";
    qNoOfLeftDims: number;
    qIndentMode: boolean;
    qLastExpandedPos: NxCellPosition;
    qHasOtherValues: boolean;
}
interface NxInfo {
    qId: string;
    qType: string;
}
interface NxCurrentSelectionItem {
    qTotal: number;
    qIsNum?: boolean;
    qField: string;
    qLocked?: boolean;
    qOneAndOnlyOne?: boolean;
    qTextSearch?: string;
    qSelectedCount: number;
    qSelected: string;
    qRangeInfo: RangeSelectInfo[];
    qSortIndex: number;
    qStateCounts: NxStateCounts;
    qSelectedFieldSelectionInfo: NxFieldSelectionInfo[];
    qNotSelectedFieldSelectionInfo: NxFieldSelectionInfo[];
    qSelectionThreshold: number;
}
interface RangeSelectInfo {
    qRangeLo: number;
    qRangeHi: number;
    qMeasure: string;
}
interface NxFieldSelectionInfo {
    qName: string;
    qFieldSelectionmode: "NORMAL" | "AND" | "NOT";
}
interface SelectionObject {
    qBackCount: number;
    qForwardCount: number;
    qSelections: NxCurrentSelectionItem[];
}
interface Layout {
    qHyperCube: HyperCube;
    qInfo: NxInfo;
    qSelectionInfo: SelectionObject;
}
interface ValueExpr {
    qv: string;
}
interface SortCriteria {
    qSortByState: -1 | 0 | 1;
    qSortByFrequency: -1 | 0 | 1;
    qSortByNumeric: -1 | 0 | 1;
    qSortByAscii: -1 | 0 | 1;
    qSortByLoadOrder: -1 | 0 | 1;
    qSortByExpression: -1 | 0 | 1;
    qExpression: ValueExpr;
}
interface NxInlineDimensionDef {
    qGrouping: "N" | "H" | "C";
    qFieldDefs: string[];
    qSortCriteries: SortCriteria[];
    qNumberPresentations: FieldAttributes[];
    qReverseSort: boolean;
    qActiveField: number;
}
interface OtherTotalSpecProp {
    qOtherMode: "OTHER_OFF" | "OTHER_COUNTED" | "OTHER_ABS_LIMITED" | "OTHER_ABS_ACC_TARGET" | "OTHER_REL_LIMITED" | "OTHER_REL_ACC_TARGET";
    qOtherCounted: ValueExpr;
    qOtherLimit: ValueExpr;
    qOtherLimitMode: "OTHER_GE_LIMIT" | "OTHER_LE_LIMIT" | "OTHER_GT_LIMIT" | "OTHER_LT_LIMIT";
    qSupressOther: boolean;
    qForceBadValueKeeping: boolean;
    qApplyEvenWhenPossiblyWrongResult: boolean;
    qGlobalOtherGrouping: boolean;
    qOtherCollapseInnerDimensions: boolean;
    qOtherSortMode: "OTHER_SORT_DEFAULT" | "OTHER_SORT_DESCENDING" | "OTHER_SORT_ASCENDING";
    qTotalMode: "TOTAL_OFF" | "TOTAL_EXPR";
    qReferencedExpression: string;
}
interface NxAttrExprDef {
    qExpression: string;
    qLibraryId: string;
}
interface NxAttrDimDef {
    qDef: string;
    qLibraryId: string;
    qSortBy: SortCriteria;
}
interface NxDimension {
    qLibraryId: string;
    qDef: NxInlineDimensionDef;
    qNullSuppression: boolean;
    qOtherTotalSpec: OtherTotalSpecProp;
    qShowAll: boolean;
    qOtherLabel: string;
    qTotalLabel: string;
    qCalcCond: ValueExpr;
    qAttributeExpressions: NxAttrExprDef[];
    qAttributeDimensions: NxAttrDimDef[];
}
interface NxMeasure {
    qLibraryId: string;
    qDef: NxInlineMeasureDef;
    qSortBy: SortCriteria;
    qAttributeExpressions: NxAttrExprDef[];
    qCalcCond: ValueExpr;
    qAttributeDimensions: NxAttrDimDef[];
}
interface NxInlineMeasureDef {
    qcx: number;
    qcy: number;
}
interface NxPage {
    qLeft?: number;
    qTop?: number;
    qWidth?: number;
    qHeight?: number;
}
interface HyperCubeDef {
    qStateName?: string;
    qDimensions?: NxDimension[];
    qMeasures?: NxMeasure[];
    qInterColumnSortOrder?: number[];
    qSuppressZero?: boolean;
    qSupressMissing?: boolean;
    qInitialDataFetch?: NxPage[];
    qMode?: "S" | "P" | "K";
    qNoOfLeftDims?: number;
    qAlwaysFullyExpanded?: boolean;
    qMaxStackedCells?: number;
    qPopulateMissing?: boolean;
    qShowTotalsAbove?: boolean;
    qIndentMode?: boolean;
    qCalcCond?: ValueExpr;
    qSortByYValue?: -1 | 0 | 1;
}
interface Variable {
    qContent: {
        qIsNum: boolean;
        qString: string;
    };
}
interface QFieldValue {
    qText: string;
    qElemNumber: number;
    qState: any;
    qNum?: string;
    qFrequency?: string;
    select(toggle?: boolean, softlock?: boolean): Promise<any>;
}
interface GetDataOptions {
    rows: number;
    frequencyMode: "V" | "P" | "R" | "N";
}
interface QField {
    rows?: QFieldValue[];
    rowCount?: number;
    qStateCounts?: {
        [state: string]: number;
    };
    clear(): Promise<any>;
    clearOther(softlock: boolean): Promise<any>;
    getData(options: GetDataOptions): this;
    getMoreData(): this;
    lock(): Promise<any>;
    select(values: number[], toggle?: boolean, softlock?: boolean): Promise<any>;
    selectAll(softlock?: boolean): Promise<any>;
    selectAlternative(softlock?: boolean): Promise<any>;
    selectExcluded(softlock?: boolean): Promise<any>;
    selectMatch(match: string, softlock?: boolean): Promise<any>;
    selectPossible(softlock?: boolean): Promise<any>;
    selectValues(values: QFieldValue[], toggle?: boolean, softlock?: boolean): Promise<any>;
    toggleSelect(match: string, softlock?: boolean): Promise<any>;
    unlock(): Promise<any>;
}
type ListTypes = "FieldList" | "MeasureList" | "DimensionList" | "BookmarkList" | "SelectionObject" | "SnapshotList" | "MediaList" | "sheet" | "MasterObject" | "VariableList" | "story";
interface IApp {
    id: string;
    selectionState: SelectionObject;
    addAlternateState(qStateName: string): Promise<any>;
    back(): Promise<any>;
    clearAll(lockedAlso?: boolean, state?: string): Promise<any>;
    close(): void;
    createCube(qHyperCubeDef: HyperCubeDef, callback?: (hypercube: HyperCube) => void): Promise<any>;
    destroySession(id: string): Promise<any>;
    doReload(qMode?: "0" | "1" | "2", qPartial?: boolean, qDebug?: boolean): Promise<any>;
    model: any;
    doSave(qFileName?: string): Promise<any>;
    visualization: {
        get?: (id: string, elem?: any | string, options?: any) => Promise<any>;
    };
    field(field: string, state?: string): QField;
    forward(): Promise<any>;
    getAppLayout(callback: (layout: Layout) => void): Promise<any>;
    getFullPropertyTree(id: string): Promise<any>;
    getList(type: ListTypes, callback: (reply: any) => void): Promise<any>;
    destroySessionObject(id: string): Promise<any>;
    getObject(elem?: HTMLElement | string, id?: string | "CurrentSelections", options?: {
        noInteraction?: boolean;
        noSelections?: boolean;
    }): Promise<any>;
    getObjectProperties(id: string): Promise<any>;
    getSnapshot(elem?: HTMLElement | string, id?: string): Promise<any>;
    lockAll(state?: string): Promise<any>;
    removeAlternateState(qStateName: string): Promise<any>;
    unlockAll(state?: string): Promise<any>;
    createGenericObject(_0: any, callback: (_1: any) => void): Promise<any>;
    variable: {
        getContent(variable: string, callback: (value: Variable, app: IApp) => void): Promise<any>;
        setContent(variable: string, value: string): void;
    };
}
interface GetAppConfig {
    host?: string;
    port: string | number;
    prefix?: string;
    isSecure?: boolean;
    openWithoutData?: boolean;
    identity?: string;
    ticket?: string;
    isSaaS?: boolean;
    webIntegrationId?: string;
    isCssRequired?: boolean;
    loginUri?: string;
    auth?: {
        method: 'redirect' | 'popup';
        popupWidth?: number;
        popupHeight?: number;
        loginCallback?: (user: any) => void;
        logoutCallback?: () => void;
    };
}
interface GetGlobalConfig {
    host: string;
    port: string;
    prefix: string;
    isSecure: boolean;
    identity: string;
}
interface IQlik {
    callRepository(path: string, method?: string, body?: string): Promise<any>;
    currApp(object?: any): IApp;
    getAppList(callback: any, config?: GetAppConfig): void;
    getGlobal(config: GetGlobalConfig): any;
    openApp(appId: string, config?: GetAppConfig): IApp;
    resize(ID?: string): void;
    setLanguage(lang: string): void;
    setOnError(onError: any, onWarning?: any): void;
}
interface IUser {
    directory: string;
    userId: string;
    authUser: any;
}

declare class Qlik {
    config: GetAppConfig;
    qlik: IQlik;
    baseUrl: string;
    saasURL: string;
    user: IUser;
    docList: IApp[];
    currApps: any[];
    ticket?: string;
    isSaaS: boolean;
    webIntegrationId: string;
    isCssRequired: boolean;
    constructor(config: GetAppConfig);
    private appendScript;
    private appendStylesheet;
    callRequire(): Promise<void>;
    setQlik(): Promise<IQlik>;
    private fetchAPI;
    private openAuthPopup;
    private checkAuthStatus;
    authenticateToQlik(): Promise<void>;
    setAuthUser(): Promise<void>;
    getMoreData(response: any): Promise<any>;
    getSpace(id: string): Promise<any>;
    getSpaceList(): Promise<any[]>;
    getUserList(): Promise<any[]>;
    getAppList(): Promise<any[]>;
    getThemeList(): Promise<any[]>;
    getDocs(): Promise<IApp[]>;
    getList(app: IApp, type: ListTypes): Promise<any>;
    getMeasure(app: IApp): Promise<any>;
    getVariable(app: IApp): Promise<any>;
    getFields(app: IApp): Promise<any>;
    getBookmark(app: IApp): Promise<any>;
    evaluateExpression(app: IApp, title: any): Promise<any>;
    objectProper(app: IApp, model: any): Promise<any>;
    getQlikObjectTitles(app: IApp, id: string): Promise<any>;
    getSheet(app: IApp): Promise<any>;
    callObject(app: IApp, id: string): Promise<any>;
    checkAppOpen(app: IApp): Promise<IApp>;
    private setupEngineConnectionMonitoring;
    private getSessionKey;
    private saveSessionState;
    private restoreSessionState;
    isAppOpen(id: string): Promise<IApp>;
    getApp(id: string): Promise<any[]>;
}

export { Qlik as default };
