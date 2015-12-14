import { View, Component, FormBuilder, Validators,FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES } from 'angular2/router';
import { Http, Headers } from 'angular2/http';

class Todo{
	id: string;
	title: string;
	checked: boolean;
}

var TODOS : Todo[]=[
{'id':'123abcv','title':'Multitenancy in Strongloop'},
{'id':'141asd','title':'Todo with angular'}
]

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
		    background-color: rgba(245, 245, 245, 0.33);
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
			content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
		}

		.toggle.completed:after{
			content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
		}

		.panel-body a .todo-title.completed{
			text-decoration : line-through;
			color:#A7A2A2
		}
	`]
})
export class Home {
	number: number;
	http: Http;
	allSelected: boolean;
	formBuilder: FormBuilder;
	constructor(http: Http, formBuilder : FormBuilder){
		this.http = http;
		this.allSelected = false;
		this.todoForm = formBuilder.group({
			title:['',Validators.required]
		});
		this.getTodo();

	};

	getTodo(){
		this.http.get('http://localhost:3000/api/superman/todos')
			.map(res => res.json())
			.subscribe(
			data => (this.todos = data,console.log(data)),
			err => console.log(err));
	}
	getNumber(){
		this.http.get('http://localhost:3000/getNumber')
			.map(res => res.json())
			.subscribe(
			data => this.number = data,
			err=> console.log(err));
	}

	todoToggle(todo){
		todo.completed = !todo.completed;
		var bool = true;
		for (var i = 0; i < this.todos.length; i++) {
			if(!this.todos[i].completed){
				bool = false;
				break;
			}
		}
		this.allSelected = bool;
	}
	selectAll(){
		this.allSelected = !this.allSelected;
		for (var i = 0; i <this.todos.length;i++){
			this.todos[i].completed = this.allSelected;
		}
	}

	addTodo(){
		var value = this.todoForm.value;
		this.todoForm = new FormBuilder().group({
			title: ['', Validators.required]
		});
		value.checked = false;
		this.http.post('http://localhost:3000/api/superman/todos', JSON.stringify(value), {
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.map(res => res.json())
			.subscribe(
			data => (console.log(data),this.getTodo()),
			err => console.log(err)
			);

	}
}

