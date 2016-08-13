'use strict';

describe('turnover service', function () {
    var turnoverService;

    beforeEach(module('acc'));
    beforeEach(inject(function (_turnoverService_) {
        turnoverService = _turnoverService_;
    }));

    describe('"createIncome"', function () {
        var mockIncomeItem1 = {source: 'source1', UAH: 12.34, USD: 56.78};
        var mockIncomeItem2 = {source: 'source2', UAH: 90.12, USD: -34.56};
        var mockIncome = [mockIncomeItem1, mockIncomeItem2];
        var mockIncomeAggregate = {
            UAH: mockIncomeItem1.UAH + mockIncomeItem2.UAH,
            USD: mockIncomeItem1.USD + mockIncomeItem2.USD
        };
        var nowDate = {};
        var incomeType = 'income';

        beforeEach(function () {
            spyOn(Date, 'now').and.returnValue(nowDate);
        });

        it('should create formatted income', function () {
            var turnoverIncome = turnoverService.createIncome(mockIncome);
            var srcData = turnoverIncome.srcData;

            expect(turnoverIncome.type).toBe(incomeType);
            expect(turnoverIncome.date).toBe(nowDate);
            expect(srcData.type).toBe(incomeType);
            expect(srcData.data).toEqual(mockIncome);
            expect(srcData.aggregate).toEqual(mockIncomeAggregate);
            expect(turnoverIncome.aggregate).toEqual(mockIncomeAggregate);
            expect(turnoverIncome.spreadByJugs).toBeNull();
            expect(turnoverIncome.balanceByJugs).toBeNull();
            expect(turnoverIncome.iterationBalanceIncrementByJugs).toBeNull();
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