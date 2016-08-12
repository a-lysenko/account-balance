'use strict';
describe('AddIncomeController', function () {
    var AddIncomeController;

    var createdTurnoverIncome;
    var mockTurnoverService;
    var $state;

    var emptyItemToIncome;

    beforeEach(module('acc'));
    beforeEach(inject(function ($controller, _$state_) {
        emptyItemToIncome = {
            source: '',
            UAH: 0,
            USD: 0
        };

        mockTurnoverService = {
            createIncome: jasmine.createSpy('createIncome').and.callFake(function () {
                return createdTurnoverIncome;
            }),
            addTurnoverItem: jasmine.createSpy('addTurnoverItem')
        };

        $state = _$state_;
        spyOn($state, 'go');

        AddIncomeController = $controller('AddIncomeController', {
            turnoverService: mockTurnoverService
        });
    }));

    describe('On init', function () {
        it('should prepare an empty income list', function () {
            expect(AddIncomeController.income).toEqual([]);
        });

        it('should prepare an empty item to income', function () {
            expect(AddIncomeController.itemToIncome).toEqual(emptyItemToIncome);
        });
    });

    describe('"addItemToIncome"', function () {
        var incomeItem = {
            source: 'source'
        };

        beforeEach(function () {
            AddIncomeController.income = [{}, {}];
            AddIncomeController.itemToIncome = incomeItem;

            AddIncomeController.addItemToIncome();
        });

        it('should add item into income', function () {
            expect(AddIncomeController.income[2]).toEqual(incomeItem);
        });

        it('should clear input values', function () {
            expect(AddIncomeController.itemToIncome).toEqual(emptyItemToIncome);
        });
    });

    describe('"removeItem"', function () {
        it('should remove item from income list', function () {
            var incomeItem1 = ['1'];
            var incomeToRemove = ['incomeToRemove'];
            var incomeItem3 = ['3'];
            var itemIndexToRemove = 1;

            AddIncomeController.income = [incomeItem1, incomeToRemove, incomeItem3];
            AddIncomeController.removeItem(itemIndexToRemove);

            expect(AddIncomeController.income).toEqual([incomeItem1, incomeItem3]);
        });
    });

    describe('"Save"', function () {
        var mockIncome = [];
        beforeEach(function () {
            AddIncomeController.income = mockIncome;

            AddIncomeController.saveIncome();
        });
        it('should create turnover item based on income data', function () {
            expect(mockTurnoverService.createIncome).toHaveBeenCalledWith(mockIncome);
        });

        it('should add created turnover income into stored turnover', function () {
            expect(mockTurnoverService.addTurnoverItem).toHaveBeenCalledWith(createdTurnoverIncome);
        });

        it('should redirect to main (balance-income) page', function () {
            expect($state.go).toHaveBeenCalledWith('balance-income');
        });
    });
});