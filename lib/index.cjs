"use strict";function t(t,e,i,s){return new(i||(i=Promise))((function(r,n){function o(t){try{d(s.next(t))}catch(t){n(t)}}function a(t){try{d(s.throw(t))}catch(t){n(t)}}function d(t){var e;t.done?r(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}d((s=s.apply(t,e||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const e="/api/v1/audits",i="/api/v1/users/me",s="/api/v1/users?limit=100",r="/api/v1/tenants/me",n="/api/v1/items?limit=100&resourceType=app",o="/api/v1/themes",a="/api/v1/spaces?limit=100&type=managed,shared";module.exports=class{constructor(t){this.currApps=[];const{host:e,port:i,prefix:s="/",isSecure:r,ticket:n,webIntegrationId:o=""}=t,a=r?"https://":"http://",d=i?`:${i}`:"";this.config=t,this.ticket=n,this.isSaaS=!!o,this.webIntegrationId=o,this.baseUrl=`${a}${e}${d}${s}resources`,this.saasURL=`${a}${e}${d}`}appendScript(t,e){return new Promise(((i,s)=>{const r=document.createElement("script");r.src=t,r.id=e,r.onload=()=>i(),r.onerror=()=>s(new Error(`Failed to load script: ${t}`)),document.head.appendChild(r)}))}appendStylesheet(t){return new Promise(((e,i)=>{const s=document.createElement("link");s.href=t,s.type="text/css",s.rel="stylesheet",s.onload=()=>e(),s.onerror=()=>i(new Error(`Failed to load stylesheet: ${t}`)),document.head.prepend(s)}))}callRequire(){return t(this,void 0,void 0,(function*(){if(!document.getElementById("qlik-require-file")){const t=this.ticket?`${this.baseUrl}/assets/external/requirejs/require.js?${this.ticket}`:`${this.baseUrl}/assets/external/requirejs/require.js`;yield this.appendScript(t,"qlik-require-file"),yield this.appendStylesheet(`${this.baseUrl}/autogenerated/qlik-styles.css?${this.ticket}`)}}))}setQlik(){return t(this,void 0,void 0,(function*(){return yield this.callRequire(),new Promise(((t,e)=>{window.require.config({baseUrl:this.baseUrl,paths:{qlik:`${this.baseUrl}/js/qlik`},config:{text:{useXhr:()=>!0}},webIntegrationId:this.isSaaS?this.webIntegrationId:""}),window.require(["js/qlik"],(i=>{i?(i.setOnError((t=>e(t))),this.qlik=i,t(i)):e(new Error("Failed to initialize Qlik"))}))}))}))}fetchAPI(t,e="GET",i=null){return fetch(t,{method:e,mode:"cors",credentials:"include",headers:{"Content-Type":"application/json","qlik-web-integration-id":this.webIntegrationId},body:i?JSON.stringify(i):null}).then((t=>200!==t.status?Promise.reject(new Error(`Failed with status ${t.status}`)):t.json()))}authenticateToQlik(){return t(this,void 0,void 0,(function*(){const t=window.location.origin;try{if(401===(yield fetch(`${this.saasURL}${e}`,{credentials:"include",headers:{"Qlik-Web-Integration-ID":this.webIntegrationId}})).status){const e=new URL(`${this.saasURL}/login`);e.searchParams.append("qlik-web-integration-id",this.webIntegrationId),e.searchParams.append("returnto",t),window.location.href=e.toString()}}catch(t){console.error(t)}}))}setAuthUser(){return t(this,void 0,void 0,(function*(){if(this.isSaaS)try{const t=yield this.fetchAPI(`${this.saasURL}${i}`),e=yield this.fetchAPI(`${this.saasURL}${r}`);this.user=Object.assign(Object.assign({directory:e.name,userId:t.name},t),{tenant:e})}catch(t){console.error(t),yield this.authenticateToQlik()}else try{const t=(yield this.qlik.callRepository("/api/hub/v1/user/info")).data.data[0],{userDirectory:e,userId:i}=t.attributes;this.user={directory:e,userId:i,authUser:t}}catch(t){console.error(t)}}))}getMoreData(e){var i,s;return t(this,void 0,void 0,(function*(){let t=Object.assign({},e),r=e.data;for(;null===(s=null===(i=null==t?void 0:t.links)||void 0===i?void 0:i.next)||void 0===s?void 0:s.href;){const e=yield this.fetchAPI(t.links.next.href);r=r.concat(e.data),t=e}return Object.assign(Object.assign({},t),{data:r})}))}getSpace(e){return t(this,void 0,void 0,(function*(){return this.fetchAPI(`${this.saasURL}/api/v1/spaces/${e}`)}))}getSpaceList(){return t(this,void 0,void 0,(function*(){const t=yield this.fetchAPI(`${this.saasURL}${a}`);return(yield this.getMoreData(t)).data}))}getUserList(){return t(this,void 0,void 0,(function*(){const t=yield this.fetchAPI(`${this.saasURL}${s}`);return(yield this.getMoreData(t)).data}))}getAppList(){return t(this,void 0,void 0,(function*(){const t=yield this.fetchAPI(`${this.saasURL}${n}`);return(yield this.getMoreData(t)).data}))}getThemeList(){return t(this,void 0,void 0,(function*(){const t=yield this.fetchAPI(`${this.saasURL}${o}`);return(yield this.getMoreData(t)).data}))}getDocs(){return t(this,void 0,void 0,(function*(){return new Promise((t=>{this.qlik.getAppList((e=>{this.docList=e,t(e)}),this.config)}))}))}getList(e,i){return t(this,void 0,void 0,(function*(){return new Promise((t=>{e.getList(i,(i=>{t(i),e.destroySessionObject(i.qInfo.qId)}))}))}))}getMeasure(e){return t(this,void 0,void 0,(function*(){return(yield this.getList(e,"MeasureList")).qMeasureList.qItems}))}getVariable(e){return t(this,void 0,void 0,(function*(){return(yield this.getList(e,"VariableList")).qVariableList.qItems}))}getFields(e){return t(this,void 0,void 0,(function*(){return(yield this.getList(e,"FieldList")).qFieldList.qItems}))}getBookmark(e){return t(this,void 0,void 0,(function*(){return(yield this.getList(e,"BookmarkList")).qBookmarkList.qItems}))}evaluateExpression(e,i){return t(this,void 0,void 0,(function*(){return new Promise((t=>{var s;i&&" "!==i&&"object"==typeof i?e.createGenericObject({value:{qStringExpression:null===(s=null==i?void 0:i.qStringExpression)||void 0===s?void 0:s.qExpr}},(i=>{t(i.value),e.destroySessionObject(i.qInfo.qId)})):t(i)}))}))}objectProper(e,i){return t(this,void 0,void 0,(function*(){const t=i.properties,s={title:null,subtitle:null,footnote:null};return s.title=yield this.evaluateExpression(e,t.title),s.subtitle=yield this.evaluateExpression(e,t.subtitle),s.footnote=yield this.evaluateExpression(e,t.footnote),s}))}getQlikObjectTitles(e,i){return t(this,void 0,void 0,(function*(){const t=yield e.getObjectProperties(i);if(t.properties.qExtendsId){const i=yield e.getObjectProperties(t.properties.qExtendsId);return this.objectProper(e,i)}return this.objectProper(e,t)}))}getSheet(e){return t(this,void 0,void 0,(function*(){const i=yield this.getList(e,"sheet");return yield Promise.all(i.qAppObjectList.qItems.map((i=>t(this,void 0,void 0,(function*(){const s=yield Promise.all(i.qData.cells.map((i=>t(this,void 0,void 0,(function*(){const t=yield this.getQlikObjectTitles(e,i.name);return Object.assign(Object.assign({},i),{options:t,obj_id:i.name,id:i.name,title:t.title||t.subtitle||t.footnote||i.name})})))));return Object.assign(Object.assign({},i),{name:i.qMeta.title,id:i.qInfo.qId,obj:s})})))))}))}callObject(e,i){var s;return t(this,void 0,void 0,(function*(){if(null===(s=e.visualization)||void 0===s?void 0:s.get)return e.visualization.get(i).catch(console.error)}))}checkAppOpen(e){return t(this,void 0,void 0,(function*(){return yield e.model.waitForOpen.promise,e}))}isAppOpen(e){return t(this,void 0,void 0,(function*(){const t=this.qlik.openApp(e,this.config);return this.checkAppOpen(t)}))}getApp(e){return t(this,void 0,void 0,(function*(){if(!this.currApps.find((t=>t.app.id===e))){const t=yield this.isAppOpen(e),i=yield this.getSheet(t),s=yield this.getMeasure(t),r=yield this.getFields(t),n=yield this.getVariable(t),o=yield this.getBookmark(t);this.currApps=[{id:e,app:t,sheet:i,measure:s,fields:r,variable:n,bookmark:o},...this.currApps]}return this.currApps}))}};
