import React from 'react';

function Logout({ onLogout }) {
	const handleLogout = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3333/logout', {
				method: 'POST',
				headers: {
					// Add any necessary headers
				},
				// Add any necessary body data
			});

			const data = await response.json();

			// Call onLogout with API message as input
			onLogout(data.message);
		} catch (error) {
			console.error('Logout failed:', error);
			// Handle error here
		}
	};

	return (
		<>
			<button onClick={handleLogout}>
				Logout
			</button>
		</>
	);
}

export default Logout;
