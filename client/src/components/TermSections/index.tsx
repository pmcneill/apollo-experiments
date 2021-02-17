import {
  useRouteMatch,
  useParams,
  Link,
} from 'react-router-dom';

import {
  useTermSectionsQuery,
} from '../../generated/graphql';

import { TermSelect } from '../TermSelect';

export function TermSections() {
  const { url } = useRouteMatch();
  const { id } = useParams<{id: string}>();

  const { data, error, loading } = useTermSectionsQuery( { variables: { id } } );

  if ( loading ) {
    return <div>Still loading</div>;
  }

  if ( error || ! data || ! data.term ) {
    return <div>Huh.  No term.  Weird, right?</div>;
  }

  return (
    <>
      <nav><TermSelect value={id}/></nav>
      <header><h2>{data.term.name} Sections</h2></header>

      <div className="content">
        <ul>
          {data.term.sections && data.term.sections.map((sec) => (
            <li key={sec.id}><Link to={`/sections/${sec.id}`}>
              {sec.course.code}.{sec.code}: {sec.course.name}
            </Link></li>
          ))}
        </ul>
      </div>
    </>
  );
};
