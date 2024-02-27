import React from 'react';

function Login({ onLogin }) {
	const handleSubmit = async (e) => {
		e.preventDefault();

		const username = e.target.username.value;
		const password = e.target.password.value;

		try {
			const response = await performLogin(username, password);
			if (response.token) {
				onLogin(response.token);
			} else {
				throw new Error('Token not found in response');
			}
		} catch (error) {
			console.error('Login failed:', error.message);
		}
	}

const performLogin = async (username, password) => {
    try {
        const response = await fetch('http://localhost:3333/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (response.ok && data.message === 'The username and password is correct.') {
            const token = data.token;
            return { token };
        } else {
            throw new Error(data.message || 'Authentication failed');
        }
    } catch (error) {
        throw new Error('Failed to perform login: ' + error.message);
    }
}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 5 }}>
					<label htmlFor='username'>Username: </label>
					<input id='username' name='username' type='text' />
				</div>

				<div style={{ marginBottom: 5 }}>
					<label htmlFor='password'>Password: </label>
					<input id='password' name='password' type='password' />
				</div>

				<button type='submit'>Login</button>
			</form>
		</>
	);
}

export default Login;
