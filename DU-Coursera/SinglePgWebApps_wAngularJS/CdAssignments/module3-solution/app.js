(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

  var menu_items = [ 'A', 'B', 'C', 'D', 'F', 'L',
                     'CM', 'CU',
                     'DK', 'DS',
                     'FR', 'FY',
                     'NF', 'NL',
                     'PF',
                     'SO', 'SP', 'SR',
                     'V', 'VG' ];

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        title: '@title',
        message: '@message',
        onRemove: '&'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
      var narrowDown = this;

      narrowDown.title = "Menu Items";

      narrowDown.menuSearch = function() {
        narrowDown.message = "";

        if (isEmptyOrNull(narrowDown.term2Search)) {
          narrowDown.error = "Search Term cannot be Blank !";
          narrowDown.nothingFound = "";
          narrowDown.shown = false;
        }
        else {
          narrowDown.error = "";
          narrowDown.nothingFound = "* Nothing found !";
          narrowDown.shown = true;
        }

        var promise = MenuSearchService.getMatchedMenuItems(narrowDown.term2Search);

        promise
        .then(function(response) {
          narrowDown.found = response;

          if (narrowDown.found.length !== 0) narrowDown.message = narrowDown.found.length > 1 ? " items are shown." : " item is shown.";
          else narrowDown.message = "";
        })
        .catch(function(error) { console.log("Error : " + error + " !"); });
      };

      narrowDown.doNotWantThisOne = function(items, itemIndex, msg) {
        if (items.length !== 0) msg = items.length === 1 ? " item is shown." : " items are shown.";
        else msg = "";

        items.splice(itemIndex, 1);
      }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      // process result & only keep items that match
      var foundItems = [];

      return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
      })
      .then(function(menuItems) {
          /* Loop through all retrieved menu items to pick out the ones
              whose description matches the searchTerm */
          for (var i = 0; i < menu_items.length; i++) {
            var menuItmsVals = menuItems.data[menu_items[i]].menu_items;

            for (var j = 0; j < menuItmsVals.length; j++) {
              if (!(searchTerm.trim() === "")
                  && menuItmsVals[j].description.trim().toUpperCase().includes(searchTerm.trim().toUpperCase())) {
                var item = {
                  name: menuItmsVals[j].name,
                  short_name: menuItmsVals[j].short_name,
                  description: menuItmsVals[j].description
                };

                foundItems.push(item);
              }
            }
          }

          // return processed items
          return foundItems;
      })
      .catch(function(error) { console.log("Error : " + error + " !"); });
    }
  }

  function isEmptyOrNull(value) {
    if (value === null || value === undefined) { return true; }
    if (typeof value === 'string' && value.trim() === '') { return true; }
    if (Array.isArray(value) && value.length === 0) { return true; }
    if (typeof value === 'object' && Object.keys(value).length === 0) { return true; }

    return false;
  }
})();
