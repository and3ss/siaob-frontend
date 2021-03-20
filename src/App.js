import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from './contexts/auth';

import Layout from './layout';
import Routes from './routes';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Layout>
					<Routes />
				</Layout>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
