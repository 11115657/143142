import './style.css'
import { App } from './app/App'

const app = new App()
app.start().catch((error) => console.error(error))
