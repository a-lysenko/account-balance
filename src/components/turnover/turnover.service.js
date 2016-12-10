(function () {
    'use strict';

    angular.module('acc')
        .factory('turnoverService', turnoverService);

    function turnoverService(storageService) {
        // TODO - remove turnover types and srcData types into ng-const
        var turnoverTypes = {
            income: 'income',
            expense: 'expense'
        };
        var srcDataTypes = {
            income: 'income',
            balance: 'balance'
        };

        return {
            addTurnoverItem: addTurnoverItem,
            Income: Income
        };

        function addTurnoverItem(turnoverItem) {
            var turnover = storageService.getTurnover();
            if (!Array.isArray(turnover)) {
                turnover = [];
            }
            turnover.push(turnoverItem);

            storageService.setTurnover(turnover);
        }

        function Income(src) {
            TurnoverItem.call(this, src);

            this.type = turnoverTypes.income;
            this.srcData.type = srcDataTypes.income;
            this.aggregate = angular.copy(this.srcData.aggregate);
        }

        function Expense(src) {
            TurnoverItem.call(this, src);

            this.type = turnoverTypes.expense;
            this.srcData.type = srcDataTypes.balance;
        }

        function TurnoverItem(src) {
            this.type = null;
            this.date = Date.now();
            this.srcData = {
                type: null,
                data: angular.copy(src),
                aggregate: totalCurrencyList(src)
            };
            this.aggregate = null;
            this.spreadByJugs = null;
            this.balanceByJugs = null;
            this.iterationBalanceIncrementByJugs = null;
        }

        function totalCurrencyList(list) {
            var accumulated = {
                USD: 0,
                UAH: 0
            };
            return list.reduce(function (acc, srcItem) {
                acc.UAH += srcItem.UAH;
                acc.USD += srcItem.USD;

                return acc;
            }, accumulated);
        }
    }
})();