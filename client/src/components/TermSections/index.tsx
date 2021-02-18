import {
  useState
} from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import {
  useTermSectionsQuery,
} from '../../generated/graphql';

import { TermSelect } from '../TermSelect';

import { CreateSectionModal } from '../CreateSectionModal';

export function TermSections() {
  const { id } = useParams<{id: string}>();

  const { data, error, loading, refetch } = useTermSectionsQuery( { variables: { id } } );

  let [ showCreateModal, setShowCreateModal ] = useState(false);

  if ( loading ) {
    return <div>Still loading</div>;
  }

  if ( error || ! data || ! data.term ) {
    return <div>Huh.  No term.  Weird, right?</div>;
  }

  const showModal = () => setShowCreateModal(true);
  const hideModal = () => setShowCreateModal(false);

  // this will get an argument like "data.createSection.{id, sis_id, code}"
  const saveModal = async () => {
    // This would be better done by https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-after-a-mutation
    await refetch();

    hideModal();

    return true;
  };

  return (
    <>
      <CreateSectionModal term_id={id} isVisible={showCreateModal} onSave={saveModal} onCancel={hideModal}/>

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
