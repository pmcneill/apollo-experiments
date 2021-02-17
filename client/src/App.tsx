import {
  Route,
  Switch,
} from 'react-router-dom';

import { TermSelect } from './components/TermSelect';
import { TermSections } from './components/TermSections';
import { Section } from './components/Section';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/terms/:id">
          <TermSections />
        </Route>

        <Route path="/sections/:id">
          <Section />
        </Route>

        <Route path="/">
          <nav><TermSelect/></nav>

          <header><h2>Registrar Panel</h2></header>

          <div className="content">
            Choose a term.
          </div>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
