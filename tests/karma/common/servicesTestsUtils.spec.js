window.servicesTestsUtils = {

    failSpec: function () {
        expect(true).toEqual(false);
    },

    getRequestArgs: function (apiService) {
        return apiService.sendRequest.calls.argsFor(0);
    },

    testSimpleApiCallFailure: function ($scope, apiService, $q, testDone, functionToCall, args, apiCallToVerify) {
        this.setSpyOnApiService(apiService, $q, false, {});
        var that = this;
        functionToCall(args).then(function () {
            expect(true).toEqual(false);
        }, function () {
            var apiServiceArgs = that.getRequestArgs(apiService);
            expect(_.endsWith(apiCallToVerify.url, apiServiceArgs[0].url)).toEqual(true);
            testDone();
        });
        $scope.$apply();
    },

    setSpyOnApiService: function (apiService, $q,  isResolved, response) {
        spyOn(apiService, 'sendRequest').and.callFake(function () {
            var deferred = $q.defer();
            if (isResolved) {
                deferred.resolve(response);
            } else {
                deferred.reject(response);
            }
            return deferred.promise;
        });
    }
};