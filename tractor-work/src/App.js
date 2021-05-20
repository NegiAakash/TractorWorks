import Header from './Components/Header';
import AdminPanel from './Components/AdminPanel';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './Styles/App.css';

function App() {

 
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route path="/admin" >
        <AdminPanel></AdminPanel>
      </Route>
      <Route path="/" exact>
      <div className="AppHeader">
        <Header></Header>
      </div>
      </Route>
      
      </Switch>
      </Router>
    </div>
  );
}

export default App;
