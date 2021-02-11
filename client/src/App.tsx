import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
  useHistory,
  useParams,
} from 'react-router-dom';

import { TermSelect } from './components/TermSelect';
import { TermSections } from './components/TermSections';

import './App.css';

function App() {
  const history = useHistory();

  const onTermChange = (term_id: number) => {
    if ( ! term_id ) return;
    history.push(`/terms/${term_id}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Registrar Panel</h3>
      </header>
      <nav>
        <TermSelect onTermChange={onTermChange} />
      </nav>

      <div>
        <Switch>
          <Route path="/terms/:term_id"><TermSections /></Route>
          <Route path="/">Welcome!  Pick a Term</Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
