import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import Layout from './layout';
import Routes from './routes';
import './App.css';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<AuthProvider>
					<Layout>
						<Routes />
					</Layout>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
