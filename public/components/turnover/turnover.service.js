(function () {
    'use strict';

    angular.module('acc')
        .factory('turnoverService', turnoverService);

    function turnoverService() {
        var turnoverTypes = {
            income: 'income',
            expense: 'expense'
        };
        var srcDataTypes = {
            income: 'income',
            balance: 'balance'
        };

        return {
            createIncome: createIncome
        };

        function createIncome(incomeSrc) {
            return new Income(incomeSrc);
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
                aggregate: aggregateTurnoverSrcData()
            };
            this.aggregate = null;
            this.spreadByJugs = null;
            this.balanceByJugs = null;
            this.iterationBalanceIncrementByJugs = null;

            function aggregateTurnoverSrcData() {
                var accumulated = {
                    USD: 0,
                    UAH: 0
                };
                return src.reduce(function (acc, srcItem) {
                    acc.UAH += srcItem.UAH;
                    acc.USD += srcItem.USD;

                    return acc;
                }, accumulated);
            }
        }
    }
})();