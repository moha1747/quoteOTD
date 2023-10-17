import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
// import Store from '../store.js'

function Root() {
  return <App />

}

ReactDOM.render(<Root />, document.getElementById("root"));
