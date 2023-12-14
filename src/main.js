import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'

// CSS 
import "./Assets/css/style.css"

// Boostrap
import "bootstrap/dist/css/bootstrap.css";
import Bootstrap from "bootstrap/dist/js/bootstrap.bundle.js"


const app = createApp(App);

app.use(router);
app.use(Bootstrap);

app.mount('#app')
