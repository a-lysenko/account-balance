'use strict';
describe('SetBalanceController', function () {
    var SetBalanceController;

    var createdTurnoverExpense;
    var mockTurnoverService;
    var $state;

    var emptyItemToBalance;

    beforeEach(module('acc'));
    beforeEach(inject(function ($controller, _$state_) {
        emptyItemToBalance = {
            source: '',
            UAH: 0
        };

        mockTurnoverService = {
            Expense: jasmine.createSpy('Expense').and.callFake(function () {
                return createdTurnoverExpense;
            }),
            addTurnoverItem: jasmine.createSpy('addTurnoverItem')
        };

        $state = _$state_;
        spyOn($state, 'go');

        SetBalanceController = $controller('SetBalanceController', {
            turnoverService: mockTurnoverService
        });
    }));

    describe('On init', function () {
        it('should prepare an empty balance list', function () {
            expect(SetBalanceController.balance).toEqual([]);
        });

        it('should prepare an empty item to balance', function () {
            expect(SetBalanceController.itemToBalance).toEqual(emptyItemToBalance);
        });
    });

    describe('"addItemToBalance"', function () {
        var balanceItem = {
            source: 'source'
        };

        beforeEach(function () {
            SetBalanceController.balance = [{}, {}];
            SetBalanceController.itemToBalance = balanceItem;

            SetBalanceController.addItemToBalance();
        });

        it('should add item into income', function () {
            expect(SetBalanceController.balance[2]).toEqual(balanceItem);
        });

        it('should clear input values', function () {
            expect(SetBalanceController.itemToBalance).toEqual(emptyItemToBalance);
        });
    });

    describe('"removeItem"', function () {
        it('should remove item from balance list', function () {
            var balanceItem1 = ['1'];
            var balanceToRemove = ['balanceToRemove'];
            var balanceItem3 = ['3'];
            var itemIndexToRemove = 1;

            SetBalanceController.balance = [balanceItem1, balanceToRemove, balanceItem3];
            SetBalanceController.removeItem(itemIndexToRemove);

            expect(SetBalanceController.balance).toEqual([balanceItem1, balanceItem3]);
        });
    });

    describe('"saveExpense"', function () {
        var mockBalance = [];
        beforeEach(function () {
            SetBalanceController.balance = mockBalance;
            createdTurnoverExpense = {
                type: 'type'
            };

            SetBalanceController.saveExpense();
        });
        it('should create expense - turnover item - based on income data', function () {
            expect(mockTurnoverService.Expense).toHaveBeenCalledWith(mockBalance);
        });

        it('should add created turnover expense into stored turnover', function () {
            expect(mockTurnoverService.addTurnoverItem).toHaveBeenCalledWith(createdTurnoverExpense);
        });

        it('should redirect to main (turnover) page', function () {
            expect($state.go).toHaveBeenCalledWith('turnover');
        });
    });
});