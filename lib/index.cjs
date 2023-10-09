"use strict";var __assign=function(){return(__assign=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function __awaiter(t,s,c,u){return new(c=c||Promise)(function(n,e){function r(t){try{o(u.next(t))}catch(t){e(t)}}function i(t){try{o(u.throw(t))}catch(t){e(t)}}function o(t){var e;t.done?n(t.value):((e=t.value)instanceof c?e:new c(function(t){t(e)})).then(r,i)}o((u=u.apply(t,s||[])).next())})}function __generator(r,i){var o,s,c,u={label:0,sent:function(){if(1&c[0])throw c[1];return c[1]},trys:[],ops:[]},a={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function t(n){return function(t){var e=[n,t];if(o)throw new TypeError("Generator is already executing.");for(;u=a&&e[a=0]?0:u;)try{if(o=1,s&&(c=2&e[0]?s.return:e[0]?s.throw||((c=s.return)&&c.call(s),0):s.next)&&!(c=c.call(s,e[1])).done)return c;switch(s=0,(e=c?[2&e[0],c.value]:e)[0]){case 0:case 1:c=e;break;case 4:return u.label++,{value:e[1],done:!1};case 5:u.label++,s=e[1],e=[0];continue;case 7:e=u.ops.pop(),u.trys.pop();continue;default:if(!(c=0<(c=u.trys).length&&c[c.length-1])&&(6===e[0]||2===e[0])){u=0;continue}if(3===e[0]&&(!c||e[1]>c[0]&&e[1]<c[3]))u.label=e[1];else if(6===e[0]&&u.label<c[1])u.label=c[1],c=e;else{if(!(c&&u.label<c[2])){c[2]&&u.ops.pop(),u.trys.pop();continue}u.label=c[2],u.ops.push(e)}}e=i.call(r,u)}catch(t){e=[6,t],s=0}finally{o=c=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}}}function __spreadArray(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++)!r&&i in e||((r=r||Array.prototype.slice.call(e,0,i))[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))}var Qlik=function(){function t(t){var u=this,e=(this.currApps=[],this.getMeasure=function(t){return new Promise(function(e){u.getList(t,"MeasureList").then(function(t){e(t.qMeasureList.qItems)})})},this.getVariable=function(t){return new Promise(function(e){u.getList(t,"VariableList").then(function(t){e(t.qVariableList.qItems)})})},this.getFields=function(t){return new Promise(function(e){u.getList(t,"FieldList").then(function(t){e(t.qFieldList.qItems)})})},this.getBookmark=function(t){return new Promise(function(e){u.getList(t,"BookmarkList").then(function(t){e(t.qBookmarkList.qItems)})})},this.evaluateExpression=function(n,r){return new Promise(function(e){var t;r&&" "!==r&&"object"==typeof r?n&&n.createGenericObject({value:{qStringExpression:null==(t=null==r?void 0:r.qStringExpression)?void 0:t.qExpr}},function(t){e(t.value),n.destroySessionObject(t.qInfo.qId)}):e(r)})},this.objectProper=function(s,c){return new Promise(function(e){var t=c.properties,n=t.title,r=t.subtitle,i=t.footnote,o={title:null,subtitle:null,footnote:null};u.evaluateExpression(s,n).then(function(t){return o.title=t,u.evaluateExpression(s,r)}).then(function(t){return o.subtitle=t,u.evaluateExpression(s,i)}).then(function(t){o.footnote=t,e(o)})})},this.getQlikObjectTitles=function(r,t){return new Promise(function(n){r.getObjectProperties(t).then(function(t){var e=t.properties;e.qExtendsId?r.getObjectProperties(e.qExtendsId).then(function(t){u.objectProper(r,t).then(function(t){n(t)})}):u.objectProper(r,t).then(function(t){n(t)})})})},this.getSheet=function(s){return new Promise(function(o){u.getList(s,"sheet").then(function(t){for(var i=[],e=function(t){for(var r=[],e=0,n=t.qData.cells;e<n.length;e++)!function(n){u.getQlikObjectTitles(s,n.name).then(function(t){var e=t.title||t.subtitle||t.footnote||n.name;r.push(__assign(__assign({},n),{options:t,obj_id:n.name,id:n.name,title:e}))}),t.obj=r}(n[e]);i.push(__assign(__assign({},t),{name:t.qMeta.title,id:t.qInfo.qId}))},n=0,r=t.qAppObjectList.qItems;n<r.length;n++)e(r[n]);o(i)})})},this.callObject=function(n,r){return new Promise(function(e){var t;null!=(t=n.visualization)&&t.get&&n.visualization.get(r).then(function(t){e(t)}).catch(function(t){console.log(t)})})},this.checkAppOpen=function(n){return new Promise(function(t,e){n.model.waitForOpen.promise.then(function(){t(n)}).catch(function(t){e(t)})})},this.isAppOpen=function(n){return __awaiter(u,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return e=this.qlik.openApp(n,this.config),[4,this.checkAppOpen(e)];case 1:return t.sent(),[2,e]}})})},t.host),n=t.port,r=t.prefix,i=t.isSecure,o=t.ticket,s=t.isSaaS,s=void 0!==s&&s,c=t.webIntegrationId,c=void 0===c?"":c,r="/"!==r?r:"/",i=i?"https://":"http://",n=n?":".concat(n):"";this.config=t,this.ticket=o,this.isSaaS=s,this.webIntegrationId=c,this.baseUrl="".concat(i).concat(e).concat(n).concat(r,"resources"),this.saasURL="".concat(i).concat(e).concat(n)}return t.prototype.callRequire=function(){var s=this;return new Promise(function(e,n){try{var r,t,i,o;document.getElementById("qlik-require-file")||((r=document.createElement("script")).src=s.ticket?"".concat(s.baseUrl,"/assets/external/requirejs/require.js?").concat(s.ticket):"".concat(s.baseUrl,"/assets/external/requirejs/require.js"),r.id="qlik-require-file",document.head.appendChild(r),t=new Promise(function(t,e){r.onload=function(){return t("loaded")},r.onerror=function(t){return e(t)}}),(i=document.createElement("link")).href="".concat(s.baseUrl,"/autogenerated/qlik-styles.css"),i.type="text/css",i.rel="stylesheet",document.head.insertBefore(i,document.head.firstChild),o=new Promise(function(t,e){i.onload=function(){return t("loaded")},i.onerror=function(t){return e(t)}}),Promise.all([t,o]).then(function(t){e(t)}).catch(function(t){n(t)}))}catch(t){console.log(t),n(t)}})},t.prototype.setQlik=function(){var r=this;return new Promise(function(e,n){window.require.config({baseUrl:r.baseUrl,paths:{qlik:"".concat(r.baseUrl,"/js/qlik")},config:{text:{useXhr:function(){return!0}}},webIntegrationId:r.isSaaS?r.webIntegrationId:""}),window.require(["js/qlik"],function(t){t&&(t.setOnError(function(t){n(t)}),r.qlik=t,e(t))})})},t.prototype.fetchAPI=function(t,e,n){return void 0===e&&(e="GET"),void 0===n&&(n=null),fetch(t,{method:e,mode:"cors",credentials:"include",headers:{"Content-Type":"application/json","qlik-web-integration-id":this.webIntegrationId},body:n}).then(function(t){return 200===t.status&&t.json()})},t.prototype.setAuthUser=function(){var i=this;return new Promise(function(r){i.qlik.callRepository("/api/hub/v1/user/info").then(function(t){var t=t.data.data[0],e=t.attributes,n=e.userDirectory,e=e.userId;i.user={directory:n,userId:e,authUser:t},r(!0)}).catch(function(t){console.log(t)})})},t.prototype.getDocs=function(){var n=this;return new Promise(function(e){n.qlik.getAppList(function(t){n.docList=t,e(t)},n.config)})},t.prototype.getList=function(n,t){return new Promise(function(e){n.getList(t,function(t){e(t),n.destroySessionObject(t.qInfo.qId)})})},t.prototype.getApp=function(c){return __awaiter(this,void 0,void 0,function(){var e,n,r,i,o,s;return __generator(this,function(t){switch(t.label){case 0:return this.currApps.find(function(t){return t.app.id===c})?[3,7]:[4,this.isAppOpen(c)];case 1:return e=t.sent(),[4,this.getSheet(e)];case 2:return n=t.sent(),[4,this.getMeasure(e)];case 3:return r=t.sent(),[4,this.getFields(e)];case 4:return i=t.sent(),[4,this.getVariable(e)];case 5:return o=t.sent(),[4,this.getBookmark(e)];case 6:return s=t.sent(),this.currApps=__spreadArray([{id:c,app:e,sheet:n,measure:r,fields:i,variable:o,bookmark:s}],this.currApps,!0),[2,this.currApps];case 7:return[2]}})})},t}();module.exports=Qlik;
