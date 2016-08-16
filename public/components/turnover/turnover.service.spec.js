'use strict';

describe('turnover service', function () {
    var turnoverService;

    var mockStoredTurnover;
    var storageService;

    beforeEach(module('acc'));
    beforeEach(inject(function (_turnoverService_, _storageService_) {
        turnoverService = _turnoverService_;

        storageService = _storageService_;
        storageService.getTurnover = jasmine.createSpy('getTurnover').and.callFake(function () {
            return mockStoredTurnover;
        });
        storageService.setTurnover = jasmine.createSpy('setTurnover');

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
        var storedTurnoverItem = 'storedTurnoverItem';
        var turnoverItem = {};
        beforeEach(function () {
            mockStoredTurnover = [storedTurnoverItem];

            turnoverService.addTurnoverItem(turnoverItem);
        });

        it('should test testMultiple - turnoverService.testMultiple(1, 17)', function () {
            console.log('turnoverService.testMultiple(1, 17)');
            expect(turnoverService.testMultiple(1, 17)).toBe(109);
        });

        it('should get stored turnover', function () {
            expect(storageService.getTurnover).toHaveBeenCalled();
        });

        it('should add given turnover item into stored turnover', function () {
            expect(storageService.setTurnover).toHaveBeenCalledWith([storedTurnoverItem, turnoverItem]);
        });

        it('should set turnover with given turnover item if turnover has NOT been stored', function () {
            mockStoredTurnover = undefined;
            turnoverService.addTurnoverItem(turnoverItem);

            expect(storageService.setTurnover).toHaveBeenCalledWith([storedTurnoverItem, turnoverItem]);
        });
    });
});