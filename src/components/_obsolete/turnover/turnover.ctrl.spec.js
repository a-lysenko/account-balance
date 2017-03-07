'use strict';

describe('TurnoverController', function () {
    var TurnoverController;
    var mockTypes;
    var mockTurnoverService;
    beforeEach(module('acc'));

    beforeEach(inject(function ($controller) {
        mockTypes = {
            income: 'incomeType',
            expense: 'expenseType'
        };
        var mockBasicTurnover = [
            {type: mockTypes.income},
            {type: mockTypes.expense}
        ];

        mockTurnoverService = {
            getBasicTurnover: jasmine.createSpy('getBasicTurnover')
                .and.returnValue(mockBasicTurnover),
            isIncome: function (turnoverItem) {
                return turnoverItem.type === mockTypes.income;
            },
            isExpense: function (turnoverItem) {
                return turnoverItem.type === mockTypes.expense;
            }
        };
        TurnoverController = $controller('TurnoverController', {
            turnoverService: mockTurnoverService
        });
    }));

    describe('On init', function () {
        it('should get basic turnover data', function () {
            expect(mockTurnoverService.getBasicTurnover).toHaveBeenCalled();
        });

        it('should decorate basic turnover data to displaying', function () {
            expect(TurnoverController.turnoverData).toEqual([
                {type: mockTypes.income, income: true, expense: false},
                {type: mockTypes.expense, income: false, expense: true}
            ]);
        });
    });
});