import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Fact from './Fact';
import Logout from './Logout';

function App() {
    const [token, setToken] = useState('');
    const [fact, setFact] = useState('');

    const performLogin = async (username, password) => {
        const response = await fetch('http://localhost:3333/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.uuid) {
            // Authenticated
            const token = data.uuid;
            setToken(token);
        } else {
            // Authentication failed
            const message = data.message;
            console.log("Authentication failed:", message);
        }
    }

    const getFact = async () => {
        const response = await fetch('http://localhost:3333/fact', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            const fact = data.fact;
            setFact(fact);
        } else {
            console.log("Failed to fetch fact.");
        }
    }

    useEffect(() => {
        if (token) {
            getFact();
        }
    }, [token]);

    const handleLogin = (username, password) => {
        performLogin(username, password);
    }

    return (
        <div className="app">
            {!token && <Login onLogin={handleLogin} />}
            {token && <Fact fact={fact} />}
            {token && <Logout />}
        </div>
    );
}

export default App;
