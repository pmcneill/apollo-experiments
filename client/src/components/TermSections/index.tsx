import {
  useState
} from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import {
  useCreateSectionMutation,
  useTermSectionsQuery,
} from '../../generated/graphql';

import { TermSelect } from '../TermSelect';

import { CreateSection } from '../Modals/CreateSection';

export function TermSections() {
  const { id } = useParams<{id: string}>();

  const { data, error, loading, refetch } = useTermSectionsQuery( { variables: { id } } );
  const [ createSectionMutation, { data: cs_data } ] = useCreateSectionMutation({
    variables: {
      course_id: '',
      term_id: id,
      code: '',
    },
  });

  let [ showCreateModal, setShowCreateModal ] = useState(false);

  if ( loading ) {
    return <div>Still loading</div>;
  }

  if ( error || ! data || ! data.term ) {
    return <div>Huh.  No term.  Weird, right?</div>;
  }

  const showModal = () => setShowCreateModal(true);
  const hideModal = () => setShowCreateModal(false);

  const saveModal = async (values: Record<string, string>) => {
    console.log("hello world");
    console.log(values);
    if ( ! values.section_code || ! values.course_id ) {
      alert("Please fill in the fields");
      return false;
    }

    await createSectionMutation({
      variables: {
        course_id: values.course_id,
        term_id: id,
        code: values.section_code,
      }
    });

    // This would be better done by https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-after-a-mutation
    await refetch();

    hideModal();

    return true;
  };

  if ( cs_data && cs_data.createSection.id ) {
    console.log(`created section ${cs_data.createSection.id}`);
  }

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
