(function () {
    'use strict';

    angular.module('acc')
        .component('accFooter', {
            templateUrl: 'footer/footer.html',
            bindings: {
                remove: '&?',
                save: '&',
                go: '&?',
                hideRemove: '<?',
                hideGo: '<?'
            },
            controller: 'FooterController',
            controllerAs: '$ctrl'
        });
})();
