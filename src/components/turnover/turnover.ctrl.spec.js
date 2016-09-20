'use strict';

describe('TurnoverController', function () {
    var TurnoverController;
    var storageService;
    var mockBalanceIncome;
    beforeEach(module('acc'));

    beforeEach(inject(function ($controller, _storageService_) {
        mockBalanceIncome = {};

        storageService = _storageService_;
        spyOn(storageService, 'getBalanceIncome').and.returnValue(mockBalanceIncome);

        TurnoverController = $controller('TurnoverController');
    }));

    describe('On init', function () {
        it('should get balance income data', function () {
            expect(TurnoverController.balanceIncomeData).toBe(mockBalanceIncome);
        });
    });
});