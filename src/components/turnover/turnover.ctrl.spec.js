'use strict';

describe('TurnoverController', function () {
    var TurnoverController;
    var storageService;
    var mockTurnover;
    beforeEach(module('acc'));

    beforeEach(inject(function ($controller, _storageService_) {
        mockTurnover = {};

        storageService = _storageService_;
        spyOn(storageService, 'getBalanceIncome').and.returnValue(mockTurnover);

        TurnoverController = $controller('TurnoverController');
    }));

    describe('On init', function () {
        it('should get balance income data', function () {
            expect(TurnoverController.turnoverData).toBe(mockTurnover);
        });
    });
});