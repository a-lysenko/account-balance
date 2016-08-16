'use strict';

describe('JugListController', function () {
    var JugListController;
    var mockJugListService;
    var mockJugList;
    beforeEach(module('acc', function ($provide) {
        $provide.value('turnoverService', {
            testMultiple: jasmine.createSpy('testMultiple').and.callFake(function (mockV1) {
                console.log('mockV1 * 1001 =', mockV1 * 1001);
                return mockV1 * 1001;
            })

        });
    }));

    beforeEach(inject(function ($controller) {
        mockJugList = {};

        mockJugListService = {
            getJugList: function () {
                return mockJugList;
            },
            addJug: jasmine.createSpy('addJug'),
            removeJug: jasmine.createSpy('removeJug')
    };

        JugListController = $controller('JugListController', {
            jugListService: mockJugListService
        });
    }));

    describe('On init', function () {
        it('should get jug list', function () {
            expect(JugListController.jugList).toBe(mockJugList);
        });

        it('should multiple 12 x 112', function () {
            console.log(expect(JugListController.result12x112).toBe(12000));
            expect(JugListController.result12x112).toBe(12000);
        });
    });

    describe('"addJugToList"', function () {
        beforeEach(function () {
            mockJugList = ['mockJugList'];

            JugListController.jugList = undefined;
            JugListController.jugToAdd = {};
            JugListController.addJugToList();
        });

        it('should add jug with set values into stored', function () {
            expect(mockJugListService.addJug).toHaveBeenCalledWith(JugListController.jugToAdd);
        });

        it('should clear input values', function () {
            expect(JugListController.jugToAdd).toEqual({
                name: '',
                percent: 0
            });
        });

        it('should update jug list', function () {
            expect(JugListController.jugList).toBe(mockJugList);
        });
    });

    describe('"removeJugFromList"', function () {
        var jugIndex = 'jugIndex';

        beforeEach(function () {
            mockJugList = [{}];
            JugListController.jugList = undefined;
            JugListController.removeJugFromList(jugIndex);
        });

        it('should remove jug from stored', function () {
            expect(mockJugListService.removeJug).toHaveBeenCalledWith(jugIndex);
        });

        it('should update jug list', function () {
            expect(JugListController.jugList).toBe(mockJugList);
        });
    });
});