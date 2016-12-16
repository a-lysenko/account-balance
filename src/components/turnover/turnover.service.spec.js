'use strict';

describe('turnover service', function () {
    var turnoverService;

    var mockStoredTurnover;
    var storageService;

    beforeEach(module('acc'));
    beforeEach(inject(function (_turnoverService_, _storageService_, shortid) {
        turnoverService = _turnoverService_;

        storageService = _storageService_;
        spyOn(storageService, 'getTurnover').and.callFake(function () {
            return mockStoredTurnover;
        });
        spyOn(storageService, 'setTurnover');
        spyOn(storageService, 'getLatestTurnoverItem');

        spyOn(shortid, 'gen').and.returnValue('mock-shortid');

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

        beforeEach(function () {
            spyOn(Date, 'now').and.returnValue(nowDate);
        });

        it('should create formatted income', function () {
            var turnoverIncome = new turnoverService.Income(mockIncome);
            var srcData = turnoverIncome.srcData;

            expect(turnoverIncome.id).toBe('mock-shortid');
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

        it('should set balance equal to turnover if previous balance is NOT found', function () {
            mockStoredTurnover = [];

            var turnoverIncome = new turnoverService.Income(mockIncome);
            expect(turnoverIncome.balance).toEqual(mockIncomeAggregate);
        });

        it('should set balance as sum of latest and current turnover', function () {
            var mockPrevBalance = {
                USD: 1000.01,
                UAH: 1000.02
            };
            var expectedBalance = {
                USD: mockIncomeAggregate.USD + mockPrevBalance.USD,
                UAH: mockIncomeAggregate.UAH + mockPrevBalance.UAH
            };
            storageService.getLatestTurnoverItem.and.returnValue({
                balance: mockPrevBalance
            });

            var turnoverIncome = new turnoverService.Income(mockIncome);

            // This block is a workaround (currently, at least) due to float numbers specific
            // now turnoverIncome.balance.USD has ..000001 in the end
            // Corresponded functional is not planned to be implemented
            turnoverIncome.balance.USD = +turnoverIncome.balance.USD.toFixed(2);
            turnoverIncome.balance.UAH = +turnoverIncome.balance.UAH.toFixed(2);

            expect(turnoverIncome.balance).toEqual(expectedBalance);
        });
    });

    describe('"Expense constructor"', function () {
        var mockBalanceItem1 = {source: 'source1', UAH: 12.34, USD: 56.78};
        var mockBalanceItem2 = {source: 'source2', UAH: 90.12, USD: -34.56};
        var mockBalance = [mockBalanceItem1, mockBalanceItem2];
        var mockBalanceAggregate = {
            UAH: mockBalanceItem1.UAH + mockBalanceItem2.UAH,
            USD: mockBalanceItem1.USD + mockBalanceItem2.USD
        };
        var nowDate = {};
        var turnoverTypeExpense = 'expense';
        var srcDataTypeBalance = 'balance';

        beforeEach(function () {
            spyOn(Date, 'now').and.returnValue(nowDate);
        });

        it('should create formatted income', function () {
            var turnoverIncome = new turnoverService.Expense(mockBalance);
            var srcData = turnoverIncome.srcData;

            expect(turnoverIncome.id).toBe('mock-shortid');
            expect(turnoverIncome.type).toBe(turnoverTypeExpense);
            expect(turnoverIncome.date).toBe(nowDate);
            expect(srcData.type).toBe(srcDataTypeBalance);
            expect(srcData.data).toEqual(mockBalance);
            expect(srcData.aggregate).toEqual(mockBalanceAggregate);
            expect(turnoverIncome.balance).toEqual(mockBalanceAggregate);
            expect(turnoverIncome.spreadByJugs).toBeNull();
            expect(turnoverIncome.balanceByJugs).toBeNull();
            expect(turnoverIncome.iterationBalanceIncrementByJugs).toBeNull();
        });

        it('should set turnover equal to balance if previous balance is NOT found', function () {
            mockStoredTurnover = [];

            var turnoverExpense = new turnoverService.Expense(mockBalance);
            expect(turnoverExpense.turnover).toEqual(mockBalanceAggregate);
        });

        it('should set turnover as difference between current and previous balance', function () {
            var mockPrevBalance = {
                USD: 1000.01,
                UAH: 1000.02
            };
            var expectedBalance = {
                USD: mockBalanceAggregate.USD + mockPrevBalance.USD,
                UAH: mockBalanceAggregate.UAH + mockPrevBalance.UAH
            };
            storageService.getLatestTurnoverItem.and.returnValue({
                balance: mockPrevBalance
            });

            var turnoverIncome = new turnoverService.Income(mockBalance);

            // This block is a workaround (currently, at least) due to float numbers specific
            // now turnoverIncome.balance.USD has ..000001 in the end
            // Corresponded functional is not planned to be implemented
            turnoverIncome.balance.USD = +turnoverIncome.balance.USD.toFixed(2);
            turnoverIncome.balance.UAH = +turnoverIncome.balance.UAH.toFixed(2);

            expect(turnoverIncome.balance).toEqual(expectedBalance);
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
    });

    describe('"isIncome"', function () {
        it('should confirm if turnover item is income-type', function () {
            var isIncome = turnoverService.isIncome({type: 'income'});
            expect(isIncome).toBeTruthy();
        });

        it('should reject if turnover item is NOT income-type', function () {
            var isNotIncome = turnoverService.isIncome({type: 'not-income'});
            expect(isNotIncome).toBeFalsy();
        });
    });

    describe('"isExpense"', function () {
        it('should confirm if turnover item is expense-type', function () {
            var isExpense = turnoverService.isExpense({type: 'expense'});
            expect(isExpense).toBeTruthy();
        });

        it('should reject if turnover item is NOT expense-type', function () {
            var isNotExpense = turnoverService.isExpense({type: 'not-expense'});
            expect(isNotExpense).toBeFalsy();
        });
    });
});