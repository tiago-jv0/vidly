import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/Movies';
import NavBar from './components/common/NavBar';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import MovieForm from './components/MovieForm';
import LoginForm from './components/common/LoginForm';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationItems: ['Movies', 'Customers', 'Rentals' , 'Login'],
        };
    }
    render() {
        return (
            <React.Fragment>
                <NavBar items={this.state.navigationItems}></NavBar>

                <main className="container">
                    <Switch>
                        <Route path='/Movies/:id' component={MovieForm}/>
                        <Route path='/Login' component={LoginForm}/>
                        <Route path="/Movies" component={Movies} />
                        <Route path="/Customers" component={Customers} />
                        <Route path="/Rentals" component={Rentals} />
                        <Route path="/Not-found" component={NotFound} />
                        <Redirect from="/" to="/Movies" exact={true} />
                        <Redirect to="/not-found"></Redirect>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
