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
            getJugList: function () {return mockJugList;}
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
});