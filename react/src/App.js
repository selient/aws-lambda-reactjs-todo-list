// Importing Modules
import React, { Component } from 'react';
// import axios from 'axios';

// Importing React-Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing Components
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

// Constant
import { LAMBDA_HOST } from './constant';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { todoList: [] };
        this.delTodo = this.delTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.handleTodo = this.handleTodo.bind(this);
    }

    async componentDidMount() {
        let response = await fetch(LAMBDA_HOST).then((res) => res.json());
        this.setState({ todoList: response });
    }

    // Delete Todo
    async delTodo(id) {
        await fetch(`${LAMBDA_HOST}/${id}`, {
            method: 'delete',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let index = this.state.todoList.findIndex((e) => e.id === id);
        this.setState({
            todoList: [
                ...this.state.todoList.slice(0, index),
                ...this.state.todoList.slice(index + 1)
            ]
        });
    }

    async addTodo(name) {
        let response = await fetch(`${LAMBDA_HOST}`, {
            method: 'post',
            body: JSON.stringify({
                name
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
        this.setState({
            todoList: [...this.state.todoList, response]
        });
    }

    async handleTodo(id, done) {
        await fetch(`${LAMBDA_HOST}/${id}`, {
            method: 'put',
            body: JSON.stringify({
                done
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let index = this.state.todoList.findIndex((e) => e.id === id);
        this.setState({
            todoList: [
                ...this.state.todoList.slice(0, index),
                {
                    ...this.state.todoList[index],
                    done
                },
                ...this.state.todoList.slice(index + 1)
            ]
        });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <br />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <React.Fragment>
                                    <AddTodo addTodo={this.addTodo} />
                                    <TodoList
                                        todoList={this.state.todoList}
                                        delTodo={this.delTodo}
                                        handleTodo={this.handleTodo}
                                    />
                                </React.Fragment>
                            )}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
