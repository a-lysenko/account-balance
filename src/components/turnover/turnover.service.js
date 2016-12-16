(function () {
    'use strict';

    angular.module('acc')
        .factory('turnoverService', turnoverService);

    function turnoverService(shortid, storageService) {
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
            Income: Income,
            Expense: Expense,
            getBasicTurnover: getBasicTurnover,
            isIncome: isIncome,
            isExpense: isExpense
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

            this.turnover = angular.copy(this.srcData.aggregate);
            this.balance = calculateCurrentBalance(this.turnover);
        }

        function Expense(src) {
            TurnoverItem.call(this, src);

            this.type = turnoverTypes.expense;
            this.srcData.type = srcDataTypes.balance;

            this.balance = angular.copy(this.srcData.aggregate);
            this.turnover = calculateTurnoverByBalance(this.balance);
        }

        function TurnoverItem(src) {
            this.id = shortid.gen();
            this.type = null;
            this.date = Date.now();
            this.srcData = {
                type: null,
                data: angular.copy(src),
                aggregate: totalCurrencyList(src)
            };
            this.turnover = null;
            this.balance = null;
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

        function calculateCurrentBalance(turnover) {
            var prevBalance = {
                USD: 0,
                UAH: 0
            };
            var latestTurnoverItem = storageService.getLatestTurnoverItem();
            if (latestTurnoverItem) {
                prevBalance = latestTurnoverItem.balance;
            }

            return {
                USD: prevBalance.USD + turnover.USD,
                UAH: prevBalance.UAH + turnover.UAH
            }
        }

        function calculateTurnoverByBalance(currentBalance) {
            var prevBalance = {
                USD: 0,
                UAH: 0
            };
            var latestTurnoverItem = storageService.getLatestTurnoverItem();
            if (latestTurnoverItem) {
                prevBalance = latestTurnoverItem.balance;
            }

            return {
                USD: currentBalance.USD - prevBalance.USD,
                UAH: currentBalance.UAH - prevBalance.UAH
            }
        }

        function getBasicTurnover() {
            var basicKeys = [
                'type',
                'date',
                'turnover',
                'balance'
            ];
            var turnover = storageService.getTurnover();

            if (!turnover) {
                turnover = [];
            }

            return turnover.reduce(function (basicTurnover, turnoverItem) {
                var basicTurnoverItem = {};
                basicKeys.forEach(function (basicKey) {
                    basicTurnoverItem[basicKey] = turnoverItem[basicKey];
                    return basicTurnoverItem;
                });

                basicTurnover.push(basicTurnoverItem);
                return basicTurnover;
            }, []);
        }

        function isIncome(turnoverItem) {
            return turnoverItem.type === turnoverTypes.income;
        }

        function isExpense(turnoverItem) {
            return turnoverItem.type === turnoverTypes.expense;
        }
    }
})();