import React from 'react';
// Provider rodea toda la aplicación de React y deja usar Apollo
import { ApolloProvider } from 'react-apollo';
// y ApolloClient tendra la configuración
import ApolloClient from 'apollo-boost';

// Colocar Routas del proyecto
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Importamos Components

// Importamos Pages
import home from './pages/home';
import graficas from './pages/graficas';
import crearUsuarios from './pages/crearUsuarios';

// Importar Layout
import Layout from './components/Layout';

//Iniciemos la configuración de Apollo con React.
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});

function App() {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={home} />
						<Route exact path="/intereses" component={graficas} />
						<Route exact path="/usuarios" component={crearUsuarios} />
					</Switch>
				</Layout>
			</BrowserRouter>
		</ApolloProvider>
	);
}

export default App;
