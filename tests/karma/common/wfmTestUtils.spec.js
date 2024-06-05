window.wfmTestUtils = {
    /**
     * Spy on an angular service to mock out a service call.  To use
     *
     * skillsServiceSpy = window.wfmTestUtils.spyOnAngularService($injector.get('SkillsService'), 'getSkills', {
     *       'data': [
     *           {'id': '1', 'name': 'English-phone'},
     *           {'id': '2', 'name': 'Hebrew-phone'},
     *           {'id': '3', 'name': 'Swahili-phone'},
     *           {'id': '4', 'name': 'Tech support internet'}
     *       ]
     *   });
     */
    spyOnAngularServiceWithPromise: function (service, methodName, result) {
        return spyOn(service, methodName).and.callFake(function () {
            return {
                then: function (callback) {
                    return callback(result);
                }
            };
        });
    },

    spyOnAngularServiceErrorWithPromise: function (service, methodName, result) {
        return spyOn(service, methodName).and.callFake(function () {
            return {
                then: function (callback, callbackError) {
                    return callbackError(result);
                }
            };
        });
    },

    setupGlobalAppConfig: function() {
        window.niceSaasWfm = {
            appConfiguration: {
                'apiServerBaseUrl': 'http://localhost:8081',
                'assetsServerBaseUrl': '/assets/1.0.0',
                'default-ux-lang': 'en-us'
            }
        };
    },

    spyOnModulesService: function() {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/navigation_data/modules/allModulesAndLinks').respond({});
        }));
    },

    spyOnPublicToggle: function() {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/authentication/v1/feature-toggle?username=&featurename=public-UH-login-auth2na1-IC-59574').respond({success : true});
        }));
    },
    spyOnAuthenticationUser: function() {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/authentication/v1/users?filter=userId%20eq%20\'\'').respond({users : [{passwordlastModifiedOn: 1322323445476, passwordExpiryInterval: 30}]});
        }));
    },
    setupFeatures: function(features) {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/config/toggledFeatures').respond(features || {});
        }));
    },

    setupLicences: function(licenses) {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/tenants/current/license').respond(licenses || {});
        }));
    },

    setupOrgTenantCurrent: function(tenantData) {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET('/tenants/current').respond(tenantData || {});
        }));
    },

    setupBaseUrls: function(baseUrls) {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/tenants/current').respond(baseUrls || {});
        }));
    },

    setupTranslations: function(moduleName, translations) {
        beforeEach(angular.mock.module(moduleName, function($provide, $translateProvider) {
            $translateProvider.translations('en_US', translations);
            $translateProvider.preferredLanguage('en_US');
            $provide.service('clientPlatformWrapperService', function() {
            });
        }));
    },

    setupDateFormats: function(licenses) {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/date_time_formats/dateTimeFormats/dateTimeFormats.json').respond(licenses || {});
        }));
    },
    setupLocalization: function() {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/platform-cxone-translations/languagesMap.json').respond({
                'localesMap': {
                },
                'languagesFeatureToggles': {
                }});
        }));
    },
    setupSVGs: function(svgs) {
        beforeEach(inject(function($httpBackend) {
            $httpBackend.whenGET(window.niceSaasWfm.appConfiguration.apiServerBaseUrl + '/common_svg_icons/svg/iconsData.json')
                .respond(svgs || {});
        }));
    },
    testSetup: function(config) {
        var moduleName = config && config.moduleName || 'nice.saas.wfm',
            translations = config && config.translations || {},
            features = config && config.features || {},
            licenses = config && config.licenses || {},
            baseUrl = config && config.urls || {niceBaseUrl : 'baseUrl'},
            tenantData = config && config.tenantData || {tenant : {}};

        this.setupGlobalAppConfig();
        this.setupTranslations(moduleName, translations);
        this.setupFeatures(features);
        this.setupLicences(licenses);
        this.setupBaseUrls(baseUrl);
        this.spyOnModulesService();
        this.spyOnPublicToggle();
        this.setupDateFormats();
        this.setupLocalization();
        this.setupSVGs();
        this.spyOnAuthenticationUser();
        this.setupOrgTenantCurrent(tenantData);
    },

    randomString: function(length, characterOverride) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        if (characterOverride) {
            possible = characterOverride;
        }

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    randomEmail: function(length){
        return this.randomString(length) + '@' + this.randomString(length) + '.' + this.randomString(3);
    },

    password: 'Pa$$w0rd'
};
