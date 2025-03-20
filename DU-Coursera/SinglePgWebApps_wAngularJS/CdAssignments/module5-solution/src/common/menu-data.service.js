(function () {
  "use strict";

  angular.module('common')
  .service('MenuDataService', MenuDataService)
  .service('DataService', DataService)
  .service('ShortNameMenuNumberService', ShortNameMenuNumberService)
  .service('CharNumService', CharNumService)
  .constant('MenuItemsApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items");

  MenuDataService.$inject = ['$http', 'ShortNameMenuNumberService', 'MenuItemsApiBasePath'];
  function MenuDataService($http, ShortNameMenuNumberService, MenuItemsApiBasePath) {
    var service = this;

    service.getAllMenuItems = function() {
      return $http({
          method: "GET",
          url: (MenuItemsApiBasePath + ".json")
      })
      .then(function(menuItmsResults) {
        var menuItems = [];
        menuItems = menuItmsResults.data;
        return menuItems;
      })
      .catch(function(error) { console.log("Error : " + error + " !"); });
    };

    service.getUserSpecifiedMenuItem = function(data) {
      var result = ShortNameMenuNumberService.result(data);
      var shortNm = result[0];
      var menuNbr = result[1];

      if ((Number(menuNbr) - 1) === 0) menuNbr = "0";
      else menuNbr = (Number(menuNbr) - 1).toString();

      return $http({
          method: "GET",
          url: (MenuItemsApiBasePath + "/" + shortNm + "/menu_items/" + menuNbr + ".json")
      })
      .then(function(menuItemResult) {
        var item = {
          description: menuItemResult.data.description,
          name: menuItemResult.data.name,
          price_large: menuItemResult.data.price_large,
          short_name: menuItemResult.data.short_name
        }

        return item;
      })
      .catch(function(error) { console.log("Error : " + error + " !"); });
    }
  }

  ShortNameMenuNumberService.$inject = ['CharNumService'];
  function ShortNameMenuNumberService(CharNumService) {
    var shortNm = "";
    var menuNbr = "";

    this.result = function(data) {
      var shortNmSubstrFirstNo = 0;
      var shortNmSubstrSecondNo = 0;

      var menuNbrSubstrFirstNo = 0;
      var menuNbrSubstrSecondNo = 0;

      if (data.FavoriteDishMenuNumber.split("").length == 2) {
        for (var i = 0; i < data.FavoriteDishMenuNumber.split("").length; i++) {
          var value = data.FavoriteDishMenuNumber.split("")[i];
          value = CharNumService.check(value);

          if (!angular.isNumber(value)) {
            shortNmSubstrSecondNo++;
          }

          if (angular.isNumber(value)) {
            menuNbrSubstrFirstNo = shortNmSubstrSecondNo + 1;
            menuNbrSubstrSecondNo++;
          }
        }

        shortNm = data.FavoriteDishMenuNumber.substring(shortNmSubstrFirstNo, shortNmSubstrSecondNo).toUpperCase();
        menuNbr = data.FavoriteDishMenuNumber.substring(menuNbrSubstrFirstNo, menuNbrSubstrSecondNo).toUpperCase();
      }
      else if (data.FavoriteDishMenuNumber.split("").length == 3) {
        for (var i = 0; i < data.FavoriteDishMenuNumber.split("").length; i++) {
          var value = data.FavoriteDishMenuNumber.split("")[i];
          value = CharNumService.check(value);

          if (!angular.isNumber(value)) {
            shortNmSubstrSecondNo++;
          }

          if (angular.isNumber(value)) {
            menuNbrSubstrFirstNo = shortNmSubstrSecondNo + 1;

            if (menuNbrSubstrFirstNo === 2) {
              menuNbrSubstrFirstNo = 3;
              menuNbrSubstrSecondNo = 1;
            }
            else if (menuNbrSubstrFirstNo === 3) {
              menuNbrSubstrSecondNo = 2;
            }
          }
        }

        shortNm = data.FavoriteDishMenuNumber.substring(shortNmSubstrFirstNo, shortNmSubstrSecondNo).toUpperCase();
        menuNbr = data.FavoriteDishMenuNumber.substring(menuNbrSubstrFirstNo, menuNbrSubstrSecondNo).toUpperCase();
      }
      else if (data.FavoriteDishMenuNumber.split("").length == 4) {
        for (var i = 0; i < data.FavoriteDishMenuNumber.split("").length; i++) {
          var value = data.FavoriteDishMenuNumber.split("")[i];
          value = CharNumService.check(value);

          if (!angular.isNumber(value)) {
            shortNmSubstrSecondNo++;
          }

          if (angular.isNumber(value)) {
            menuNbrSubstrFirstNo = shortNmSubstrSecondNo;

            if (menuNbrSubstrFirstNo === 2) {
              menuNbrSubstrSecondNo = 4;
            }

            if (menuNbrSubstrFirstNo === 3) {
              menuNbrSubstrSecondNo = 4;
            }
          }
        }

        shortNm = data.FavoriteDishMenuNumber.substring(shortNmSubstrFirstNo, shortNmSubstrSecondNo).toUpperCase();
        menuNbr = data.FavoriteDishMenuNumber.substring(menuNbrSubstrFirstNo, menuNbrSubstrSecondNo).toUpperCase();
      }

      return [shortNm, menuNbr];
    }
  }

  function CharNumService() {
    this.check = function(value) {
      switch(value.trim()) {
        case "1": value = 1; break;
        case "2": value = 2; break;
        case "3": value = 3; break;
        case "4": value = 4; break;
        case "5": value = 5; break;
        case "6": value = 6; break;
        case "7": value = 7; break;
        case "8": value = 8; break;
        case "9": value = 9; break;
        case "10": value = 10; break;
        case "11": value = 11; break;
        case "12": value = 12; break;
        case "13": value = 13; break;
        case "14": value = 14; break;
        case "15": value = 15; break;
        case "16": value = 16; break;
        case "17": value = 17; break;
        case "18": value = 18; break;
        case "19": value = 19; break;
        case "20": value = 20; break;
        case "21": value = 21; break;
        case "22": value = 22; break;
        case "23": value = 23; break;
        case "24": value = 24; break;
        case "25": value = 25; break;
        case "26": value = 26; break;
        case "27": value = 27; break;
        case "28": value = 28; break;
        case "29": value = 29; break;
        case "30": value = 30; break;
        case "31": value = 31; break;
        case "32": value = 32; break;
        case "34": value = 34; break;
        case "33": value = 33; break;
        case "35": value = 35; break;
        case "36": value = 36; break;
        case "37": value = 37; break;
        case "39": value = 39; break;
        case "38": value = 38; break;
        case "40": value = 40; break;
        case "41": value = 41; break;
        case "42": value = 42; break;
        case "43": value = 43; break;
        default: value = value; break;
      }

      return value;
    }
  }

  function DataService() {
    var data = { FirstName: '', LastName: '', Email: '', Phone: '', FavoriteDishMenuNumber: '' };
    this.setData = function(newData) { data = newData; };
    this.getData = function() { return data; };
  }
})();
