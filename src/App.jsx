import React, { Component } from 'react';
import Add from './components/Form/Add';
import List from './components/Form/List';
import context from './store';
import user from './logic/user';
let { Provider } = context;

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: user(this)
        };
    }
    render() {
        return (
            <Provider value={this.state.users}>
                <Add></Add>
                <List></List>
            </Provider>
        );
    }
}

export default App;
