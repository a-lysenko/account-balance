'use strict';

describe('TurnoverController', function () {
    var TurnoverController;
    var turnoverService;
    var mockBasicTurnover;
    beforeEach(module('acc'));

    beforeEach(inject(function ($controller, _turnoverService_) {
        mockBasicTurnover = {};

        turnoverService = _turnoverService_;
        spyOn(turnoverService, 'getBasicTurnover').and.returnValue(mockBasicTurnover);

        TurnoverController = $controller('TurnoverController');
    }));

    describe('On init', function () {
        it('should get turnover data', function () {
            expect(TurnoverController.turnoverData).toBe(mockBasicTurnover);
        });
    });
});