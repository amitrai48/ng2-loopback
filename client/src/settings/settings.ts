import { View, Component } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'settings'
})
@View({
	directives: [ROUTER_DIRECTIVES],
	template: `
	<h1>This is settings </h1>
	<h3><a [router-link]="['/Home']">Home</a></h3>
	`
})
export class Settings {
	
}