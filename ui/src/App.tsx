import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import './scss/app.scss'

function App() {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/">
          <img src="https://wallpapers.com/images/hd/high-resolution-wood-background-0b661janmvnfqo83.jpg" alt="Background Image" className="home__bg-image" />
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
