import { BrowserRouter as Router, Route } from 'react-router-dom';

import MenuBar from './Components/MenuBar';
import Home from './Components/pages/Home';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className='ui container'>
        <MenuBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </div>
    </Router>
  );
}

export default App;
