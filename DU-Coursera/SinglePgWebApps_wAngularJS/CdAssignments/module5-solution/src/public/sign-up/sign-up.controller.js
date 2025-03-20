(function () {
  "use strict";

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['DataService', 'MenuDataService', 'items'];
  function SignUpController(DataService, MenuDataService, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.msg = "";

    $ctrl.submit = function(frmVals, itms) {
      var menu_items = [ 'A', 'B', 'C', 'D', 'F', 'L',
                         'CM', 'CU',
                         'DK', 'DS',
                         'FR', 'FY',
                         'NF', 'NL',
                         'PF',
                         'SO', 'SP', 'SR',
                         'V', 'VG' ];

      var favDishMenuNbr = $ctrl.favDishMenuNbr;

      var itmFound = false;

      for (var i = 0; i < menu_items.length; i++) {
        var lth = itms[menu_items[i].trim()].menu_items;

        for (var j = 0; j < lth.length; j++) {
          var zth = itms[menu_items[i].trim()].menu_items[j].short_name;

          if (zth.trim().toUpperCase().includes(favDishMenuNbr.trim().toUpperCase())) {
            itmFound = true;
            break;
          }
          else { itmFound = false; }
        }

        if (itmFound) break;
      }

      if (itmFound) {
        DataService.setData(frmVals);

        $ctrl.infoSaved = "Your information has been saved.";
        $ctrl.msg = "";
        $ctrl.completed = true;
      }
      else {
        $ctrl.infoSaved = "";
        $ctrl.msg = "No such menu number exists.";    
      }
    }
  }
})();
