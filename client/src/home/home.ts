import { View, Component,FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES,RouteParams } from 'angular2/router';
import { Http, Headers } from 'angular2/http';

class Todo{
	id: string;
	title: string;
	completed: boolean;
}

@Component({
	selector: 'home'
})
@View({
	directives: [ROUTER_DIRECTIVES,FORM_DIRECTIVES],
	templateUrl: 'src/home/home.html',
	styles: [`
		.panel-default{
			max-width: 500px;
    		margin: 0 auto;
		}
		.todo-input{
			padding: 16px 16px 16px 60px;
		    /* text-align: center; */
		    font-size: 24px;
		    font-family: cursive;
		    border: none;
		    background-color: rgb(255, 252, 252);
		    outline: none;
		}

		.panel-default>.panel-heading{
			background-color: #FFFCFC;
			position:relative;
		}

		.panel-heading .toggle{
			left:0;
		}

		.panel-body{
			padding: 0px;
			border-bottom: 1px solid #DDD;
			position:relative;
		}

		.panel-body a{
			padding: 15px 60px 15px 15px;
		    margin-left: 50px;
		    float: left;
		    text-decoration:none;
		}

		.panel-body a .todo-title{
			    font-size: 16px;
    font-family: cursive;
    color: #333;
		}

		.toggle{
			-webkit-appearance:none;
			appearance:none;
			height:40px;
			width:40px;
			position:absolute;
			top:0;
			bottom: 0;
    		margin: auto 0;
    		outline: none !important;
    		border:none;
    		background:none;
		}
		.toggle:after{
			content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ddd" stroke-width="5"/></svg>');
		}

		.toggle.completed:after{
			content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="5"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
		}

		.panel-body a .todo-title.completed{
			text-decoration : line-through;
			color:#A7A2A2
		}

		.panel-footer{
			height:50px;
		}

		.panel-footer .todo-count{
			    float: left;
    			text-align: left;
    			font-family: cursive;
    			width: 30%;
		}

		.panel-footer .todo-filter{
			float:right;
			list-style:none;
		}

		.panel-footer .todo-filter li{
			float:left;
			padding: 0px 10px;
			font-family:cursive;
			cursor:pointer;
		}

		.panel-footer .todo-filter .selected{
			border: 1px solid #B1A9A9;
   			border-radius: 4px;
		}
		.panel-body .remove{
			color: red;
		    position: absolute;
		    right: 10px;
		    top: 26%;
		    padding: 4px;
		    cursor: pointer;
		    font-weight: 600;
		    display:none;
		}

		.panel-body:hover .remove{
			display:initial;
		}
	`]
})
export class Home {
	number: number;
	http: Http;
	allSelected: boolean;
	tenant: string;
	todo: Todo;
	remaining: number;
	state: string;
	constructor(http: Http,params : RouteParams){
		this.http = http;
		this.allSelected = false;
		this.state = 'ALL';
		this.tenant = params.get('tenant');
		if (!this.tenant)
			this.tenant = "ironman";
		this.getTodo();
		this.todo = new Todo();

	};

	getTodo(state){
		var url = 'http://localhost:3000/api/' + this.tenant + '/todos';
		if (state == 'ACTIVE')
			url = url + '?filter={"where":{"completed":false}}';
		else if(state =='COMPLETED')
			url = url + '?filter={"where":{"completed":true}}';
		this.http.get(url)
			.map(res => res.json())
			.subscribe(
			data => (this.todos = data,console.log(data),this.ifAllSelcted()),
			err => console.log(err));
	}

	ifAllSelcted() {
		var bool = true;
		this.remaining = 0;
		for (var i = 0; i < this.todos.length; i++) {
			if (!this.todos[i].completed) {
				bool = false;
				this.remaining++;
			}
		}
		this.allSelected = bool;
	}

	todoToggle(todo){
		todo.completed = !todo.completed;
		this.editTodo(todo);
		
	}

	
	selectAll(){
		this.allSelected = !this.allSelected;
		for (var i = 0; i <this.todos.length;i++){
			this.todos[i].completed = this.allSelected;
			this.editTodo(this.todos[i]);
		}
	}

	editTodo(todo){
		this.http.post('http://localhost:3000/api/' + this.tenant + '/todos/update?where={"id":"' + todo.id + '"}', JSON.stringify(todo), {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.map(res => res.json())
			.subscribe(
			data => (this.getTodo(this.state)),
			err => console.log(err)
			);
	}

	addTodo(){
		var value = this.todo;
		value.completed = false;
		this.http.post('http://localhost:3000/api/'+this.tenant+'/todos', JSON.stringify(value), {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.map(res => res.json())
			.subscribe(
			data => (console.log(data), this.todo.title = "",this.getTodo(this.state)),
			err => console.log(err)
			);

	}

	filter(state){
		if(state!=this.state){
			this.state = state;
			this.getTodo(this.state);
		}
		
	}

	remove(todo){
		this.http.delete('http://localhost:3000/api/' + this.tenant + '/todos/' + todo.id, {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.map(res => res.json())
			.subscribe(
			data => this.getTodo(this.state),
			err => console.log(err)
			);
	}
}

