(function () {
    'use strict';

    angular.module('acc')
        .factory('headerService', headerService);

    function headerService(shortid) {
        const trashBinActions = {};

        return {
            registerTrashBinAction: registerTrashBinAction,
            unregisterTrashBinAction: unregisterTrashBinAction,
            fireTrashBinActions: fireTrashBinActions,
            hasActions: hasActions
        };

        function registerTrashBinAction(action) {
            const actionId = shortid.gen();
            trashBinActions[actionId] = action;

            return actionId;
        }

        function unregisterTrashBinAction(actionId) {
            delete trashBinActions[actionId];
        }

        function fireTrashBinActions() {
            Object.keys(trashBinActions).forEach((key) => {
                trashBinActions[key]();
            });
            console.log('fireTrashBinActions called');
        }

        function hasActions() {
            return !!Object.keys(trashBinActions).length;
        }
    }
})();