'use strict';

describe('turnover service', function () {
    var turnoverService;

    beforeEach(module('acc'));
    beforeEach(inject(function (_turnoverService_) {
        turnoverService = _turnoverService_;
    }));

    describe('"createIncome"', function () {
        var mockIncome = {};
        var expectedTurnoverIncome = {
            type: 'income'
        };

        it('should create formatted income', function () {
            var turnoverIncome = turnoverService.createIncome(mockIncome);

            expect(turnoverIncome).toEqual(expectedTurnoverIncome);
        });
    });

    describe('"addTurnoverItem"', function () {
        it('should get stored turnover', function () {

        });

        it('should add give turnover item into stored turnover', function () {
            
        });

        it('should set turnover with given turnover item if turnover has NOT been stored', function () {
            
        });
    });
});