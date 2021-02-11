import {
  useRouteMatch,
  useParams,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { Section } from '../Section';

const sections = [
  { id: 10, code: 'OLMSC-150.01', name: 'Programming' },
  { id: 11, code: 'OLMSC-150.02', name: 'Programming' },
  { id: 12, code: 'OHARM-101.01', name: 'Music Theory' },
  { id: 13, code: 'OHARM-101.01', name: 'Music Theory' },
];

export function TermSections() {
  let { url } = useRouteMatch();
  let { term_id } = useParams<{term_id: string}>();

  return (
    <div>
      <Switch>
        <Route path={`${url}/sections/:section_id`}><Section term_id={term_id}/></Route>
        <Route exact path={url}>
          <h2>Term {term_id} Sections</h2>

          <ul>
            {sections.map((sec) => (
              <li key={sec.id}><Link to={`${url}/sections/${sec.id}`}>{sec.code}: {sec.name}</Link></li>
            ))}
          </ul>
        </Route>
      </Switch>
    </div>
  );
};
