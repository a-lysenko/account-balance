(function () {
    'use strict';

    angular.module('acc')
        .component('accFooter', {
            templateUrl: 'footer/footer.html',
            bindings: {
                save: '&?',
                add: '&?'
            },
            controller: 'FooterController',
            controllerAs: '$ctrl'
        });
})();
