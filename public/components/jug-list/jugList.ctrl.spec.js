'use strict';

describe('JugListController', function () {
    var JugListController;
    var storageService;
    var mockStorageService;
    var mockJugList;
    beforeEach(module('acc'));

    beforeEach(inject(function ($controller) {
        mockJugList = {};

        mockStorageService = {
            getJugList: function () {return mockJugList;},
            addJugToList: jasmine.createSpy('addJugToList'),
            removeJug: jasmine.createSpy('removeJug')
    };

        JugListController = $controller('JugListController', {
            storageService: mockStorageService
        });
    }));

    describe('On init', function () {
        it('should get jug list', function () {
            expect(JugListController.jugList).toBe(mockJugList);
        });
    });

    describe('"addJug"', function () {
        var mockUpdatedJugList = [];

        beforeEach(function () {
            spyOn(mockStorageService, 'getJugList').and.returnValue(mockUpdatedJugList);

            JugListController.jugList = undefined;
            JugListController.jugToAdd = {};
            JugListController.addJug();
        });

        it('should add jug with set values into stored', function () {
            expect(mockStorageService.addJugToList).toHaveBeenCalledWith(JugListController.jugToAdd);
        });

        it('should clear input values', function () {
            expect(JugListController.jugToAdd).toEqual({
                name: '',
                percent: 0
            });
        });

        it('should update jug list', function () {
            expect(JugListController.jugList).toBe(mockUpdatedJugList);
        });
    });

    describe('"removeJugFromList"', function () {
        var mockUpdatedJugList = [];
        var jugIndex = {};

        beforeEach(function () {
            spyOn(mockStorageService, 'getJugList').and.returnValue(mockUpdatedJugList);

            JugListController.jugList = undefined;
            JugListController.removeJugFromList(jugIndex);
        });

        it('should remove jug from stored', function () {
            expect(mockStorageService.removeJug).toHaveBeenCalledWith(jugIndex);
        });

        it('should update jug list', function () {
            expect(JugListController.jugList).toBe(mockUpdatedJugList);
        });
    });
});