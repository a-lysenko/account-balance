'use strict';
describe('AddIncomeController', function () {
    var AddIncomeController;
    var emptyItemToIncome;

    beforeEach(module('acc'));
    beforeEach(inject(function ($controller) {
        emptyItemToIncome = {
            source: '',
            UAH: 0,
            USD: 0
        };

        AddIncomeController = $controller('AddIncomeController');
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
});