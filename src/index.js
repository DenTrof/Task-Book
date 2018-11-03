import React from 'react'
import { render } from 'react-dom'
import 'assets/styles/styles.scss'
import App from './App'
import { AppContainer } from 'react-hot-loader'



const renderApp = () => {
	render(
		<AppContainer>
			<App />
		</AppContainer>,
		document.querySelector('#root')
	)
}

renderApp(App)