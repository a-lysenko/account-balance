'use strict';
describe('AddIncomeController', function () {
    var AddIncomeController;

    beforeEach(module('acc'));
    beforeEach(inject(function ($controller) {

        AddIncomeController = $controller('AddIncomeController');
    }));

    describe('On init', function () {
        it('should prepare an empty income list', function () {
            expect(AddIncomeController.income).toEqual([]);
        });
    });
});