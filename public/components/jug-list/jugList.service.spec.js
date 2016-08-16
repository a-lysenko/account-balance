'use strict';

describe('jugListService', function () {
    var jugListService;
    var storageService;
    var mockJugList;

    beforeEach(module('acc', function ($provide) {
        $provide.value('turnoverService', {
            testMultiple: jasmine.createSpy('testMultiple').and.callFake(function (mockV1) {
                console.log('mockV1 * 100 =', mockV1 * 100);
                return mockV1 * 100;
            })

        });
    }));

    beforeEach(inject(function (_jugListService_, _storageService_) {
        storageService = _storageService_;

        spyOn(storageService, 'getJugList').and.callFake(function () {
            return mockJugList;
        });
        spyOn(storageService, 'setJugList');


        jugListService = _jugListService_;
    }));

    describe('"getJugList"', function () {
        it('should get jug list data', function () {
            var jugListData = {jugListData: 'jugListData'};
            mockJugList = jugListData;

            expect(jugListService.getJugList()).toBe(jugListData);
        });
    });

    describe('"addJug"', function () {
        var initialJugItem = {
            name: 'initial jug item'
        };
        var jugToAdd = {
            name: 'jug to add'
        };

        it('should add given jug into stored jug list', function () {
            mockJugList = [initialJugItem];
            jugListService.addJug(jugToAdd);

            expect(storageService.setJugList).toHaveBeenCalledWith([
                initialJugItem,
                jugToAdd
            ]);
        });

        it('should set jug list with given jug if jug list has NOT been stored', function () {
            mockJugList = null;
            jugListService.addJug(jugToAdd);

            expect(storageService.setJugList).toHaveBeenCalledWith([
                jugToAdd
            ]);
        })
    });

    describe('"removeJug"', function () {
        var jugIndexToRemove = 1;
        var jugItem1 = {jugItem1: 'jugItem1'};
        var jugToBeRemoved = {jugItem2: 'jugItem2'};
        var jugItem3 = {jugItem3: 'jugItem3'};

        beforeEach(function () {
            mockJugList = [jugItem1, jugToBeRemoved, jugItem3];

            jugListService.removeJug(jugIndexToRemove);
        });

        it('should set jug list without removed jug by given index', function () {
            expect(storageService.setJugList).toHaveBeenCalledWith([
                jugItem1,
                jugItem3
            ]);
        });
    });

});