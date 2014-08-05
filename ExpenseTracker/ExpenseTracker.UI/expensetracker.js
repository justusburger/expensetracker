angular.module('ExpenseTracker.Services', []);
angular.module('ExpenseTracker.Filters', []);
angular.module('ExpenseTracker.Controllers', []);
angular.module('ExpenseTracker.Directives', []);
angular.module('ExpenseTracker', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap', 'ngTagsInput', 'ExpenseTracker.Services', 'ExpenseTracker.Controllers', 'ExpenseTracker.Directives', 'ExpenseTracker.Filters']).config([
    '$routeProvider',
    function (routeProvider) {
        routeProvider.when('/registration', { controller: ExpenseTracker.Controllers.Registration.Name, templateUrl: 'ExpenseTracker/Views/Registration.html' }).when('/registration-complete', { controller: ExpenseTracker.Controllers.RegistrationComplete.Name, templateUrl: 'ExpenseTracker/Views/RegistrationComplete.html' }).when('/verify/:verificationToken', { controller: ExpenseTracker.Controllers.EmailVerification.Name, templateUrl: 'ExpenseTracker/Views/EmailVerification.html' }).when('/sign-in/:expired?', { controller: ExpenseTracker.Controllers.SignIn.Name, templateUrl: 'ExpenseTracker/Views/SignIn.html' }).when('/reset-password/:resetToken?', { controller: ExpenseTracker.Controllers.ResetPassword.Name, templateUrl: 'ExpenseTracker/Views/ResetPassword.html' }).when('/expenses/add', { controller: ExpenseTracker.Controllers.ExpenseDetails.Name, templateUrl: 'ExpenseTracker/Views/ExpenseDetails.html' }).when('/expenses/edit/:id', { controller: ExpenseTracker.Controllers.ExpenseDetails.Name, templateUrl: 'ExpenseTracker/Views/ExpenseDetails.html' }).when('/expenses/:welcome?', { controller: ExpenseTracker.Controllers.ExpenseList.Name, templateUrl: 'ExpenseTracker/Views/ExpenseList.html' }).when('/profile/:welcome?', { controller: ExpenseTracker.Controllers.Profile.Name, templateUrl: 'ExpenseTracker/Views/Profile.html' }).otherwise({ controller: ExpenseTracker.Controllers.Home.Name, templateUrl: 'ExpenseTracker/Views/Home.html' });
    }
]).constant('RECAPTCHA_PUBLIC_KEY', '6Lcc0fcSAAAAAK0jnYTPHjO7OrKZFEPFGV36Coqn').constant('API_BASE_PATH', '/api').constant('API_BASE_PATH_TEST', 'http://dev.expensetracker.com/api');

