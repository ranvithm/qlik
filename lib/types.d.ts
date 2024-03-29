export interface Size {
    qcx: number;
    qcy: number;
}
export interface NxValidationError {
    qErrorCode: number;
    qContext: string;
    qExtendedMessage: string;
}
export interface NxStateCounts {
    qLocked: number;
    qSelected: number;
    qOption: number;
    qDeselected: number;
    qAlternative: number;
    qExcluded: number;
    qSelectedExcluded: number;
    qLockedExcluded: number;
}
export interface FieldAttributes {
    qType: "U" | "A" | "I" | "R" | "F" | "M" | "D" | "T" | "TS" | "IV";
    qnDec: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    qUseThou: 0 | 1;
    qFmt: string;
    qDec: string;
    qThou: string;
    qSAFEARRAY: any[];
}
export interface CharRange {
    qCharPos: number;
    qCharCount: number;
}
export interface NxHighlightRanges {
    qRanges: CharRange[];
}
export interface NxSimpleValue {
    qText: string;
    qNum: number;
}
export interface NxAttributeExpressionValues {
    qValues: NxSimpleValue[];
}
export type NxCellRows = NxCell[];
export interface NxGroupTail {
    qUp: number;
    qDown: number;
}
export interface Rect {
    qLeft: number;
    qTop: number;
    qWdith: number;
    qHeight: number;
}
export interface NxPivotDimensioncell {
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
export interface NxPivotValuePoint {
    qLabel?: string | undefined;
    qText: string;
    qNum: number;
    qType: "V" | "E" | "N" | "T" | "P" | "R" | "U";
    qAttrExps: NxAttributeExpressionValues;
}
export interface NxPivotPage {
    qLeft: NxPivotDimensioncell[];
    qTop: NxPivotDimensioncell[];
    qData: NxPivotValuePoint[];
    qArea: Rect;
}
export interface NxStackedPivotCell {
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
export interface NxStackPage {
    qData: NxStackedPivotCell[];
    qArea: Rect;
}
export interface NxCellPosition {
    qx: number;
    qy: number;
}
export interface NxDataPage {
    qMatrix: NxCellRows[];
    qTails: NxGroupTail[];
    qArea: Rect;
    qIsReduced: boolean;
}
export interface NxAttributeDimValues {
    qValues: NxSimpleDimValue[];
}
export interface NxSimpleDimValue {
    qText: string;
    qElemNo: number;
}
export interface NxCell {
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
export interface NxAttrExprInfo {
    qMin: number;
    qMax: number;
    qContinuousAxes: boolean;
    qIsCyclic: boolean;
    qFallbackTitle: string;
}
export interface NxAttrDimInfo {
    qCardinal: number;
    qSize: Size;
    qFallbackTitle: string;
    qLocked: boolean;
    qError: NxValidationError;
}
export interface ColumnInfo {
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
export interface NxDimensionInfo extends ColumnInfo {
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
export type NxMeasureInfo = ColumnInfo;
export interface HyperCube {
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
export interface NxInfo {
    qId: string;
    qType: string;
}
export interface NxCurrentSelectionItem {
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
export interface RangeSelectInfo {
    qRangeLo: number;
    qRangeHi: number;
    qMeasure: string;
}
export interface NxFieldSelectionInfo {
    qName: string;
    qFieldSelectionmode: "NORMAL" | "AND" | "NOT";
}
export interface Selectionobject {
    qBackCount: number;
    qForwardCount: number;
    qSelections: NxCurrentSelectionItem[];
}
export interface Layout {
    qHyperCube: HyperCube;
    qInfo: NxInfo;
    qSelectionInfo: Selectionobject;
}
export interface ValueExpr {
    qv: string;
}
export interface SortCriteria {
    qSortByState: -1 | 0 | 1;
    qSortByFrequency: -1 | 0 | 1;
    qSortByNumeric: -1 | 0 | 1;
    qSortByAscii: -1 | 0 | 1;
    qSortByLoadOrder: -1 | 0 | 1;
    qSortByExpression: -1 | 0 | 1;
    qExpression: ValueExpr;
}
export interface NxInlineDimensionDef {
    qGrouping: "N" | "H" | "C";
    qFieldDefs: string[];
    qSortCriteries: SortCriteria[];
    qNumberPresentations: FieldAttributes[];
    qReverseSort: boolean;
    qActiveField: number;
}
export interface OtherTotalSpecProp {
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
export interface NxAttrExprDef {
    qExpression: string;
    qLibraryId: string;
}
export interface NxAttrDimDef {
    qDef: string;
    qLibraryId: string;
    qSortBy: SortCriteria;
}
export interface NxDimension {
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
export interface NxMeasure {
    qLibraryId: string;
    qDef: NxInlineMeasureDef;
    qSortBy: SortCriteria;
    qAttributeExpressions: NxAttrExprDef[];
    qCalcCond: ValueExpr;
    qAttributeDimensions: NxAttrDimDef[];
}
export interface NxInlineMeasureDef {
    qcx: number;
    qcy: number;
}
export interface NxPage {
    qLeft?: number | undefined;
    qTop?: number | undefined;
    qWidth?: number | undefined;
    qHeight?: number | undefined;
}
export interface HyperCubeDef {
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
export interface NxAutoSortByStateDef {
    qDisplayNumberOfRows: number;
}
export interface NxListobjectExpressionDef {
    qExpr: string;
    qLibraryId: string;
}
export interface ListobjectDef {
    qStateName: string;
    qLibraryId: string;
    qDef: NxInlineDimensionDef;
    qAutoSortByState: NxAutoSortByStateDef;
    qFrequencyMode: "NX_FREQUENCY_NONE" | "NX_FREQUENCY_VALUE" | "NX_FREQUENCY_PERCENT" | "NX_FREQUENCY_RELATIVE";
    qShowAlternatives: boolean;
    qInitialDataFetch: NxPage[];
    qExpressions: NxListobjectExpressionDef[];
}
export interface InitialPropertiesHyperCube {
    qHyperCubeDef: HyperCubeDef;
    [key: string]: any;
}
export interface InitialPropertiesListobject {
    qListobjectDef: ListobjectDef;
    [key: string]: any;
}
export type InitialProperties = InitialPropertiesHyperCube | InitialPropertiesListobject;
export interface SnapshotLegacy {
    canTakeSnapshot: boolean;
}
export type SupportFunction = (layout: Layout) => boolean;
export type SupportItem = boolean | SupportFunction;
export interface Support {
    snapshot: SupportItem | SnapshotLegacy;
    export: SupportItem;
    exportData: SupportItem;
}
export type Paint = (this: ExtensionContext, $element?: any, layout?: Layout, qDimensionInfo?: NxDimensionInfo, qMeasureInfo?: NxDimensionInfo, qMatrix?: NxCellRows[], dimensions?: NxCell[], measures?: NxCell[], qSize?: Size, qId?: string, qSelectionInfo?: Selectionobject) => void;
export interface VisualizationCommon {
    qHyperCubeDef: HyperCubeDef;
    title: string;
    showTitles: boolean;
    subtitle: string;
    footnote: string;
}
export type VisualizationOptions = VisualizationCommon;
export type ShowFunction = (layout: Layout, cls: any, obj: any) => boolean | ((measure: NxMeasure) => boolean);
export interface CustomPropertyCommon {
    type?: "string" | "integer" | "number" | "array" | "boolean" | "items" | undefined;
    ref?: string | undefined;
    label?: string | undefined;
    show?: boolean | ShowFunction | undefined;
}
export interface CustomPropertyString extends CustomPropertyCommon {
    type: "string";
    expression?: "always" | "optional" | "" | undefined;
    maxLength?: number | undefined;
    defaultValue?: string | undefined;
}
export interface CustomPropertyInteger extends CustomPropertyCommon {
    type: "integer";
    component?: string | undefined;
    min?: string | undefined;
    max?: string | undefined;
    defaultValue?: number | undefined;
}
export interface CustomPropertyNumber extends CustomPropertyCommon {
    type: "number";
    component?: string | undefined;
    min?: string | undefined;
    max?: string | undefined;
    defaultValue?: number | undefined;
}
export interface CustomPropertyArray extends CustomPropertyCommon {
    type: "array";
    component?: undefined;
    itemTitleRef?: string | undefined;
    allowAdd?: boolean | undefined;
    allowRemove?: boolean | undefined;
    addTranslation?: string | undefined;
    allowMove?: boolean | undefined;
}
export interface CustomPropertyButton extends CustomPropertyCommon {
    component: "button";
    action(data: VisualizationOptions): void;
}
export interface ButtonGroupOption {
    value: string;
    label: string;
    tooltip: string;
}
export interface CustomPropertyButtonGroup extends CustomPropertyCommon {
    type: "string";
    component: "buttongroup";
    defaultValue?: string | undefined;
    options?: ButtonGroupOption[] | (() => ButtonGroupOption[]) | undefined;
}
export interface CustomPropertyCheckbox extends CustomPropertyCommon {
    type: "boolean";
    defaultValue?: boolean | undefined;
}
export interface CustomPropertyColorPicker extends CustomPropertyCommon {
    type: "integer";
    component: "color-picker";
    defaultValue?: number | undefined;
}
export interface CustomPropertyOption {
    value: string;
    label: string;
}
export type CustomPropertyOptions = CustomPropertyOption[] | (() => CustomPropertyOption[]);
export interface CustomPropertyDropdown extends CustomPropertyCommon {
    type: "string";
    ref: string;
    component: "dropdown";
    defaultValue?: string | undefined;
    options?: CustomPropertyOptions | undefined;
}
export interface CustomPropertyLink extends CustomPropertyCommon {
    component: "link";
    url?: string | undefined;
}
export interface CustomProperyMedia extends CustomPropertyCommon {
    type: "string";
    component: "media";
    layoutRef?: string | undefined;
}
export interface CustomPropertyRadio extends CustomPropertyCommon {
    type: "string";
    component: "radiobuttons";
    defaultValue?: string | undefined;
    options?: CustomPropertyOptions | undefined;
}
export interface CustomPropertySlider extends CustomPropertyCommon {
    type: "number";
    component: "slider";
    defaultValue?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
    step?: number | undefined;
}
export interface CustomPropertyRangeSlider extends CustomPropertyCommon {
    type: "array";
    component: "slider";
    defaultValue?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
    step?: number | undefined;
}
export interface CustomPropertySwitch extends CustomPropertyCommon {
    type: "boolean";
    component: "switch";
    defaultValue?: string | undefined;
    options?: CustomPropertyOptions | undefined;
}
export interface CustomPropertyText extends CustomPropertyCommon {
    component: "text";
}
export interface CustomPropertyTextArea extends CustomPropertyCommon {
    type: "string";
    component: "textarea";
    rows?: number | undefined;
    maxlength?: number | undefined;
    defaultValue?: string | undefined;
}
export interface CustomPropertyExpression extends CustomPropertyCommon {
    type: undefined;
    component: "expression";
    expressionType: "dimension" | "measure" | "StringExpr" | "ValueExpr" | "ValueExpression" | "StringExpression";
    defaultValue?: string | undefined;
}
export interface CustomPropertyItems extends CustomPropertyCommon {
    type: "items";
    items: {
        [key: string]: CustomProperty;
    };
}
export type CustomProperty = CustomPropertyString | CustomPropertyInteger | CustomPropertyNumber | CustomPropertyArray | CustomPropertyButton | CustomPropertyButtonGroup | CustomPropertyCheckbox | CustomPropertyColorPicker | CustomPropertyDropdown | CustomPropertyLink | CustomProperyMedia | CustomPropertyRadio | CustomPropertySlider | CustomPropertyRangeSlider | CustomPropertySwitch | CustomPropertyText | CustomPropertyTextArea | CustomPropertyExpression | CustomPropertyItems;
export interface Definition {
    type: "items";
    component: "accordion";
    items: {
        data?: {
            uses: "data";
        } | undefined;
        dimensions?: {
            uses: "dimensions";
            ref?: string | undefined;
            min?: number | undefined;
            max?: number | undefined;
            items?: {
                [key: string]: CustomProperty;
            } | undefined;
        } | undefined;
        measures?: {
            uses: "measures";
            ref?: string | undefined;
            min?: number | undefined;
            max?: number | undefined;
            items?: {
                [key: string]: CustomProperty;
            } | undefined;
        } | undefined;
        sorting?: {
            uses: "sorting";
            items?: {
                [key: string]: CustomProperty;
            } | undefined;
        } | undefined;
        settings?: {
            uses: "settings";
            items?: {
                [key: string]: CustomProperty;
            } | undefined;
        } | undefined;
    };
}
export interface Extension {
    initialProperties: InitialProperties;
    definition: Definition;
    paint: Paint;
    support?: Support | undefined;
}
export interface Patch {
    qOp: "add" | "remove" | "replace";
    qPath: string;
    qValue: string;
}
export interface BackendApi {
    abortSearch(): void;
    acceptSearch(toggleMode: boolean): void;
    applyPatches(qPatches: Patch[], qSoftPatch: boolean): Promise<any>;
    clearSelections(): void;
    clearSoftPatches(): Promise<any>;
    collapseLeft(qRow: number, qCol: number, qAll?: boolean): Promise<any>;
    collapseTop(qRow: number, qCol: number, qAll?: boolean): Promise<any>;
    eachDataRow(callback: (i: number, d: NxCellRows) => boolean | void): NxCellRows;
    expandLeft(qRow: number, qCol: number, qAll?: boolean): Promise<any>;
    expandTop(qRow: number, qCol: number, qAll?: boolean): Promise<any>;
    getData(qPages: NxPage[]): Promise<NxDataPage[]>;
    getDataRow(rownum: number): NxCellRows | null;
    getDimensionInfos(): NxDimensionInfo[];
    getMeasureInfos(): NxMeasureInfo[];
    getPivotData(qPages: NxPage[]): Promise<NxPivotPage>;
    getRowCount(): number;
    getStackeddata(qPages: NxPage[], qMaxNbrCells: number): Promise<NxStackPage>;
    hasSelections(): boolean;
    save(): Promise<undefined>;
    search(term: string): void;
    selectValues(qDimNo: number, qValues: number[], qToggleMode: boolean): void;
    selectProperties(props: {}): Promise<any>;
}
export interface ExtensionContext {
    $element: any;
    $scope: any;
    _inAnalysisState: boolean;
    _inEditState: boolean;
    _interactionState: number;
    _on: boolean;
    backendApi: BackendApi;
    paint: Paint;
    selectionsEnabled: boolean;
    toggleLasso(): void;
    selectValues(dimNo: number, values: number[], toggleMode: boolean): void;
}
export interface QDimensionCell {
    qText: string;
    qElemNumber: number;
    qState: string;
    qNum?: number | undefined;
    select(): void;
}
export interface QMeasureCell {
    qText: string;
    qNum?: number | undefined;
    getPercent(): number;
    getPercentOfMax(): number;
}
export interface QRow {
    dimensions: QDimensionCell[];
    measures: QMeasureCell[];
    cells: Array<QDimensionCell | QMeasureCell>;
}
export interface QHeader {
    qFallbackTitle: string;
    qSortIndicator: "A" | "B";
    isOrderedBy: boolean;
    qReverseSort: boolean;
    col: number;
    qCardinal?: number | undefined;
    qStateCounts?: {
        [state: string]: number;
    } | undefined;
    qMin?: number | undefined;
    qMax?: number | undefined;
    errorCode?: number | undefined;
    errorMessage?: number | undefined;
    orderBy(): void;
    reverseOrder(): void;
    selectRange(min: number, max: number, inclMin: boolean, inclMax: boolean): Promise<any>;
}
export interface ExportDataOptions {
    format: "OOXML" | "CSV_C" | "CSV_T";
    filename?: string | undefined;
    state: "A" | "P";
    download: boolean;
}
export interface QTable {
    rows: QRow[];
    headers: QHeader[];
    totals: QMeasureCell[];
    rowCount: number;
    colCount: number;
    exportData(options: ExportDataOptions, callback: (url: string) => void): void;
    getColByName(fld: string): number | undefined;
    getMoreData(): void;
}
export interface Variable {
    qContent: {
        qIsNum: boolean;
        qString: string;
    };
}
export interface QFieldValue {
    qText: string;
    qElemNumber: number;
    qState: any;
    qNum?: string | undefined;
    qFrequency?: string | undefined;
    select(toggle?: boolean, softlock?: boolean): Promise<any>;
}
export interface GetDataOptions {
    rows: number;
    frequencyMode: "V" | "P" | "R" | "N";
}
export interface QField {
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
export type ListTypes = "FieldList" | "MeasureList" | "DimensionList" | "BookmarkList" | "Selectionobject" | "SnapshotList" | "MediaList" | "sheet" | "Materobject" | "VariableList" | "story";
export interface App {
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
export type callRepository = (path: string, method: string, body: string) => Promise<any>;
export type currApp = (reference: object) => App;
export interface GetAppConfig {
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
export type getAppList = (callback: App[], config: GetAppConfig) => void;
export type getExtensionList = (callback: any[]) => Promise<any>;
export type Global = any;
export interface GetGlobalConfig {
    host: string;
    port: string;
    prefix: string;
    isSecure: boolean;
    identity: string;
}
export type getGlobal = (config: GetGlobalConfig) => Global;
export type openApp = (appId: string, config: GetAppConfig) => App;
export type registerExtension = (id: string, impl: Extension, metadata: object) => void;
export type resize = (ID?: string) => void;
export declare namespace LanguageCodes {
    type German = "de" | "de-DE";
    type English = "en" | "en-US";
    type Spanish = "es" | "es-ES";
    type French = "fr" | "fr-FR";
    type Italian = "it" | "it-IT";
    type Japanese = "ja" | "ja-JP";
    type Korean = "ko" | "ko-KR";
    type Dutch = "nl" | "nl-NL";
    type Polish = "pl" | "pl-PL";
    type BrazilianPortuguese = "pt" | "pt-BR";
    type Russian = "ru" | "ru-RU";
    type Swedish = "sv" | "sv-SE";
    type Turkish = "ts" | "ts-TR";
    type SimplifiedChinese = "zh-CN";
    type TraditionalChinese = "zh-TW";
    type ALL = German | English | Spanish | French | Italian | Japanese | Korean | Dutch | Polish | BrazilianPortuguese | Russian | Swedish | Turkish | SimplifiedChinese | TraditionalChinese;
}
export type setLanguage = (lang: LanguageCodes.ALL) => void;
export interface Error {
    code: any;
    message: string;
}
export type setOnError = (onError: (error: Error) => void, onWarning: (warning: string) => void) => void;
export type table = (ext: object, path?: string) => void;
export interface IQlik {
    callRepository(path: string, method?: string, body?: string): Promise<any>;
    currApp(object?: any): App;
    getAppList(callback: any, config?: GetAppConfig): void;
    getGlobal(config: GetGlobalConfig): any;
    openApp(appId: string, config?: GetAppConfig): App;
    resize(ID?: string): void;
    setLanguage(lang: string): void;
    setOnError(onError: any, onWarning?: any): void;
}
export interface IUser {
    directory: string;
    userId: string;
    authUser: any;
}
