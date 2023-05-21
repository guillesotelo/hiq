import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import './scss/app.scss'

function App() {
  return (
    <BrowserRouter>

      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
