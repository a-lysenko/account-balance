'use strict';

describe('storageService', function () {
    var localStorageService;
    var storageService;
    var mockStorageData = {};
    var keyJugList = 'jugList';
    var keyBalanceIncome = 'balanceIncome';
    var keyTurnover = 'turnover';

    beforeEach(module('acc'));

    beforeEach(inject(function (_storageService_, _localStorageService_) {
        localStorageService = _localStorageService_;
        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return mockStorageData[key];
        });
        spyOn(localStorageService, 'set');

        storageService = _storageService_;
    }));

    describe('"getBalanceIncome"', function () {
        it('should get balance-income data', function () {
            var balanceIncomeData = {};
            mockStorageData[keyBalanceIncome] = balanceIncomeData;

            expect(storageService.getBalanceIncome()).toBe(balanceIncomeData);
        });
    });

    describe('"getJugList"', function () {
        it('should get jug list data', function () {
            var jugList = ['jugList'];
            mockStorageData[keyJugList] = jugList;

            expect(storageService.getJugList()).toBe(jugList);
        });
    });

    describe('"setJugList"', function () {
        it('should store given jug list', function () {
            var jugList = ['jugList'];
            storageService.setJugList(jugList);

            expect(localStorageService.set).toHaveBeenCalledWith(keyJugList, jugList);
        });
    });

    describe('"getTurnover"', function () {
        it('should get turnover data', function () {
            var turnover = ['turnover'];
            mockStorageData[keyTurnover] = turnover;

            expect(storageService.getTurnover()).toBe(turnover);
        });
    });

    describe('"setTurnover"', function () {
        it('should store given turnover', function () {
            var turnover = ['turnover'];
            storageService.setTurnover(turnover);

            expect(localStorageService.set).toHaveBeenCalledWith(keyTurnover, turnover);
        });
    });

});