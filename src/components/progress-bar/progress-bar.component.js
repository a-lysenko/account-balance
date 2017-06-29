(function () {
    'use strict';

    angular.module('acc')
        .component('progressBar', {
            bindings: {
                progress: '<'
            },
            templateUrl: 'progress-bar/progress-bar.html',
            controller: function () {
                const ctrl = this;
                ctrl.$onChanges = function (changes) {
                    if (Object.keys(changes).includes('progress')) {
                        const progress = ctrl.progress || 0;

                        ctrl.progress = Math.min(progress, 100);
                    }
                };
            },
            controllerAs: '$ctrl'
        });
})();