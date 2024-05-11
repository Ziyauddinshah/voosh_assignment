import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/homepage';
import NavbarPage from './components/navbarpage';
import LoginUserPage from './components/login-user';
import AddUserPage from './components/add-user';
import SaveOrderPage from './components/add-order';


function App() {
  return (
    <Router>
      <div className="App">
        <NavbarPage />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login-user" component={LoginUserPage}/>
          <Route exact path="/add-user" component={AddUserPage}/>
          <Route exact path="/add-order" component={SaveOrderPage} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;