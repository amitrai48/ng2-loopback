var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var home_1 = require('../home/home');
var settings_1 = require('../settings/settings');
var App = (function () {
    function App(router) {
        this.router = router;
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: 'src/app/app.html'
        }),
        router_1.RouteConfig([
            { path: '/', redirectTo: '/home/superman' },
            { path: '/home/:tenant', as: 'Home', component: home_1.Home },
            { path: '/details', as: 'Details', component: settings_1.Settings }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=app.js.map