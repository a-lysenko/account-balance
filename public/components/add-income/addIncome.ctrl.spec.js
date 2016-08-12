'use strict';
describe('AddIncomeController', function () {
    var AddIncomeController;

    var createdTurnoverIncome;
    var mockTurnoverService;

    var emptyItemToIncome;

    beforeEach(module('acc'));
    beforeEach(inject(function ($controller) {
        emptyItemToIncome = {
            source: '',
            UAH: 0,
            USD: 0
        };

        mockTurnoverService = {
            createIncome: jasmine.createSpy('createIncome').and.callFake(function () {
                return createdTurnoverIncome;
            })
        };

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
});