!function(){"use strict";function t(t){t.interceptors.push("loadingHttpInterceptor")}angular.module("common",[]).constant("ApiPath","https://coursera-jhu-default-rtdb.firebaseio.com").config(t),t.$inject=["$httpProvider"]}();
