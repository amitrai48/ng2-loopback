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
var http_1 = require('angular2/http');
var Todo = (function () {
    function Todo() {
    }
    return Todo;
})();
var TODOS = [
    { 'id': '123abcv', 'title': 'Multitenancy in Strongloop' },
    { 'id': '141asd', 'title': 'Todo with angular' }
];
var Home = (function () {
    function Home(http, formBuilder) {
        this.http = http;
        this.allSelected = false;
        this.todoForm = formBuilder.group({
            title: ['', angular2_1.Validators.required]
        });
        this.getTodo();
    }
    ;
    Home.prototype.getTodo = function () {
        var _this = this;
        this.http.get('http://localhost:3000/api/superman/todos')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return (_this.todos = data, console.log(data)); }, function (err) { return console.log(err); });
    };
    Home.prototype.getNumber = function () {
        var _this = this;
        this.http.get('http://localhost:3000/getNumber')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.number = data; }, function (err) { return console.log(err); });
    };
    Home.prototype.todoToggle = function (todo) {
        todo.completed = !todo.completed;
        var bool = true;
        for (var i = 0; i < this.todos.length; i++) {
            if (!this.todos[i].completed) {
                bool = false;
                break;
            }
        }
        this.allSelected = bool;
    };
    Home.prototype.selectAll = function () {
        this.allSelected = !this.allSelected;
        for (var i = 0; i < this.todos.length; i++) {
            this.todos[i].completed = this.allSelected;
        }
    };
    Home.prototype.addTodo = function () {
        var _this = this;
        var value = this.todoForm.value;
        this.todoForm = new angular2_1.FormBuilder().group({
            title: ['', angular2_1.Validators.required]
        });
        value.checked = false;
        this.http.post('http://localhost:3000/api/superman/todos', JSON.stringify(value), {
            headers: new http_1.Headers({
                'Content-Type': 'application/json'
            })
        })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return (console.log(data), _this.getTodo()); }, function (err) { return console.log(err); });
    };
    Home = __decorate([
        angular2_1.Component({
            selector: 'home'
        }),
        angular2_1.View({
            directives: [router_1.ROUTER_DIRECTIVES, angular2_1.FORM_DIRECTIVES],
            templateUrl: 'src/home/home.html',
            styles: ["\n\t\t.panel-default{\n\t\t\tmax-width: 500px;\n    \t\tmargin: 0 auto;\n\t\t}\n\t\t.todo-input{\n\t\t\tpadding: 16px 16px 16px 60px;\n\t\t    /* text-align: center; */\n\t\t    font-size: 24px;\n\t\t    font-family: cursive;\n\t\t    border: none;\n\t\t    background-color: rgba(245, 245, 245, 0.33);\n\t\t    outline: none;\n\t\t}\n\n\t\t.panel-default>.panel-heading{\n\t\t\tbackground-color: #FFFCFC;\n\t\t\tposition:relative;\n\t\t}\n\n\t\t.panel-heading .toggle{\n\t\t\tleft:0;\n\t\t}\n\n\t\t.panel-body{\n\t\t\tpadding: 0px;\n\t\t\tborder-bottom: 1px solid #DDD;\n\t\t\tposition:relative;\n\t\t}\n\n\t\t.panel-body a{\n\t\t\tpadding: 15px 60px 15px 15px;\n\t\t    margin-left: 50px;\n\t\t    float: left;\n\t\t    text-decoration:none;\n\t\t}\n\n\t\t.panel-body a .todo-title{\n\t\t\t    font-size: 16px;\n    font-family: cursive;\n    color: #333;\n\t\t}\n\n\t\t.toggle{\n\t\t\t-webkit-appearance:none;\n\t\t\tappearance:none;\n\t\t\theight:40px;\n\t\t\twidth:40px;\n\t\t\tposition:absolute;\n\t\t\ttop:0;\n\t\t\tbottom: 0;\n    \t\tmargin: auto 0;\n    \t\toutline: none !important;\n    \t\tborder:none;\n    \t\tbackground:none;\n\t\t}\n\t\t.toggle:after{\n\t\t\tcontent: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#ededed\" stroke-width=\"3\"/></svg>');\n\t\t}\n\n\t\t.toggle.completed:after{\n\t\t\tcontent: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#bddad5\" stroke-width=\"3\"/><path fill=\"#5dc2af\" d=\"M72 25L42 71 27 56l-4 4 20 20 34-52z\"/></svg>');\n\t\t}\n\n\t\t.panel-body a .todo-title.completed{\n\t\t\ttext-decoration : line-through;\n\t\t\tcolor:#A7A2A2\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [http_1.Http, angular2_1.FormBuilder])
    ], Home);
    return Home;
})();
exports.Home = Home;
//# sourceMappingURL=home.js.map