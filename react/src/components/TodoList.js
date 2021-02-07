import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

class TodoList extends Component {
    render() {
        return (
            <ul className="todoList">
                {this.props.todoList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        handleTodo={this.props.handleTodo}
                        delTodo={this.props.delTodo}
                    />
                ))}
            </ul>
        );
    }
}

// PropTypes
TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    delTodo: PropTypes.func.isRequired,
    handleTodo: PropTypes.func.isRequired
};

export default TodoList;
