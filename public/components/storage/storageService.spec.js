'use strict';

describe('storageService', function () {
    var localStorageService;
    var storageService;
    var mockStorageData = {};

    beforeEach(module('acc'));

    beforeEach(inject(function (_storageService_, _localStorageService_) {
        localStorageService = _localStorageService_;
        storageService = _storageService_;

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return mockStorageData[key];
        })
    }));

    describe('getBalanceIncome', function () {
        it('should give balance-income data', function () {
            var keyBalanceIncome = 'balanceIncome';
            var balanceIncomeData = {};
            mockStorageData[keyBalanceIncome] = balanceIncomeData;

            expect(storageService.getBalanceIncome()).toBe(balanceIncomeData);
        });
    });

    describe('getJugList', function () {
        it('should get jug list data', function () {
            var keyJugList = 'jugList';
            var jugListData = {};
            mockStorageData[keyJugList] = jugListData;

            expect(storageService.getJugList()).toBe(jugListData);
        });
    })

});