angular.element(document).ready(function () {
    var body = angular.element('html');
    angular.bootstrap(body, ['ExpenseTracker']);

    var injectorService = body.injector();
    var cacheService = injectorService.get(ExpenseTracker.Services.Cache.Name);

    if (cacheService.sessionToken) {
        var userApiResourceService = injectorService.get(ExpenseTracker.Services.ApiResource.UserApiResourceService.Name);
        userApiResourceService.get().then(function (user) {
            cacheService.profile = user;
            cacheService.initializedDefer.resolve();
        }, function () {
            cacheService.sessionToken = '';
            cacheService.initializedDefer.resolve();
        });
    } else
        cacheService.initializedDefer.resolve();
});
var ExpenseTracker;
(function (ExpenseTracker) {
    var Errors = (function () {
        function Errors() {
        }
        Errors.REGISTRATION_EMAIL_ALREADY_REGISTERED = 2;
        Errors.SIGN_IN_ACCOUNT_LOCKED = 3;
        Errors.SIGN_IN_INCORRECT_DETAILS = 4;
        Errors.SIGN_IN_EMAIL_NOT_VERIFIED = 6;
        Errors.UNAUTHENTICATED = 5;
        Errors.EMAIL_VERIFICATION_TOKEN_NOT_FOUND = 7;
        Errors.RESET_PASSWORD_INVALID_TOKEN = 10;
        return Errors;
    })();
    ExpenseTracker.Errors = Errors;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    var Component = (function () {
        function Component() {
            var _this = this;
            this._loadingStack = [];
            this.cacheService.initializedDefer.promise.then(function () {
                return _this.initialize();
            });
        }
        Object.defineProperty(Component.prototype, "apiBaseUrl", {
            get: function () {
                return this.injectorService.get('API_BASE_PATH');
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "injectorService", {
            get: function () {
                if (!this._injectorService)
                    this._injectorService = angular.element('html').injector();
                return this._injectorService;
            },
            set: function (value) {
                this._injectorService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "expenseApiResourceService", {
            get: function () {
                return this._expenseApiResourceService || (this._expenseApiResourceService = this.injectorService.get(ExpenseTracker.Services.ApiResource.ExpenseApiResourceService.Name));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "expenseService", {
            set: function (value) {
                this._expenseApiResourceService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "userApiResourceService", {
            get: function () {
                return this._userApiResourceService || (this._expenseApiResourceService = this.injectorService.get(ExpenseTracker.Services.ApiResource.UserApiResourceService.Name));
            },
            set: function (value) {
                this._userApiResourceService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "popupService", {
            get: function () {
                return this._popupService || (this._popupService = this.injectorService.get(ExpenseTracker.Services.Popup.Name));
            },
            set: function (value) {
                this._popupService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "downloadHelperService", {
            get: function () {
                return this._downloadHelperService || (this._downloadHelperService = this.injectorService.get(ExpenseTracker.Services.DownloadHelper.Name));
            },
            set: function (value) {
                this._downloadHelperService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "promiseService", {
            get: function () {
                return this._promiseService || (this._promiseService = this.injectorService.get('$q'));
            },
            set: function (value) {
                this._promiseService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "compileService", {
            get: function () {
                return this._compileService || (this._compileService = this.injectorService.get('$compile'));
            },
            set: function (value) {
                this._compileService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "httpService", {
            get: function () {
                return this._httpService || (this._httpService = this.injectorService.get('$http'));
            },
            set: function (value) {
                this._httpService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "resourceService", {
            get: function () {
                return this._resourceService || (this._resourceService = this.injectorService.get('$resource'));
            },
            set: function (value) {
                this._resourceService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "timeoutService", {
            get: function () {
                return this._timeoutService || (this._timeoutService = this.injectorService.get('$timeout'));
            },
            set: function (value) {
                this._timeoutService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "locationService", {
            get: function () {
                return this._locationService || (this._locationService = this.injectorService.get('$location'));
            },
            set: function (value) {
                this._locationService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "sceService", {
            get: function () {
                return this._sceService || (this._sceService = this.injectorService.get('$sce'));
            },
            set: function (value) {
                this._sceService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "interpolateService", {
            get: function () {
                return this._interpolateService || (this._interpolateService = this.injectorService.get('$interpolate'));
            },
            set: function (value) {
                this._interpolateService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "routeParamsService", {
            get: function () {
                return this._routeParamsService || (this._routeParamsService = this.injectorService.get('$routeParams'));
            },
            set: function (value) {
                this._routeParamsService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "filterService", {
            get: function () {
                return this._filterService || (this._filterService = this.injectorService.get('$filter'));
            },
            set: function (value) {
                this._filterService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "alertService", {
            get: function () {
                return this._alertService || (this._alertService = this.injectorService.get(ExpenseTracker.Services.Alert.Name));
            },
            set: function (value) {
                this._alertService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "cacheService", {
            get: function () {
                return this._cacheService || (this._cacheService = this.injectorService.get(ExpenseTracker.Services.Cache.Name));
            },
            set: function (value) {
                this._cacheService = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "dataProviderFactory", {
            get: function () {
                return this._dataProviderFactory || (this._dataProviderFactory = this.injectorService.get(ExpenseTracker.Services.DataProviderFactory.Name));
            },
            set: function (value) {
                this._dataProviderFactory = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Component.prototype, "isSignedIn", {
            get: function () {
                return !!this.cacheService.profile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "profile", {
            get: function () {
                return this.cacheService.profile;
            },
            enumerable: true,
            configurable: true
        });

        Component.prototype.isLoading = function (type) {
            return this._loadingStack.any(function (item) {
                return item === (type || true);
            });
        };
        Component.prototype.beginUpdate = function (type) {
            this._loadingStack.push(type || true);
        };
        Component.prototype.endUpdate = function (type) {
            var itemToRemove;
            this._loadingStack.forEach(function (item) {
                if (item === (type || true) && !itemToRemove)
                    itemToRemove = item;
            });
            this._loadingStack.remove(itemToRemove);
        };

        Object.defineProperty(Component.prototype, "isSecured", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });

        Component.prototype.initialize = function () {
            return this.promiseService.when(true);
        };
        return Component;
    })();
    ExpenseTracker.Component = Component;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    var ArgumentException = (function () {
        function ArgumentException(argument, message) {
            this.argument = argument;
            this.message = message;
        }
        ArgumentException.prototype.toString = function () {
            return 'Argument exception: ' + this.argument + '. ' + this.message;
        };
        return ArgumentException;
    })();
    ExpenseTracker.ArgumentException = ArgumentException;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    var NotImplementedException = (function () {
        function NotImplementedException(message) {
            this.message = message;
        }
        NotImplementedException.prototype.toString = function () {
            return 'Not implemented exception: ' + this.message;
        };
        return NotImplementedException;
    })();
    ExpenseTracker.NotImplementedException = NotImplementedException;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Extensions) {
        var ArrayExtensions = (function () {
            function ArrayExtensions() {
            }
            ArrayExtensions.remove = function (element) {
                var self = this;
                var index = self.indexOf(element);
                self.splice(index, 1);
                return self;
            };

            ArrayExtensions.any = function (selector) {
                var self = this;
                return Enumerable.From(self).Any(selector);
            };

            ArrayExtensions.select = function (selector) {
                var self = this;
                return Enumerable.From(self).Select(selector).ToArray();
            };

            ArrayExtensions.first = function () {
                var self = this;
                return self[0];
            };

            ArrayExtensions.last = function () {
                var self = this;
                return self[self.length - 1];
            };

            ArrayExtensions.pushRange = function (range) {
                var self = this;
                if (!Enumerable.From(range).Any())
                    return self;

                range.forEach(function (value) {
                    return self.push(value);
                });

                return self;
            };

            ArrayExtensions.contains = function (item) {
                var self = this;
                return self.indexOf(item) > -1;
            };
            return ArrayExtensions;
        })();
        Extensions.ArrayExtensions = ArrayExtensions;

        Array.prototype.remove = ArrayExtensions.remove;
        Array.prototype.any = ArrayExtensions.any;
        Array.prototype.select = ArrayExtensions.select;
        Array.prototype.first = ArrayExtensions.first;
        Array.prototype.last = ArrayExtensions.last;
        Array.prototype.pushRange = ArrayExtensions.pushRange;
        Array.prototype.contains = ArrayExtensions.contains;
    })(ExpenseTracker.Extensions || (ExpenseTracker.Extensions = {}));
    var Extensions = ExpenseTracker.Extensions;
})(ExpenseTracker || (ExpenseTracker = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExpenseTracker;
(function (ExpenseTracker) {
    var SecuredComponent = (function (_super) {
        __extends(SecuredComponent, _super);
        function SecuredComponent() {
            _super.call(this);
        }
        Object.defineProperty(SecuredComponent.prototype, "isSecured", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });

        SecuredComponent.prototype.initialize = function () {
            var _this = this;
            return _super.prototype.initialize.call(this).then(function () {
                if (_this.isSecured && !_this.isSignedIn) {
                    _this.locationService.path('/sign-in');
                    return _this.promiseService.reject();
                }
            });
        };
        return SecuredComponent;
    })(ExpenseTracker.Component);
    ExpenseTracker.SecuredComponent = SecuredComponent;
})(ExpenseTracker || (ExpenseTracker = {}));
/// <reference path="Component.ts"/>
/// <reference path="ArgumentException.ts"/>
/// <reference path="NotImplementedException.ts"/>
/// <reference path="ArrayExtensions.ts"/>
/// <reference path="SecuredComponent.ts"/>
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Models) {
        (function (AlertType) {
            AlertType[AlertType["Success"] = 0] = "Success";
            AlertType[AlertType["Warning"] = 1] = "Warning";
            AlertType[AlertType["Error"] = 2] = "Error";
        })(Models.AlertType || (Models.AlertType = {}));
        var AlertType = Models.AlertType;
    })(ExpenseTracker.Models || (ExpenseTracker.Models = {}));
    var Models = ExpenseTracker.Models;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Models) {
        (function (PopupStyleEnum) {
            PopupStyleEnum[PopupStyleEnum["Default"] = 0] = "Default";
            PopupStyleEnum[PopupStyleEnum["Danger"] = 1] = "Danger";
        })(Models.PopupStyleEnum || (Models.PopupStyleEnum = {}));
        var PopupStyleEnum = Models.PopupStyleEnum;

        (function (PopupSizeEnum) {
            PopupSizeEnum[PopupSizeEnum["Default"] = 0] = "Default";
            PopupSizeEnum[PopupSizeEnum["Small"] = 1] = "Small";
            PopupSizeEnum[PopupSizeEnum["Large"] = 2] = "Large";
        })(Models.PopupSizeEnum || (Models.PopupSizeEnum = {}));
        var PopupSizeEnum = Models.PopupSizeEnum;

        (function (PopupButtonStyleEnum) {
            PopupButtonStyleEnum[PopupButtonStyleEnum["Default"] = 0] = "Default";
            PopupButtonStyleEnum[PopupButtonStyleEnum["Danger"] = 1] = "Danger";
            PopupButtonStyleEnum[PopupButtonStyleEnum["Success"] = 2] = "Success";
        })(Models.PopupButtonStyleEnum || (Models.PopupButtonStyleEnum = {}));
        var PopupButtonStyleEnum = Models.PopupButtonStyleEnum;
    })(ExpenseTracker.Models || (ExpenseTracker.Models = {}));
    var Models = ExpenseTracker.Models;
})(ExpenseTracker || (ExpenseTracker = {}));
/// <reference path="itag.d.ts" />
/// <reference path="alerttypeenum.ts" />
/// <reference path="idataproviderquery.d.ts" />
/// <reference path="ierrorresponse.d.ts" />
/// <reference path="iexpense.d.ts" />
/// <reference path="iuser.d.ts" />
/// <reference path="ipopup.ts" />
/// <reference path="iqueuedalert.d.ts" />
/// <reference path="iregistrationrequest.d.ts" />
/// <reference path="iresetpasswordrequest.d.ts" />
/// <reference path="isuccessresponse.d.ts" />
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        (function (ApiResource) {
            var ApiResourceService = (function (_super) {
                __extends(ApiResourceService, _super);
                function ApiResourceService() {
                    _super.call(this);
                }
                ApiResourceService.prototype.defaultOnError = function (response, defer, expectedErrors) {
                    if (response.data && !Enumerable.From(expectedErrors).Contains(response.data.errorCode)) {
                        if (response.status === 401) {
                            this.cacheService.profile = undefined;
                            this.locationService.path('/sign-in/expired');
                        } else {
                            this.alertService.error('An unexpected error occured: ' + response.data.message);
                        }
                    }
                    defer.reject(response);
                };

                ApiResourceService.prototype.defaultOnSuccess = function (response, defer) {
                    defer.resolve(response);
                };

                ApiResourceService.prototype.asString = function (data) {
                    return { content: data.substr(1, data.length - 2) };
                };

                ApiResourceService.prototype.asBoolean = function (data) {
                    return { content: data === 'true' };
                };
                return ApiResourceService;
            })(ExpenseTracker.Component);
            ApiResource.ApiResourceService = ApiResourceService;
        })(Services.ApiResource || (Services.ApiResource = {}));
        var ApiResource = Services.ApiResource;
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        (function (ApiResource) {
            var ExpenseApiResourceService = (function (_super) {
                __extends(ExpenseApiResourceService, _super);
                function ExpenseApiResourceService() {
                    _super.call(this);
                    this.expenseResource = this.resourceService(this.apiBaseUrl + '/expense/:id', null, {
                        update: { method: 'PUT' },
                        getAllTags: { method: 'GET', url: this.apiBaseUrl + '/expense/tags', isArray: true },
                        query: { method: 'GET' }
                    });
                }
                ExpenseApiResourceService.prototype.getAll = function (query) {
                    var _this = this;
                    var defer = this.promiseService.defer();

                    if (query.download) {
                        this.httpService({ method: 'GET', url: this.apiBaseUrl + '/expense/', params: query }).success(function (data, status, headers) {
                            _this.downloadHelperService.download(data, status, headers);
                            defer.resolve(data);
                        }).error(function (data) {
                            return _this.defaultOnError(data, defer);
                        });
                    } else {
                        this.expenseResource.query(query, function (response) {
                            return _this.defaultOnSuccess(response, defer);
                        }, function (response) {
                            return _this.defaultOnError(response, defer);
                        });
                    }
                    return defer.promise;
                };

                ExpenseApiResourceService.prototype.getById = function (id) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.expenseResource.get({ id: id }, function (response) {
                        return _this.defaultOnSuccess(response, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                ExpenseApiResourceService.prototype.create = function (expense) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.expenseResource.save(expense, function (response) {
                        return _this.defaultOnSuccess(response, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                ExpenseApiResourceService.prototype.update = function (expense) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.expenseResource.update(expense, function (response) {
                        return _this.defaultOnSuccess(response, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                ExpenseApiResourceService.prototype.delete = function (id) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.expenseResource.delete({ id: id }, function (response) {
                        return _this.defaultOnSuccess(response, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                ExpenseApiResourceService.prototype.getAllTags = function () {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.expenseResource.getAllTags(function (response) {
                        return _this.defaultOnSuccess(response, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };
                ExpenseApiResourceService.Name = 'ExpenseApiResourceService';
                return ExpenseApiResourceService;
            })(ApiResource.ApiResourceService);
            ApiResource.ExpenseApiResourceService = ExpenseApiResourceService;

            angular.module('ExpenseTracker.Services').factory(ExpenseApiResourceService.Name, function () {
                return new ExpenseApiResourceService();
            });
        })(Services.ApiResource || (Services.ApiResource = {}));
        var ApiResource = Services.ApiResource;
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        (function (ApiResource) {
            var UserApiResourceService = (function (_super) {
                __extends(UserApiResourceService, _super);
                function UserApiResourceService() {
                    _super.call(this);
                    this.userResource = this.resourceService(this.apiBaseUrl + '/user', null, {
                        get: { method: 'GET' },
                        register: { method: 'POST' },
                        update: { method: 'PUT' },
                        resetPassword: { method: 'POST', url: this.apiBaseUrl + '/user/reset-password' },
                        verifyResetPassword: { method: 'GET', url: this.apiBaseUrl + '/user/verify-reset-password/:resetPasswordToken', transformResponse: this.asString },
                        verifyEmail: { method: 'GET', url: this.apiBaseUrl + '/user/verify-email/:emailToken', transformResponse: this.asString },
                        signIn: { method: 'POST', url: this.apiBaseUrl + '/user/sign-in', transformResponse: this.asString },
                        signOut: { method: 'DELETE', url: this.apiBaseUrl + '/user/sign-out' },
                        emailUnique: { method: 'GET', url: this.apiBaseUrl + '/user/email-unique', transformResponse: this.asBoolean }
                    });
                }
                UserApiResourceService.prototype.get = function () {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.get(function (user) {
                        return _this.defaultOnSuccess(user, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                UserApiResourceService.prototype.register = function (user) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.register(user, function (user) {
                        return _this.defaultOnSuccess(user, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                UserApiResourceService.prototype.update = function (user) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.update(user, function (user) {
                        return _this.defaultOnSuccess(user, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                UserApiResourceService.prototype.resetPassword = function (resetPasswordRequest) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.resetPassword(resetPasswordRequest, function () {
                        return _this.defaultOnSuccess(true, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                UserApiResourceService.prototype.verifyResetPassword = function (resetPasswordToken) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.verifyResetPassword({ resetPasswordToken: resetPasswordToken }, function (response) {
                        return _this.defaultOnSuccess(response.content, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                UserApiResourceService.prototype.verifyEmail = function (emailToken) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.verifyEmail({ emailToken: emailToken }, function (response) {
                        return _this.defaultOnSuccess(response.content, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                UserApiResourceService.prototype.signIn = function (user) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.signIn(user, function (response) {
                        return _this.defaultOnSuccess(response.content, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                UserApiResourceService.prototype.signOut = function () {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.signOut(function () {
                        return _this.defaultOnSuccess(true, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };

                UserApiResourceService.prototype.emailUnique = function (email) {
                    var _this = this;
                    var defer = this.promiseService.defer();
                    this.userResource.emailUnique({ email: email }, function (response) {
                        return _this.defaultOnSuccess(response.content, defer);
                    }, function (response) {
                        return _this.defaultOnError(response, defer);
                    });
                    return defer.promise;
                };
                UserApiResourceService.Name = 'UserApiResourceService';
                return UserApiResourceService;
            })(ApiResource.ApiResourceService);
            ApiResource.UserApiResourceService = UserApiResourceService;

            angular.module('ExpenseTracker.Services').factory(UserApiResourceService.Name, function () {
                return new UserApiResourceService();
            });
        })(Services.ApiResource || (Services.ApiResource = {}));
        var ApiResource = Services.ApiResource;
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Alert = (function (_super) {
            __extends(Alert, _super);
            function Alert() {
                _super.call(this);
                this.queue = [];
            }
            Alert.prototype.success = function (message) {
                this.queue.push({
                    type: 0 /* Success */,
                    message: message
                });
            };

            Alert.prototype.warning = function (message) {
                this.queue.push({
                    type: 1 /* Warning */,
                    message: message
                });
            };

            Alert.prototype.error = function (message) {
                this.queue.push({
                    type: 2 /* Error */,
                    message: message
                });
            };
            Alert.Name = 'Alert';
            return Alert;
        })(ExpenseTracker.Component);
        Services.Alert = Alert;

        angular.module('ExpenseTracker.Services').factory(Alert.Name, function () {
            return new Alert();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Cache = (function () {
            function Cache(cookiesService, httpService, promiseService) {
                this._data = {};
                this.httpService = httpService;
                this.cookiesService = cookiesService;

                this.initializedDefer = promiseService.defer();
            }
            Object.defineProperty(Cache.prototype, "profile", {
                get: function () {
                    return this._profile;
                },
                set: function (value) {
                    this._profile = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Cache.prototype, "sessionToken", {
                get: function () {
                    if (!angular.isDefined(this._sessionToken)) {
                        this._sessionToken = this.cookiesService[Cache.SessionTokenCookieName];
                        this.httpService.defaults.headers.common["X-Auth"] = this._sessionToken;
                    }
                    return this._sessionToken;
                },
                set: function (value) {
                    this._sessionToken = value;
                    this.httpService.defaults.headers.common["X-Auth"] = value;
                    this.cookiesService[Cache.SessionTokenCookieName] = value;
                },
                enumerable: true,
                configurable: true
            });
            Cache.Name = "Cache";
            Cache.SessionTokenCookieName = "session";
            return Cache;
        })();
        Services.Cache = Cache;

        angular.module('ExpenseTracker.Services').factory(Cache.Name, [
            '$cookies',
            '$http',
            '$q',
            function (cookiesService, httpService, promiseService) {
                return new Cache(cookiesService, httpService, promiseService);
            }
        ]);
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var DataProvider = (function (_super) {
            __extends(DataProvider, _super);
            function DataProvider(selectorFn) {
                _super.call(this);
                this._filters = {};
                this.selectorFn = selectorFn;
                this.query = this.defaultQuery;
            }
            Object.defineProperty(DataProvider.prototype, "defaultQuery", {
                get: function () {
                    return {
                        page: 1,
                        pageSize: 20,
                        filters: this.filters
                    };
                },
                enumerable: true,
                configurable: true
            });

            DataProvider.prototype.reset = function () {
                this.load(this.defaultQuery);
            };

            DataProvider.prototype.refresh = function () {
                this.load({
                    page: this.query.page,
                    pageSize: this.query.pageSize,
                    filters: this.filters
                });
            };

            DataProvider.prototype.load = function (query) {
                var _this = this;
                this.beginUpdate();
                this.selectorFn(query).then(function (results) {
                    _this.queryResults = results;
                    _this.items = results.items;
                    _this.query = results.query;
                    _this.endUpdate();
                });
            };

            DataProvider.prototype.download = function () {
                var _this = this;
                var query = {
                    page: this.query.page,
                    pageSize: this.query.pageSize,
                    filters: this.filters,
                    download: true
                };
                this.beginUpdate();
                this.selectorFn(query).then(function (results) {
                    return _this.endUpdate();
                });
            };

            DataProvider.prototype.setPage = function (page) {
                this.load({
                    page: page,
                    pageSize: this.query.pageSize,
                    filters: this.filters
                });
            };

            DataProvider.prototype.filter = function (source, filters) {
                this._filters[source] = filters;
                this.load({
                    page: this.query.page,
                    pageSize: this.query.pageSize,
                    filters: this.filters
                });
            };

            Object.defineProperty(DataProvider.prototype, "filters", {
                get: function () {
                    var results = [];
                    for (var source in this._filters) {
                        var sourceFilters = this._filters[source];
                        if (sourceFilters && sourceFilters.any()) {
                            sourceFilters.forEach(function (sourceFilter) {
                                if (typeof sourceFilter.query !== 'undefined' && sourceFilter.query !== null && sourceFilter.query.toString().trim() !== '')
                                    results.push(sourceFilter.field + ':' + sourceFilter.query.split(':').join('>'));
                            });
                        }
                    }
                    return results;
                },
                enumerable: true,
                configurable: true
            });
            return DataProvider;
        })(ExpenseTracker.Component);
        Services.DataProvider = DataProvider;

        var DataProviderFactory = (function () {
            function DataProviderFactory() {
            }
            DataProviderFactory.prototype.create = function (selectorFn) {
                return new DataProvider(selectorFn);
            };
            DataProviderFactory.Name = 'DataProvider';
            return DataProviderFactory;
        })();
        Services.DataProviderFactory = DataProviderFactory;

        angular.module('ExpenseTracker.Services').factory(DataProviderFactory.Name, function () {
            return new DataProviderFactory();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var DownloadHelper = (function (_super) {
            __extends(DownloadHelper, _super);
            function DownloadHelper() {
                _super.call(this);
            }
            DownloadHelper.prototype.download = function (data, status, headers) {
                var filename = headers("x-filename") || "download.bin";
                var contentType = headers("content-type") || "application/octet-stream";

                if (navigator.msSaveBlob) {
                    var blob = new Blob([data], { type: contentType });
                    navigator.msSaveBlob(blob, filename);
                } else {
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if (urlCreator) {
                        var link = document.createElement("a");
                        if ("download" in link) {
                            var blob = new Blob([data], { type: contentType });
                            var url = urlCreator.createObjectURL(blob);
                            link.setAttribute("href", url);
                            link.setAttribute("download", filename);
                            var event = document.createEvent('MouseEvents');
                            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                            link.dispatchEvent(event);
                        } else {
                            var blob = new Blob([data], { type: "application/octet-stream" });
                            var url = urlCreator.createObjectURL(blob);
                            window.location = url;
                        }
                    } else {
                        console.log("Download not supported");
                    }
                }
            };
            DownloadHelper.Name = 'DownloadHelper';
            return DownloadHelper;
        })(ExpenseTracker.Component);
        Services.DownloadHelper = DownloadHelper;

        angular.module('ExpenseTracker.Services').factory(DownloadHelper.Name, function () {
            return new DownloadHelper();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Services) {
        var Popup = (function (_super) {
            __extends(Popup, _super);
            function Popup() {
                _super.call(this);
                this.queue = [];
            }
            Popup.prototype.show = function (popup, model) {
                popup.model = model;
                this.queue.push(angular.copy(popup));
            };
            Popup.Name = 'Popup';
            return Popup;
        })(ExpenseTracker.Component);
        Services.Popup = Popup;

        angular.module('ExpenseTracker.Services').factory(Popup.Name, function () {
            return new Popup();
        });
    })(ExpenseTracker.Services || (ExpenseTracker.Services = {}));
    var Services = ExpenseTracker.Services;
})(ExpenseTracker || (ExpenseTracker = {}));
/// <reference path="apiresource/apiresourceservice.ts" />
/// <reference path="apiresource/expenseapiresourceservice.ts" />
/// <reference path="apiresource/userapiresourceservice.ts" />
/// <reference path="alert.ts" />
/// <reference path="cache.ts" />
/// <reference path="dataprovider.ts" />
/// <reference path="downloadhelper.ts" />
/// <reference path="popup.ts" />
var ExpenseTracker;
(function (ExpenseTracker) {
    var ControllerBase = (function (_super) {
        __extends(ControllerBase, _super);
        function ControllerBase(scope) {
            _super.call(this);

            this.scope = scope;
            this.scope.$controller = this;
        }
        return ControllerBase;
    })(ExpenseTracker.SecuredComponent);
    ExpenseTracker.ControllerBase = ControllerBase;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var EmailVerification = (function (_super) {
            __extends(EmailVerification, _super);
            function EmailVerification(scope) {
                _super.call(this, scope);
            }
            EmailVerification.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    var token = _this.routeParamsService["verificationToken"];
                    if (!token)
                        _this.locationService.path("/");

                    _this.beginUpdate();
                    _this.userApiResourceService.verifyEmail(token).then(function (sessionToken) {
                        _this.endUpdate();
                        _this.cacheService.sessionToken = sessionToken;
                        _this.beginUpdate();
                        _this.userApiResourceService.get().then(function (user) {
                            _this.endUpdate();
                            _this.cacheService.profile = user;
                            _this.locationService.path('/profile/welcome');
                        }, function () {
                            return _this.endUpdate();
                        });
                    }, function (response) {
                        _this.endUpdate();
                        if (response.data.errorCode === ExpenseTracker.Errors.EMAIL_VERIFICATION_TOKEN_NOT_FOUND)
                            _this.alertService.error('Invalid email verification link. Please contact support@expensetracker.co.za.');
                    });
                });
            };
            EmailVerification.Name = 'EmailVerification';
            return EmailVerification;
        })(ExpenseTracker.ControllerBase);
        Controllers.EmailVerification = EmailVerification;

        angular.module('ExpenseTracker.Controllers').controller(EmailVerification.Name, [
            '$scope',
            function (scope) {
                return new EmailVerification(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var ExpenseDetails = (function (_super) {
            __extends(ExpenseDetails, _super);
            function ExpenseDetails(scope) {
                _super.call(this, scope);
                this.beginUpdate();
            }
            Object.defineProperty(ExpenseDetails.prototype, "isSecured", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ExpenseDetails.prototype, "isEditing", {
                get: function () {
                    return !!this.expenseId;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ExpenseDetails.prototype, "expenseId", {
                get: function () {
                    return this.routeParamsService['id'];
                },
                enumerable: true,
                configurable: true
            });

            ExpenseDetails.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    if (_this.isEditing) {
                        _this.expenseService.getById(_this.expenseId).then(function (expense) {
                            _this.form = expense;
                            _this.endUpdate();
                        }, function () {
                            return _this.endUpdate();
                        });
                    } else {
                        _this.form = {};
                        _this.endUpdate();
                    }

                    _this.beginUpdate('tags');
                    _this.expenseService.getAllTags().then(function (tags) {
                        _this.tags = tags;
                        _this.endUpdate('tags');
                    }, function () {
                        return _this.endUpdate('tags');
                    });
                });
            };

            ExpenseDetails.prototype.save = function () {
                var _this = this;
                if (this.isEditing) {
                    this.beginUpdate();
                    this.expenseService.update(this.form).then(function () {
                        _this.alertService.success("Expense updated");
                        _this.locationService.path("/expenses");
                    }, function () {
                        return _this.endUpdate();
                    });
                } else {
                    this.beginUpdate();
                    this.expenseService.create(this.form).then(function () {
                        _this.alertService.success("Expense added");
                        _this.locationService.path("/expenses");
                    }, function () {
                        return _this.endUpdate();
                    });
                }
            };

            ExpenseDetails.prototype.tagsSource = function (query) {
                var filteredTags = this.filterService('filter')(this.tags, query);
                return this.promiseService.when(filteredTags);
            };
            ExpenseDetails.Name = 'ExpenseDetails';
            return ExpenseDetails;
        })(ExpenseTracker.ControllerBase);
        Controllers.ExpenseDetails = ExpenseDetails;

        angular.module('ExpenseTracker.Controllers').controller(ExpenseDetails.Name, [
            '$scope',
            function (scope) {
                return new ExpenseDetails(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var ExpenseList = (function (_super) {
            __extends(ExpenseList, _super);
            function ExpenseList(scope) {
                var _this = this;
                _super.call(this, scope);
                this.form = {};

                this.removeConfirmationPopup = {
                    title: 'Remove expense',
                    text: 'Are you sure you want to remove <strong>{{ description }}</strong>?',
                    style: 1 /* Danger */,
                    size: 1 /* Small */,
                    buttons: [
                        { text: 'Cancel' },
                        {
                            text: 'Remove',
                            style: 1 /* Danger */,
                            clickFn: function (expense) {
                                return _this.removeConfirmed(expense);
                            }
                        }
                    ]
                };

                this.expenseDataProvider = this.dataProviderFactory.create(function (query) {
                    return _this.expenseService.getAll(query);
                });
            }
            Object.defineProperty(ExpenseList.prototype, "isSecured", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            ExpenseList.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    return _this.expenseDataProvider.reset();
                });
            };

            ExpenseList.prototype.remove = function (expense) {
                this.popupService.show(this.removeConfirmationPopup, expense);
            };

            ExpenseList.prototype.removeConfirmed = function (expense) {
                var _this = this;
                this.beginUpdate();
                this.expenseService.delete(expense.id).then(function () {
                    _this.endUpdate();
                    _this.expenseDataProvider.refresh();
                    _this.alertService.success('Expense removed');
                }, function () {
                    return _this.endUpdate();
                });
            };

            Object.defineProperty(ExpenseList.prototype, "isFirstLogin", {
                get: function () {
                    return this.routeParamsService['welcome'] === 'welcome';
                },
                enumerable: true,
                configurable: true
            });
            ExpenseList.Name = 'ExpenseList';
            return ExpenseList;
        })(ExpenseTracker.ControllerBase);
        Controllers.ExpenseList = ExpenseList;

        angular.module('ExpenseTracker.Controllers').controller(ExpenseList.Name, [
            '$scope',
            function (scope) {
                return new ExpenseList(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var Home = (function (_super) {
            __extends(Home, _super);
            function Home(scope) {
                _super.call(this, scope);
            }
            Home.Name = 'Home';
            return Home;
        })(ExpenseTracker.ControllerBase);
        Controllers.Home = Home;

        angular.module('ExpenseTracker.Controllers').controller(Home.Name, [
            '$scope',
            function (scope) {
                return new Home(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var Profile = (function (_super) {
            __extends(Profile, _super);
            function Profile(scope) {
                _super.call(this, scope);
            }
            Object.defineProperty(Profile.prototype, "isSecured", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            Profile.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    _this.form = _this.cacheService.profile;
                });
            };

            Profile.prototype.save = function () {
                var _this = this;
                this.beginUpdate();
                this.userApiResourceService.update(this.form).then(function (user) {
                    _this.cacheService.profile = user;
                    _this.profileForm.$setPristine();
                    _this.alertService.success("Profile updated");
                    _this.endUpdate();
                }, function () {
                    return _this.endUpdate();
                });
            };

            Object.defineProperty(Profile.prototype, "profileForm", {
                get: function () {
                    return this.scope['profileForm'];
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Profile.prototype, "isFirstLogin", {
                get: function () {
                    return this.routeParamsService['welcome'] === 'welcome';
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Profile.prototype, "isResetPassword", {
                get: function () {
                    return this.routeParamsService['welcome'] === 'reset-password';
                },
                enumerable: true,
                configurable: true
            });
            Profile.Name = 'Profile';
            return Profile;
        })(ExpenseTracker.ControllerBase);
        Controllers.Profile = Profile;

        angular.module('ExpenseTracker.Controllers').controller(Profile.Name, [
            '$scope',
            function (scope) {
                return new Profile(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var Registration = (function (_super) {
            __extends(Registration, _super);
            function Registration(scope) {
                _super.call(this, scope);
                this.form = {};
            }
            Registration.prototype.register = function () {
                var _this = this;
                this.beginUpdate();
                this.userApiResourceService.register(this.form).then(function () {
                    _this.endUpdate();
                    _this.locationService.path('/registration-complete');
                });
            };
            Registration.Name = 'Registration';
            return Registration;
        })(ExpenseTracker.ControllerBase);
        Controllers.Registration = Registration;

        angular.module('ExpenseTracker.Controllers').controller(Registration.Name, [
            '$scope',
            function (scope) {
                return new Registration(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var RegistrationComplete = (function (_super) {
            __extends(RegistrationComplete, _super);
            function RegistrationComplete(scope) {
                _super.call(this, scope);
            }
            RegistrationComplete.Name = 'RegistrationComplete';
            return RegistrationComplete;
        })(ExpenseTracker.ControllerBase);
        Controllers.RegistrationComplete = RegistrationComplete;

        angular.module('ExpenseTracker.Controllers').controller(RegistrationComplete.Name, [
            '$scope',
            function (scope) {
                return new RegistrationComplete(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var ResetPassword = (function (_super) {
            __extends(ResetPassword, _super);
            function ResetPassword(scope) {
                _super.call(this, scope);
                this.requestSent = false;
                this.resetFailed = false;
                this.form = {};
            }
            ResetPassword.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    if (_this.resetToken) {
                        return _this.userApiResourceService.verifyResetPassword(_this.resetToken).then(function (sessionToken) {
                            _this.cacheService.sessionToken = sessionToken;
                            _this.userApiResourceService.get().then(function (user) {
                                _this.cacheService.profile = user;
                                _this.locationService.path('/profile/reset-password');
                            });
                        }, function (response) {
                            _this.resetFailed = true;
                        });
                    }
                    return _this.promiseService.when(true);
                });
            };

            ResetPassword.prototype.reset = function () {
                var _this = this;
                this.beginUpdate();
                this.userApiResourceService.resetPassword(this.form).then(function () {
                    _this.endUpdate();
                    _this.requestSent = true;
                }, function (response) {
                    _this.endUpdate();
                });
            };

            Object.defineProperty(ResetPassword.prototype, "resetToken", {
                get: function () {
                    return this.routeParamsService['resetToken'];
                },
                enumerable: true,
                configurable: true
            });
            ResetPassword.Name = 'ResetPassword';
            return ResetPassword;
        })(ExpenseTracker.ControllerBase);
        Controllers.ResetPassword = ResetPassword;

        angular.module('ExpenseTracker.Controllers').controller(ResetPassword.Name, [
            '$scope',
            function (scope) {
                return new ResetPassword(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Controllers) {
        var SignIn = (function (_super) {
            __extends(SignIn, _super);
            function SignIn(scope) {
                _super.call(this, scope);
                this.form = {};
            }
            SignIn.prototype.signIn = function () {
                var _this = this;
                this.beginUpdate();
                this.userApiResourceService.signIn(this.form).then(function (sessionToken) {
                    _this.cacheService.sessionToken = sessionToken;
                    _this.userApiResourceService.get().then(function (user) {
                        _this.endUpdate();
                        _this.cacheService.profile = user;
                        _this.locationService.path('/expenses');
                    }, function (response) {
                        return _this.endUpdate();
                    });
                }, function (response) {
                    _this.endUpdate();
                    if (response.data.errorCode === ExpenseTracker.Errors.SIGN_IN_INCORRECT_DETAILS)
                        _this.alertService.error("Incorrect sign in details. Please try again.");
                    if (response.data.errorCode === ExpenseTracker.Errors.SIGN_IN_ACCOUNT_LOCKED)
                        _this.alertService.error("Your account is locked. Please contact support.");
                    if (response.data.errorCode === ExpenseTracker.Errors.SIGN_IN_EMAIL_NOT_VERIFIED)
                        _this.alertService.error("Your email address has not been verified. Please check your email and click the verification link. If you did not recieve an email, please contact support@expensetracker.co.za.");
                });
            };

            Object.defineProperty(SignIn.prototype, "sessionExpired", {
                get: function () {
                    return this.routeParamsService['expired'] === 'expired';
                },
                enumerable: true,
                configurable: true
            });
            SignIn.Name = 'SignIn';
            return SignIn;
        })(ExpenseTracker.ControllerBase);
        Controllers.SignIn = SignIn;

        angular.module('ExpenseTracker.Controllers').controller(SignIn.Name, [
            '$scope',
            function (scope) {
                return new SignIn(scope);
            }
        ]);
    })(ExpenseTracker.Controllers || (ExpenseTracker.Controllers = {}));
    var Controllers = ExpenseTracker.Controllers;
})(ExpenseTracker || (ExpenseTracker = {}));
/// <reference path="controllerbase.ts" />
/// <reference path="emailverification.ts" />
/// <reference path="expensedetails.ts" />
/// <reference path="expenselist.ts" />
/// <reference path="home.ts" />
/// <reference path="profile.ts" />
/// <reference path="registration.ts" />
/// <reference path="registrationcomplete.ts" />
/// <reference path="resetpassword.ts" />
/// <reference path="signin.ts" />
var ExpenseTracker;
(function (ExpenseTracker) {
    var DirectiveBase = (function (_super) {
        __extends(DirectiveBase, _super);
        function DirectiveBase(scope, element, attributes) {
            _super.call(this);
            this.scope = scope;
            this.element = element;
            this.attributes = attributes;

            this.scope.$directive = this;
        }
        Object.defineProperty(DirectiveBase.prototype, "templateCacheService", {
            get: function () {
                return this._templateCacheService || (this._templateCacheService = this.injectorService.get('$templateCache'));
            },
            set: function (value) {
                this._templateCacheService = value;
            },
            enumerable: true,
            configurable: true
        });
        return DirectiveBase;
    })(ExpenseTracker.SecuredComponent);
    ExpenseTracker.DirectiveBase = DirectiveBase;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var AlertHandler = (function (_super) {
            __extends(AlertHandler, _super);
            function AlertHandler(scope, element, attributes) {
                var _this = this;
                _super.call(this, scope, element, attributes);

                this.scope.$watchCollection(function () {
                    return _this.alertService.queue;
                }, function () {
                    return _this.displayAlert();
                });
            }
            AlertHandler.prototype.displayAlert = function () {
                if (!Enumerable.From(this.alertService.queue).Any())
                    return;
                var alert = this.alertService.queue.shift();
                var alertItem = $('<div class="alert"></div>').html(alert.message);
                if (alert.type === 0 /* Success */)
                    alertItem.addClass('alert-success');
                if (alert.type === 1 /* Warning */)
                    alertItem.addClass('alert-warning');
                if (alert.type === 2 /* Error */)
                    alertItem.addClass('alert-danger');
                this.element.append(alertItem);
                alertItem.css('margin-left', '-' + (alertItem.outerWidth() / 2) + 'px');
                this.timeoutService(function () {
                    return alertItem.fadeOut(2000, function () {
                        return alertItem.remove();
                    });
                }, 4000);
            };
            AlertHandler.Name = 'alertHandler';
            AlertHandler.TemplateUrl = 'ExpenseTracker/Views/AlertHandler.html';
            return AlertHandler;
        })(ExpenseTracker.DirectiveBase);
        Directives.AlertHandler = AlertHandler;

        angular.module('ExpenseTracker.Directives').directive(AlertHandler.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: AlertHandler.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new AlertHandler(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Captcha = (function (_super) {
            __extends(Captcha, _super);
            function Captcha(scope, element, attributes) {
                var _this = this;
                _super.call(this, scope, element, attributes);

                Recaptcha.create(this.publicKey, element[0], {
                    theme: 'clean',
                    callback: function () {
                        return _this.created();
                    }
                });
            }
            Object.defineProperty(Captcha.prototype, "publicKey", {
                get: function () {
                    return this.injectorService.get('RECAPTCHA_PUBLIC_KEY');
                },
                enumerable: true,
                configurable: true
            });

            Captcha.prototype.created = function () {
                var _this = this;
                this.element.find('input[name=recaptcha_response_field]').on('keyup', function () {
                    return _this.scope.$apply(function () {
                        return _this.update();
                    });
                });
            };

            Captcha.prototype.update = function () {
                if (this.attributes['challenge'])
                    this.scope.$eval('$parent.' + this.attributes['challenge'] + ' = challenge', { challenge: Recaptcha.get_challenge() });

                if (this.attributes['response'])
                    this.scope.$eval('$parent.' + this.attributes['response'] + ' = response', { response: Recaptcha.get_response() });
            };
            Captcha.Name = 'captcha';
            Captcha.TemplateUrl = 'ExpenseTracker/Views/Captcha.html';
            return Captcha;
        })(ExpenseTracker.DirectiveBase);
        Directives.Captcha = Captcha;

        angular.module('ExpenseTracker.Directives').directive(Captcha.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: Captcha.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new Captcha(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var DateFilter = (function (_super) {
            __extends(DateFilter, _super);
            function DateFilter(scope, element, attributes) {
                _super.call(this, scope, element, attributes);
                this.dates = {
                    from: null,
                    to: null
                };

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid date filter data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
            }
            DateFilter.prototype.filter = function () {
                if (this.dates.from && this.dates.to)
                    this.dataProvider.filter(DateFilter.Name, [{
                            field: 'date',
                            query: this.dates.from.toISOString() + '|' + this.dates.to.toISOString()
                        }]);
                else
                    this.dataProvider.filter(DateFilter.Name, []);
            };

            DateFilter.prototype.clear = function () {
                this.isCustom = false;
                var hadDate = !!this.dates.from && !!this.dates.to;
                this.dates.from = undefined;
                this.dates.to = undefined;
                if (hadDate)
                    this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isClear", {
                get: function () {
                    return !this.dates.from && !this.dates.to && !this.isCustom;
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.today = function () {
                this.isCustom = false;
                var now = new Date();
                this.dates.from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                this.dates.to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isToday", {
                get: function () {
                    if (this.isClear || this.isCustom)
                        return false;

                    var now = new Date();
                    return this.dates.from.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() && this.dates.to.getTime() == (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)).getTime();
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.thisWeek = function () {
                this.isCustom = false;
                var now = new Date();
                var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                this.dates.from = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate());
                this.dates.to = new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isThisWeek", {
                get: function () {
                    if (this.isClear || this.isCustom)
                        return false;

                    var now = new Date();
                    var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                    var lastDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
                    if (this.dates.from.getTime() !== (new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate())).getTime())
                        return false;
                    if (this.dates.to.getTime() !== (new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59)).getTime())
                        return false;
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            DateFilter.prototype.thisMonth = function () {
                this.isCustom = false;
                var now = new Date();
                this.dates.from = new Date(now.getFullYear(), now.getMonth());
                this.dates.to = new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59);
                this.filter();
            };

            Object.defineProperty(DateFilter.prototype, "isThisMonth", {
                get: function () {
                    if (this.isClear || this.isCustom)
                        return false;

                    var now = new Date();
                    return this.dates.from.getTime() == (new Date(now.getFullYear(), now.getMonth())).getTime() && this.dates.to.getTime() == (new Date(now.getFullYear(), now.getMonth() + 1, -1, 23, 59, 59)).getTime();
                },
                enumerable: true,
                configurable: true
            });
            DateFilter.Name = 'dateFilter';
            DateFilter.TemplateUrl = 'ExpenseTracker/Views/DateFilter.html';
            return DateFilter;
        })(ExpenseTracker.DirectiveBase);
        Directives.DateFilter = DateFilter;

        angular.module('ExpenseTracker.Directives').directive(DateFilter.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: DateFilter.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new DateFilter(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Datepicker = (function (_super) {
            __extends(Datepicker, _super);
            function Datepicker(scope, element, attributes, modelController) {
                var _this = this;
                _super.call(this, scope, element, attributes);
                this.modelController = modelController;
                this.modelController.$render = function () {
                    _this.value = _this.modelController.$viewValue;
                    //if (!this.value)
                    //    this.value = new Date();
                };
                this.scope.$watch(function () {
                    return _this.value;
                }, function (newValue, oldValue) {
                    if (typeof newValue === 'undefined' && typeof oldValue === 'undefined')
                        return;

                    _this.modelController.$setViewValue(_this.value);
                });
                this.open = false;
                var onBodyClickHandler = function (e) {
                    return _this.onBodyClick(e);
                };
                this.element.closest('html').on('click', onBodyClickHandler);
                this.scope.$on('$destroy', function () {
                    return _this.element.closest('body').off('click', onBodyClickHandler);
                });
            }
            Datepicker.prototype.onBodyClick = function (e) {
                var _this = this;
                if (this.open && ($(e.target).parents('.custom-datepicker').length > 0 || $(e.target).parents('[role=gridcell]').length > 0))
                    return;
                this.scope.$apply(function () {
                    return _this.open = false;
                });
            };

            Datepicker.prototype.toggle = function () {
                this.open = !this.open;
            };

            Datepicker.prototype.now = function () {
                this.value = new Date();
                this.toggle();
            };
            Datepicker.Name = 'customDatepicker';
            Datepicker.TemplateUrl = 'ExpenseTracker/Views/Datepicker.html';
            return Datepicker;
        })(ExpenseTracker.DirectiveBase);
        Directives.Datepicker = Datepicker;

        angular.module('ExpenseTracker.Directives').directive(Datepicker.Name, function () {
            return {
                replace: true,
                require: 'ngModel',
                restrict: 'E',
                scope: true,
                templateUrl: Datepicker.TemplateUrl,
                link: function (scope, element, attributes, modelController) {
                    return new Datepicker(scope, element, attributes, modelController);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var GridPager = (function (_super) {
            __extends(GridPager, _super);
            function GridPager(scope, element, attributes) {
                _super.call(this, scope, element, attributes);

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid pager data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
            }
            Object.defineProperty(GridPager.prototype, "pages", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return [];
                    var results = [];
                    if (this.last < 5) {
                        for (var i = 0; i < this.last; i++)
                            results.push(i + 1);
                    } else {
                        for (var i = 0; i < 5; i++) {
                            var page = this.currentPage + (-2 + i);
                            if (page > 0 && page <= this.last)
                                results.push(page);
                        }
                    }
                    return results;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "currentPage", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return null;
                    return this.dataProvider.query.page;
                },
                enumerable: true,
                configurable: true
            });

            GridPager.prototype.setPage = function (page) {
                if (!this.dataProvider || !this.dataProvider.query)
                    return;
                this.dataProvider.setPage(page);
            };

            Object.defineProperty(GridPager.prototype, "showPrevious", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.currentPage > 1;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "showNext", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.currentPage < this.last;
                },
                enumerable: true,
                configurable: true
            });

            GridPager.prototype.previous = function () {
                if (!this.showPrevious)
                    return;
                this.dataProvider.setPage(this.currentPage - 1);
            };

            GridPager.prototype.next = function () {
                if (!this.showNext)
                    return;
                this.dataProvider.setPage(this.currentPage + 1);
            };

            Object.defineProperty(GridPager.prototype, "showFirst", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.pages.first() > 1;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "showFirstEllipse", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.pages.first() > 2;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "showLast", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.pages.last() < this.last;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "showLastEllipse", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return false;
                    return this.pages.last() < (this.last - 1);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPager.prototype, "last", {
                get: function () {
                    if (!this.dataProvider || !this.dataProvider.query)
                        return 0;
                    return this.dataProvider.query.pageCount;
                },
                enumerable: true,
                configurable: true
            });
            GridPager.Name = 'gridPager';
            GridPager.TemplateUrl = 'ExpenseTracker/Views/GridPager.html';
            return GridPager;
        })(ExpenseTracker.DirectiveBase);
        Directives.GridPager = GridPager;

        angular.module('ExpenseTracker.Directives').directive(GridPager.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: GridPager.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new GridPager(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var GridTextFilter = (function (_super) {
            __extends(GridTextFilter, _super);
            function GridTextFilter(scope, element, attributes) {
                var _this = this;
                _super.call(this, scope, element, attributes);

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid text filter data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);

                if (!attributes['filterFields'])
                    throw new ExpenseTracker.ArgumentException('filterFields', 'Grid text filter filter fields property not set');

                this.filterFields = attributes['filterFields'].split(' ');

                this.scope.$watch(function () {
                    return _this.text;
                }, function (text, oldText) {
                    if (typeof text === 'undefined' && typeof oldText === 'undefined')
                        return;
                    _this.filter();
                });
            }
            GridTextFilter.prototype.filter = function () {
                this.dataProvider.filter(GridTextFilter.Name, this.filters(this.text));
            };

            GridTextFilter.prototype.filters = function (query) {
                var filters = [];
                this.filterFields.forEach(function (field) {
                    filters.push({
                        field: field,
                        query: query
                    });
                });
                return filters;
            };

            GridTextFilter.prototype.clear = function () {
                var hadText = !!this.text;
                this.text = '';
                if (hadText)
                    this.filter();
            };
            GridTextFilter.Name = 'gridTextFilter';
            GridTextFilter.TemplateUrl = 'ExpenseTracker/Views/GridTextFilter.html';
            return GridTextFilter;
        })(ExpenseTracker.DirectiveBase);
        Directives.GridTextFilter = GridTextFilter;

        angular.module('ExpenseTracker.Directives').directive(GridTextFilter.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: GridTextFilter.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new GridTextFilter(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu(scope, element, attributes) {
                _super.call(this, scope, element, attributes);
            }
            Menu.prototype.signOut = function () {
                var _this = this;
                this.beginUpdate();
                this.userApiResourceService.signOut().then(function () {
                    return _this.signOutSuccess();
                }, function () {
                    return _this.signOutSuccess();
                });
            };

            Menu.prototype.signOutSuccess = function () {
                this.endUpdate();
                this.cacheService.sessionToken = '';
                this.cacheService.profile = null;
                this.locationService.path("/");
            };
            Menu.Name = 'menu';
            Menu.TemplateUrl = 'ExpenseTracker/Views/Menu.html';
            return Menu;
        })(ExpenseTracker.DirectiveBase);
        Directives.Menu = Menu;

        angular.module('ExpenseTracker.Directives').directive(Menu.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: Menu.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new Menu(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var PopupHandler = (function (_super) {
            __extends(PopupHandler, _super);
            function PopupHandler(scope, element, attributes) {
                var _this = this;
                _super.call(this, scope, element, attributes);

                this.scope.$watchCollection(function () {
                    return _this.popupService.queue;
                }, function () {
                    return _this.displayPopup();
                });
            }
            PopupHandler.prototype.displayPopup = function () {
                if (!this.popupService.queue.any())
                    return;
                this.currentPopup = this.popupService.queue.shift();
                this.currentPopup.title = this.interpolateAndMarkAsSafeHtml(this.currentPopup.title, this.currentPopup.model);
                this.currentPopup.text = this.interpolateAndMarkAsSafeHtml(this.currentPopup.text, this.currentPopup.model);
                this.element.modal();
            };

            PopupHandler.prototype.buttonClickFn = function (button) {
                if (angular.isFunction(button.clickFn))
                    button.clickFn(this.currentPopup.model);
                this.element.modal('hide');
            };

            Object.defineProperty(PopupHandler.prototype, "isSmall", {
                get: function () {
                    return this.currentPopup && this.currentPopup.size === 1 /* Small */;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(PopupHandler.prototype, "isLarge", {
                get: function () {
                    return this.currentPopup && this.currentPopup.size === 2 /* Large */;
                },
                enumerable: true,
                configurable: true
            });

            PopupHandler.prototype.interpolateAndMarkAsSafeHtml = function (template, model) {
                var expression = this.interpolateService(template);
                var value = expression(model);
                return this.sceService.trustAsHtml(value);
            };
            PopupHandler.Name = 'popupHandler';
            PopupHandler.TemplateUrl = 'ExpenseTracker/Views/PopupHandler.html';
            return PopupHandler;
        })(ExpenseTracker.DirectiveBase);
        Directives.PopupHandler = PopupHandler;

        angular.module('ExpenseTracker.Directives').directive(PopupHandler.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: PopupHandler.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new PopupHandler(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Tags = (function (_super) {
            __extends(Tags, _super);
            function Tags(scope, element, attributes, modelController) {
                var _this = this;
                _super.call(this, scope, element, attributes);
                this.value = [];
                this.modelController = modelController;
                this.modelController.$render = function () {
                    if (_this.modelController.$viewValue && angular.isArray(_this.modelController.$viewValue))
                        _this.value = _this.modelController.$viewValue.select(function (a) {
                            return { text: a };
                        });
                    else
                        _this.value = [];
                };
                this.scope.$watchCollection(function () {
                    return _this.value;
                }, function () {
                    if (_this.value)
                        _this.modelController.$setViewValue(_this.value.select(function (o) {
                            return o.text;
                        }));
                });
            }
            Tags.prototype.source = function (query) {
                var defer = this.promiseService.defer();
                if (this.attributes['source']) {
                    var sourcePromise = this.scope.$eval('$parent.' + this.attributes['source'], { $query: query });
                    sourcePromise.then(function (result) {
                        return defer.resolve(result);
                    });
                } else
                    defer.resolve([]);
                return defer.promise;
            };
            Tags.Name = 'tags';
            Tags.TemplateUrl = 'ExpenseTracker/Views/Tags.html';
            return Tags;
        })(ExpenseTracker.DirectiveBase);
        Directives.Tags = Tags;

        angular.module('ExpenseTracker.Directives').directive(Tags.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                require: 'ngModel',
                scope: true,
                templateUrl: Tags.TemplateUrl,
                link: function (scope, element, attributes, modelController) {
                    return new Tags(scope, element, attributes, modelController);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var TagsFilter = (function (_super) {
            __extends(TagsFilter, _super);
            function TagsFilter(scope, element, attributes) {
                _super.call(this, scope, element, attributes);
                this.selectedTags = [];

                if (!attributes['source'])
                    throw new ExpenseTracker.ArgumentException('source', 'Grid tags filter data provider property not set');

                this.dataProvider = this.scope.$eval('$parent.' + attributes['source']);
            }
            Object.defineProperty(TagsFilter.prototype, "isSecured", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            TagsFilter.prototype.initialize = function () {
                var _this = this;
                return _super.prototype.initialize.call(this).then(function () {
                    _this.beginUpdate();
                    return _this.expenseService.getAllTags().then(function (tags) {
                        _this.tags = tags;
                        _this.endUpdate();
                    }, function () {
                        return _this.endUpdate();
                    });
                });
            };

            TagsFilter.prototype.toggleFilterType = function () {
                this.isAndFilter = !this.isAndFilter;
                if (this.selectedTags.any())
                    this.filter();
            };

            Object.defineProperty(TagsFilter.prototype, "filterTypeTooltip", {
                get: function () {
                    if (this.isAndFilter)
                        return 'Show expenses that contains ALL selected tags';
                    return 'Show expenses that contain ANY of the selected tags';
                },
                enumerable: true,
                configurable: true
            });

            TagsFilter.prototype.toggle = function (tag) {
                if (this.isSelected(tag))
                    this.selectedTags.remove(tag);
                else
                    this.selectedTags.push(tag);
                this.filter();
            };

            TagsFilter.prototype.filter = function () {
                var query = this.selectedTags.select(function (a) {
                    return a.text;
                }).join(this.isAndFilter ? '&' : '|');
                this.dataProvider.filter(TagsFilter.Name, [{ field: 'tags', query: query }]);
            };

            TagsFilter.prototype.isSelected = function (tag) {
                return this.selectedTags.contains(tag);
            };

            TagsFilter.prototype.clear = function () {
                var hadSelectedTags = this.selectedTags.any();
                this.selectedTags = [];
                if (hadSelectedTags)
                    this.filter();
            };
            TagsFilter.Name = 'tagsFilter';

            TagsFilter.TemplateUrl = 'ExpenseTracker/Views/TagsFilter.html';
            return TagsFilter;
        })(ExpenseTracker.DirectiveBase);
        Directives.TagsFilter = TagsFilter;

        angular.module('ExpenseTracker.Directives').directive(TagsFilter.Name, function () {
            return {
                replace: true,
                restrict: 'E',
                scope: true,
                templateUrl: TagsFilter.TemplateUrl,
                link: function (scope, element, attributes) {
                    return new TagsFilter(scope, element, attributes);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        var Validate = (function (_super) {
            __extends(Validate, _super);
            function Validate(scope, element, attributes, modelController) {
                _super.call(this, scope.$new(), element, attributes);
                if (!attributes['name'])
                    throw new ExpenseTracker.ArgumentException('name', 'Input does not have a name attribute.');

                if (!attributes[Validate.Name])
                    throw new ExpenseTracker.ArgumentException('error container', 'Input does not have an error container specified.');

                this.modelController = modelController;

                this.container = angular.element(attributes[Validate.Name]).addClass('form-validity');
                this.container.append('<i class="glyphicon glyphicon-ok valid" ng-show="$directive.valid"></i>');
                this.container.append('<i class="glyphicon glyphicon-exclamation-sign invalid" ng-show="$directive.invalid" popover="{{ $directive.failedValidationMessage }}" popover-trigger="mouseenter" popover-placement="left"></i>');
                this.compileService(this.container)(this.scope);
            }
            Object.defineProperty(Validate.prototype, "valid", {
                get: function () {
                    return this.modelController.$valid;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Validate.prototype, "invalid", {
                get: function () {
                    return this.modelController.$invalid;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Validate.prototype, "failedValidationMessage", {
                get: function () {
                    var failedValidation;
                    for (var key in this.modelController.$error) {
                        if (this.modelController.$error[key]) {
                            failedValidation = key;
                            break;
                        }
                    }
                    return Validate.ErrorMessages[failedValidation];
                },
                enumerable: true,
                configurable: true
            });
            Validate.Name = 'validate';
            Validate.ErrorMessages = {
                'email': 'Invalid email address. Example: john.smith@email.com',
                'required': 'This field is required'
            };
            return Validate;
        })(ExpenseTracker.DirectiveBase);
        Directives.Validate = Validate;

        angular.module('ExpenseTracker.Directives').directive(Validate.Name, function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: true,
                link: function (scope, element, attributes, modelController) {
                    return new Validate(scope, element, attributes, modelController);
                }
            };
        });
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        (function (Validations) {
            var ValidationBase = (function (_super) {
                __extends(ValidationBase, _super);
                function ValidationBase(scope, element, attributes, modelController) {
                    var _this = this;
                    _super.call(this, scope, element, attributes);
                    this.modelController = modelController;

                    this.modelController.$parsers.unshift(function (viewValue) {
                        return _this.parse(viewValue);
                    });
                    this.modelController.$formatters.push(function (modelValue) {
                        return _this.format(modelValue);
                    });
                }
                ValidationBase.prototype.format = function (modelValue) {
                    throw new ExpenseTracker.NotImplementedException('Format function not defined');
                };

                ValidationBase.prototype.parse = function (viewValue) {
                    throw new ExpenseTracker.NotImplementedException('Parse function not defined');
                };
                return ValidationBase;
            })(ExpenseTracker.DirectiveBase);
            Validations.ValidationBase = ValidationBase;
        })(Directives.Validations || (Directives.Validations = {}));
        var Validations = Directives.Validations;
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        (function (Validations) {
            var ComplexPassword = (function (_super) {
                __extends(ComplexPassword, _super);
                function ComplexPassword(scope, element, attributes, modelController) {
                    _super.call(this, scope, element, attributes, modelController);
                }
                ComplexPassword.prototype.format = function (modelValue) {
                    return modelValue;
                };

                ComplexPassword.prototype.parse = function (viewValue) {
                    if (typeof viewValue === 'undefined' || viewValue === null || viewValue === '')
                        return viewValue;

                    var valid = true;

                    //Ensure password length is > 4
                    if (viewValue.length < 4)
                        valid = false;

                    //Ensure password contains atleast 1 number
                    if (!/[\d]+/.test(viewValue))
                        valid = false;

                    this.modelController.$setValidity(ComplexPassword.Name, valid);
                    return viewValue;
                };
                ComplexPassword.Name = 'complexPassword';
                ComplexPassword.ErrorMessage = 'Password must be 4 or more characters and contain atleast 1 number.';
                return ComplexPassword;
            })(Validations.ValidationBase);
            Validations.ComplexPassword = ComplexPassword;

            angular.module('ExpenseTracker.Directives').directive(ComplexPassword.Name, function () {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    scope: true,
                    link: function (scope, element, attributes, modelController) {
                        return new ComplexPassword(scope.$new(), element, attributes, modelController);
                    }
                };
            });
            Directives.Validate.ErrorMessages[ComplexPassword.Name] = ComplexPassword.ErrorMessage;
        })(Directives.Validations || (Directives.Validations = {}));
        var Validations = Directives.Validations;
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        (function (Validations) {
            var Match = (function (_super) {
                __extends(Match, _super);
                function Match(scope, element, attributes, modelController, formController) {
                    var _this = this;
                    _super.call(this, scope, element, attributes, modelController);
                    this.formController = formController;

                    this.matchingModelController = this.formController[attributes[Match.Name]];
                    if (this.matchingModelController) {
                        this.matchingModelController.$parsers.unshift(function (viewValue) {
                            _this.parse(_this.modelController.$viewValue);
                            return viewValue;
                        });
                    }
                }
                Match.prototype.format = function (modelValue) {
                    return modelValue;
                };

                Match.prototype.parse = function (viewValue) {
                    var valid = true;
                    if (viewValue !== this.matchingModelController.$viewValue)
                        valid = false;

                    this.modelController.$setValidity(Match.Name, valid);
                    return viewValue;
                };
                Match.Name = 'match';
                Match.ErrorMessage = 'Passwords do not match';
                return Match;
            })(Validations.ValidationBase);
            Validations.Match = Match;

            angular.module('ExpenseTracker.Directives').directive(Match.Name, function () {
                return {
                    restrict: 'A',
                    require: ['ngModel', '^form'],
                    scope: true,
                    link: function (scope, element, attributes, controllers) {
                        return new Match(scope.$new(), element, attributes, controllers[0], controllers[1]);
                    }
                };
            });
            Directives.Validate.ErrorMessages[Match.Name] = Match.ErrorMessage;
        })(Directives.Validations || (Directives.Validations = {}));
        var Validations = Directives.Validations;
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
var ExpenseTracker;
(function (ExpenseTracker) {
    (function (Directives) {
        (function (Validations) {
            var UniqueEmail = (function (_super) {
                __extends(UniqueEmail, _super);
                function UniqueEmail(scope, element, attributes, modelController) {
                    _super.call(this, scope, element, attributes, modelController);
                }
                UniqueEmail.prototype.format = function (modelValue) {
                    return modelValue;
                };

                UniqueEmail.prototype.parse = function (viewValue) {
                    var _this = this;
                    if (typeof viewValue === 'undefined' || viewValue === null || viewValue === '')
                        return viewValue;

                    this.userApiResourceService.emailUnique(viewValue).then(function (unique) {
                        _this.modelController.$setValidity(UniqueEmail.Name, unique);
                    });

                    return viewValue;
                };
                UniqueEmail.Name = 'uniqueEmail';
                UniqueEmail.ErrorMessage = 'This email account has been registered already.';
                return UniqueEmail;
            })(Validations.ValidationBase);
            Validations.UniqueEmail = UniqueEmail;

            angular.module('ExpenseTracker.Directives').directive(UniqueEmail.Name, function () {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    scope: true,
                    link: function (scope, element, attributes, modelController) {
                        return new UniqueEmail(scope.$new(), element, attributes, modelController);
                    }
                };
            });
            Directives.Validate.ErrorMessages[UniqueEmail.Name] = UniqueEmail.ErrorMessage;
        })(Directives.Validations || (Directives.Validations = {}));
        var Validations = Directives.Validations;
    })(ExpenseTracker.Directives || (ExpenseTracker.Directives = {}));
    var Directives = ExpenseTracker.Directives;
})(ExpenseTracker || (ExpenseTracker = {}));
/// <reference path="directivebase.ts" />
/// <reference path="alerthandler.ts" />
/// <reference path="captcha.ts" />
/// <reference path="datefilter.ts" />
/// <reference path="datepicker.ts" />
/// <reference path="gridpager.ts" />
/// <reference path="gridtextfilter.ts" />
/// <reference path="menu.ts" />
/// <reference path="popuphandler.ts" />
/// <reference path="tags.ts" />
/// <reference path="tagsfilter.ts" />
/// <reference path="validate.ts" />
/// <reference path="validations/validationbase.ts" />
/// <reference path="validations/complexpassword.ts" />
/// <reference path="validations/match.ts" />
/// <reference path="validations/uniqueemail.ts" />
/// <reference path="expensetracker/configuration.ts"/>
/// <reference path="expensetracker/errors.ts"/>
/// <reference path="expensetracker/abstract/_references.ts"/>
/// <reference path="expensetracker/models/_references.ts" />
/// <reference path="expensetracker/services/_references.ts" />
/// <reference path="expensetracker/controllers/_references.ts" />
/// <reference path="expensetracker/directives/_references.ts" />
//# sourceMappingURL=expensetracker.js.map
