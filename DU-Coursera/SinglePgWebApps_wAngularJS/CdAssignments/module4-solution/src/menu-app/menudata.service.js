!function(){"use strict";function t(t,e,a){var r=this;r.getAllCategories=function(){return t({method:"GET",url:e+"/categories.json"}).then(function(t){for(var e=[],a=0;a<t.data.length;a++){var r={name:t.data[a].name,short_name:t.data[a].short_name};e.push(r)}return e}).catch(function(t){console.log("Error : "+t+" !")})},r.getItemsForCategory=function(e){return t({method:"GET",url:a+"/"+e+".json"}).then(function(t){for(var e=[],a=t.data.menu_items,r=0;r<a.length;r++){var n={name:a[r].name,short_name:a[r].short_name,price_large:a[r].price_large,description:a[r].description};e.push(n)}return e}).catch(function(t){console.log("Error : "+t+" !")})}}angular.module("data").service("MenuDataService",t).constant("CategoriesApiBasePath","https://coursera-jhu-default-rtdb.firebaseio.com").constant("Items4CategoryApiBasePath","https://coursera-jhu-default-rtdb.firebaseio.com/menu_items"),t.$inject=["$http","CategoriesApiBasePath","Items4CategoryApiBasePath"]}();
