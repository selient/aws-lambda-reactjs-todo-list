import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.addTodo(this.state.name);
        this.setState({ name: '' });
    }

    onChange(e) {
        this.setState({ name: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="form">
                <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Add Todo..."
                    value={this.state.name}
                    onChange={this.onChange}
                />
            </form>
        );
    }
}

// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default AddTodo;
