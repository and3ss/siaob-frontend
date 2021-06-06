import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { HashRouter  } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { AuthProvider } from './contexts/auth';
import Layout from './layout';
import Routes from './routes';
import './App.css';

const history = createBrowserHistory();

function App() {
	return (
		<ThemeProvider theme={theme}>
			<HashRouter history={history}>
				<AuthProvider>
					<Layout>
						<Routes />
					</Layout>
				</AuthProvider>
			</HashRouter >
		</ThemeProvider>
	);
}

export default App;
