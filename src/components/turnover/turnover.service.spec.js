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

    describe('"Income constructor"', function () {
        var mockIncomeItem1 = {source: 'source1', UAH: 12.34, USD: 56.78};
        var mockIncomeItem2 = {source: 'source2', UAH: 90.12, USD: -34.56};
        var mockIncome = [mockIncomeItem1, mockIncomeItem2];
        var mockIncomeAggregate = {
            UAH: mockIncomeItem1.UAH + mockIncomeItem2.UAH,
            USD: mockIncomeItem1.USD + mockIncomeItem2.USD
        };
        var nowDate = {};
        var incomeType = 'income';

        var turnoverIncome;

        beforeEach(function () {
            spyOn(Date, 'now').and.returnValue(nowDate);

            turnoverIncome = new turnoverService.Income(mockIncome);
        });

        it('should create formatted income', function () {
            var srcData = turnoverIncome.srcData;

            expect(turnoverIncome.type).toBe(incomeType);
            expect(turnoverIncome.date).toBe(nowDate);
            expect(srcData.type).toBe(incomeType);
            expect(srcData.data).toEqual(mockIncome);
            expect(srcData.aggregate).toEqual(mockIncomeAggregate);
            expect(turnoverIncome.turnover).toEqual(mockIncomeAggregate);
            expect(turnoverIncome.spreadByJugs).toBeNull();
            expect(turnoverIncome.balanceByJugs).toBeNull();
            expect(turnoverIncome.iterationBalanceIncrementByJugs).toBeNull();
        });

        xit('should set balance equal to turnover if previous balance is NOT found', function () {
            mockStoredTurnover = [];
            expect(turnoverIncome.balance).toEqual({USD: 0, UAH: 0});
        });
    });

    describe('"addTurnoverItem"', function () {
        var storedTurnoverItem = 'storedTurnoverItem';
        var turnoverItem = {turnover: 'turnover'};
        beforeEach(function () {
            mockStoredTurnover = [storedTurnoverItem];

            turnoverService.addTurnoverItem(turnoverItem);
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

            var turnoverSetData = storageService.setTurnover.calls.mostRecent().args[0];
            expect(turnoverSetData).toEqual([turnoverItem]);
        });
    });

    describe('"getBasicTurnover"', function () {
        it('should get empty collection if turnover is NOT in stored', function () {
            mockStoredTurnover = undefined;
            var basicTurnover = turnoverService.getBasicTurnover();

            expect(basicTurnover).toEqual([]);
        });

        it('should get basic turnover data from stored', function () {
            var mockStoredItem1 = {
                type: 'type1',
                date: 'date1',
                turnover: ['turnover1'],
                balance: ['balance1'],
                otherProps: ['otherProps']
            };
            var mockStoredItem2 = {
                type: 'type2',
                date: 'date2',
                turnover: ['turnover2'],
                balance: ['balance2'],
                otherProps: ['otherProps']
            };
            mockStoredTurnover = [mockStoredItem1, mockStoredItem2];

            var basicTurnover = turnoverService.getBasicTurnover();

            expect(basicTurnover.length).toBe(2);
            expect(basicTurnover[0]).toEqual({
                type: mockStoredItem1.type,
                date: mockStoredItem1.date,
                turnover: mockStoredItem1.turnover,
                balance: mockStoredItem1.balance
            });
            expect(basicTurnover[1]).toEqual({
                type: mockStoredItem2.type,
                date: mockStoredItem2.date,
                turnover: mockStoredItem2.turnover,
                balance: mockStoredItem2.balance
            });
        });
    })
});