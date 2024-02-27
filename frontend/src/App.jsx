import React from 'react';

import './App.css';
import Login from './Login';
import Fact from './Fact';
import Logout from './Logout';

function App() {
    const [token, setToken] = React.useState('');

    return (
        <div className="app">
            {/* Display login form if token is not set. */}
            <Login />

            {/* Display fact and logout if token is set. */}
            {/*<Fact />*/}
        </div>
    );
}

export default App;
