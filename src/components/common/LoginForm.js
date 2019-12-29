import React, { Component } from 'react';
import Input from './Input';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                username: '',
                password: '',
            },
            errors: {},
        };
    }

    validate = () => {
        const errors = {};
        const { account } = this.state;
        if (account.username.trim() === '') {
            errors.username = 'Username is required';
        }
        if (account.password.trim() === '') {
            errors.password = 'Password is required';
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const errors = this.validate();

        this.setState({
            errors : errors || {},
        });
        if (errors) {
            return;
        }

        console.log('Submitted')
    };

    handleChange = ({ currentTarget: input }) => {
        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({
            account,
        });
    };
    render() {
        const { account, errors } = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit} action="">
                    <Input
                        name="username"
                        value={account.username}
                        onChange={this.handleChange}
                        label="Username"
                        error={errors.username}
                    ></Input>
                    <Input
                        name="password"
                        value={account.password}
                        onChange={this.handleChange}
                        label="Password"
                        error={errors.password}
                    ></Input>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
