'use strict';

describe('BalanceIncomeController', function () {
    var BalanceIncomeController;
    var storageService;
    var mockBalanceIncome;
    beforeEach(module('acc'));

    beforeEach(inject(function ($controller, _storageService_) {
        mockBalanceIncome = {};

        storageService = _storageService_;
        spyOn(storageService, 'getBalanceIncome').and.returnValue(mockBalanceIncome);

        BalanceIncomeController = $controller('BalanceIncomeController');
    }));

    describe('On init', function () {
        it('should get balance income data', function () {
            expect(BalanceIncomeController.balanceIncomeData).toBe(mockBalanceIncome);
        });
    });
});