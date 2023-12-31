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
    qWdith: number;
    qHeight: number;
}
interface NxPivotDimensioncell {
    qText: string;
    qElemNo: number;
    qValue: number;
    qCanExpand: boolean;
    qCanCollapse: boolean;
    qType: "V" | "E" | "N" | "T" | "P" | "R" | "U";
    qUp: number;
    qDown: number;
    qSubNodes: NxPivotDimensioncell[];
    qAttrExps: NxAttributeExpressionValues[];
    qAttrDims: NxAttributeDimValues[];
}
interface NxPivotValuePoint {
    qLabel?: string | undefined;
    qText: string;
    qNum: number;
    qType: "V" | "E" | "N" | "T" | "P" | "R" | "U";
    qAttrExps: NxAttributeExpressionValues;
}
interface NxPivotPage {
    qLeft: NxPivotDimensioncell[];
    qTop: NxPivotDimensioncell[];
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
    qAttrDims: NxAttributeDimValues;
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
    qIsNum?: boolean | undefined;
    qField: string;
    qLocked?: boolean | undefined;
    qOneAndOnlyOne?: boolean | undefined;
    qTextSearch?: string | undefined;
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
interface Selectionobject {
    qBackCount: number;
    qForwardCount: number;
    qSelections: NxCurrentSelectionItem[];
}
interface Layout {
    qHyperCube: HyperCube;
    qInfo: NxInfo;
    qSelectionInfo: Selectionobject;
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
    qLeft?: number | undefined;
    qTop?: number | undefined;
    qWidth?: number | undefined;
    qHeight?: number | undefined;
}
interface HyperCubeDef {
    qStateName?: string | undefined;
    qDimensions?: NxDimension[] | undefined;
    qMeasures?: NxMeasure[] | undefined;
    qInterColumnSortOrder?: number[] | undefined;
    qSuppressZero?: boolean | undefined;
    qSupressMissing?: boolean | undefined;
    qInitialDataFetch?: NxPage[] | undefined;
    qMode?: "S" | "P" | "K" | undefined;
    qNoOfLeftDims?: number | undefined;
    qAlwaysFullyExpanded?: boolean | undefined;
    qMaxStackedCells?: number | undefined;
    qPopulateMissing?: boolean | undefined;
    qShowTotalsAbove?: boolean | undefined;
    qIndentMode?: boolean | undefined;
    qCalcCond?: ValueExpr | undefined;
    qSortByYValue?: -1 | 0 | 1 | undefined;
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
    qNum?: string | undefined;
    qFrequency?: string | undefined;
    select(toggle?: boolean, softlock?: boolean): Promise<any>;
}
interface GetDataOptions {
    rows: number;
    frequencyMode: "V" | "P" | "R" | "N";
}
interface QField {
    rows?: QFieldValue[] | undefined;
    rowCount?: number | undefined;
    qStateCounts?: {
        [state: string]: number;
    } | undefined;
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
type ListTypes = "FieldList" | "MeasureList" | "DimensionList" | "BookmarkList" | "Selectionobject" | "SnapshotList" | "MediaList" | "sheet" | "Materobject" | "VariableList" | "story";
interface App {
    addAlternateState(qStateName: string): Promise<any>;
    back(): Promise<any>;
    clearrAll(lockedAlso?: boolean, state?: string): Promise<any>;
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
    getList(type: ListTypes, callback: {
        (reply: any): void;
        (reply: any): void;
    }): Promise<any>;
    destroySessionObject(id: string): Promise<any>;
    getobject(elem?: HTMLElement | string, id?: string | "CurrentSelections", options?: {
        noInteraction?: boolean | undefined;
        noSelections?: boolean | undefined;
    }): Promise<any>;
    getObjectProperties(id: string): Promise<any>;
    getSnapshot(elem?: HTMLElement | string, id?: string): Promise<any>;
    lockAll(state?: string): Promise<any>;
    removeAlternateState(qStateName: string): Promise<any>;
    unlockAll(state?: string): Promise<any>;
    variable: {
        getContent(variable: string, callback: (value: Variable, app: App) => void): Promise<any>;
        setContent(variable: string, value: string): void;
    };
}
interface GetAppConfig {
    host?: string | undefined;
    port: string | number;
    prefix?: string | undefined;
    isSecure?: boolean | undefined;
    openWithoutData?: boolean | undefined;
    identity?: string | undefined;
    ticket?: string;
    isSaaS?: boolean;
    webIntegrationId?: string;
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
    currApp(object?: any): App;
    getAppList(callback: any, config?: GetAppConfig): void;
    getGlobal(config: GetGlobalConfig): any;
    openApp(appId: string, config?: GetAppConfig): App;
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
    docList: App[];
    currApps: any[];
    ticket: string | undefined;
    isSaaS: boolean;
    webIntegrationId: string;
    constructor(config: GetAppConfig);
    callRequire(): Promise<unknown>;
    setQlik(): Promise<unknown>;
    fetchAPI(url: RequestInfo | URL, method?: string, payload?: null): Promise<any>;
    authenticateToQlik(): Promise<void>;
    setAuthUser(): Promise<unknown>;
    getMoreData(response: any, data: any[]): Promise<any>;
    getSpace(id: string): Promise<any>;
    getSpaceList(): Promise<any>;
    getUserList(): Promise<any>;
    getAppList(): Promise<any>;
    getThemeList(): Promise<any>;
    getDocs(): Promise<unknown>;
    getList(app: App, type: ListTypes): Promise<unknown>;
    getMeasure: (app: App) => Promise<any>;
    getVariable: (app: App) => Promise<any>;
    getFields: (app: App) => Promise<any>;
    getBookmark: (app: App) => Promise<any>;
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
    getQlikObjectTitles: (app: App, id: string) => Promise<unknown>;
    getSheet: (app: App) => Promise<any>;
    callObject: (app: App, id: string) => Promise<unknown>;
    checkAppOpen: (app: App) => Promise<App>;
    isAppOpen: (id: string) => Promise<App>;
    getApp(id: string): Promise<any[] | undefined>;
}

export { Qlik as default };
