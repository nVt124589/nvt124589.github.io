(function () {
  "use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['DataService', 'ShortNameMenuNumberService', 'MenuDataService', 'item'];
  function MyInfoController(DataService, ShortNameMenuNumberService, MenuDataService, item) {
    var $ctrl = this;

    var data = DataService.getData();

    if ((data.FirstName == '')
        && (data.LastName == '')
        && (data.Email == '')
        && (data.Phone == '')
        && (data.FavoriteDishMenuNumber == '')) $ctrl.showRegisteredInfo = true;
    else $ctrl.showRegisteredInfo = false;

    $ctrl.item = item;

    $ctrl.FirstName = data.FirstName;
    $ctrl.LastName = data.LastName;
    $ctrl.Email = data.Email;
    $ctrl.Phone = data.Phone;
    $ctrl.FavoriteDishMenuNumber = data.FavoriteDishMenuNumber;

    var result = ShortNameMenuNumberService.result(data);
    var shortNm = result[0];
    var menuNbr = result[1];

    if ((Number(menuNbr) - 1) === 0) menuNbr = "";
    else menuNbr = (Number(menuNbr) - 1).toString();

    $ctrl.imgNm_wPath = "images/menu/" + shortNm + "/" + shortNm + menuNbr + ".jpg";
  }
})();
