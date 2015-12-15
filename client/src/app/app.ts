import { View, Component } from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteConfig, Location, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, Route, AsyncRoute, Router} from 'angular2/router';

import {Home} from '../home/home';
import {Settings} from '../settings/settings';


@Component({
	selector:'my-app'
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl:'src/app/app.html'
})
@RouteConfig([
	{ path: '/', redirectTo: '/home/superman' },
	{ path: '/home/:tenant', as:'Home', component: Home},
	{ path: '/details', as:'Details', component: Settings}
])
 export class App {
	constructor(public router: Router){

	}
}