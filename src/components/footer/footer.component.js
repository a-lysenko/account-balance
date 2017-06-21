(function () {
    'use strict';

    angular.module('acc')
        .component('accFooter', {
            templateUrl: 'footer/footer.html',
            bindings: {
                save: '&?',
                add: '&?',
                go: '&?'
            },
            controller: 'FooterController',
            controllerAs: '$ctrl'
        });
})();
