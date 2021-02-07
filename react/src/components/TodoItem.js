import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    render() {
        const { id, name, done } = this.props.todo;
        const todoClass = done ? 'done' : 'undone';
        return (
            <li>
                <label className={todoClass}>
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={this.props.handleTodo.bind(this, id, !done)}
                    />
                    {name}
                </label>
                <button className="deleteBtn" onClick={this.props.delTodo.bind(this, id)}>
                    Delete
                </button>
            </li>
        );
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    delTodo: PropTypes.func.isRequired,
    handleTodo: PropTypes.func.isRequired
};

export default TodoItem;
