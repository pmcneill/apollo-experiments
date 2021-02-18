import {
  useState
} from 'react';

import {
  useRouteMatch,
  useParams,
  Link,
} from 'react-router-dom';

import {
  useTermSectionsQuery,
} from '../../generated/graphql';

import { TermSelect } from '../TermSelect';

import { CreateSection } from '../Modals/CreateSection';

export function TermSections() {
  const { url } = useRouteMatch();
  const { id } = useParams<{id: string}>();

  const { data, error, loading } = useTermSectionsQuery( { variables: { id } } );

  let [ showCreateModal, setShowCreateModal ] = useState(false);

  if ( loading ) {
    return <div>Still loading</div>;
  }

  if ( error || ! data || ! data.term ) {
    return <div>Huh.  No term.  Weird, right?</div>;
  }

  const showModal = () => setShowCreateModal(true);
  const hideModal = () => setShowCreateModal(false);

  const saveModal = (values: Record<string, string>) => {
    console.log("SAVED!");
    for ( let k in values ) {
      console.log(`${k} => ${values[k]}`);
    }
    hideModal();
  };

  return (
    <>
      <CreateSection isVisible={showCreateModal} onSave={saveModal} onCancel={hideModal}/>

      <nav>
        <TermSelect value={id}/>

        <a onClick={showModal}>Create Section</a>
      </nav>
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
