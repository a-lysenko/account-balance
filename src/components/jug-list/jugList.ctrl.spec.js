'use strict';

fdescribe('JugListController', function () {
    var JugListController;
    var mockJugListService;
    var mockJugList;
    beforeEach(module('acc'));

    beforeEach(inject(function ($controller) {
        mockJugList = ['list'];

        mockJugListService = {
            getJugList: function () {
                return mockJugList;
            }
    };

        JugListController = $controller('JugListController', {
            jugListService: mockJugListService
        });
    }));

    describe('On init', function () {
        it('should get jug list', function () {
            expect(JugListController.jugList).toBe(mockJugList);
        });
    });
});