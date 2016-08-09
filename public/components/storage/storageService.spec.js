'use strict';

describe('storageService', function () {
    var localStorageService;
    var storageService;
    var mockStorageData = {};
    var keyJugList = 'jugList';

    beforeEach(module('acc'));

    beforeEach(inject(function (_storageService_, _localStorageService_) {
        localStorageService = _localStorageService_;
        storageService = _storageService_;

        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return mockStorageData[key];
        });
        spyOn(localStorageService, 'set');
    }));

    describe('getBalanceIncome', function () {
        it('should give balance-income data', function () {
            var keyBalanceIncome = 'balanceIncome';
            var balanceIncomeData = {};
            mockStorageData[keyBalanceIncome] = balanceIncomeData;

            expect(storageService.getBalanceIncome()).toBe(balanceIncomeData);
        });
    });

    describe('"getJugList"', function () {
        it('should get jug list data', function () {
            var jugListData = {};
            mockStorageData[keyJugList] = jugListData;

            expect(storageService.getJugList()).toBe(jugListData);
        });
    });

    describe('"addJugToList"', function () {
        var initialJugItem = {
            name: 'initial jug item'
        };
        var jugToAdd = {
            name: 'jug to add'
        };

        it('should add given jug into stored jug list', function () {
            mockStorageData[keyJugList] = [initialJugItem];

            storageService.addJugToList(jugToAdd);

            expect(localStorageService.set).toHaveBeenCalledWith(keyJugList, [
                initialJugItem,
                jugToAdd
            ]);
        });

        it('should set jug list with given jug if jug list has NOT been stored', function () {
            mockStorageData[keyJugList] = null;

            storageService.addJugToList(jugToAdd);

            expect(localStorageService.set).toHaveBeenCalledWith(keyJugList, [
                jugToAdd
            ]);
        })
    });

});