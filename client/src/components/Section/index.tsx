import {
  useState,
} from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import { TermSelect } from '../TermSelect';
import { EnrollModal } from '../EnrollModal';

import { useSectionQuery } from '../../generated/graphql';

export const Section : React.FC = () => {
  const { id } = useParams<{id: string}>();
  const { data, error, loading, refetch } = useSectionQuery({ variables: { id } });
  const [ showEnrollModal, setShowEnrollModal ] = useState(false);

  if ( loading ) {
    return <div>Still loading</div>;
  }

  if ( error || ! data || ! data.section ) {
    return <div>Huh.  No section data.  Weird, right? {error && error.message}</div>;
  }


  const showModal = () => setShowEnrollModal(true);
  const hideModal = () => setShowEnrollModal(false);

  const saveModal = async () => {
    await refetch();
    hideModal();
  };

  return (
    <>
      <EnrollModal section_id={id} isVisible={showEnrollModal} onSave={saveModal} onCancel={hideModal} />
      <nav>
        <TermSelect value={data.section.term.id}/>

        <ul>
          <li><button onClick={showModal}>Enroll</button></li>
        </ul>
      </nav>

      <header>
        <div className="term">
          <Link to={`/terms/${data.section.term.id}`}>{data.section.term.name}</Link>
        </div>
        <h2>{data.section.course.code}.{data.section.code}: {data.section.course.name}</h2>
      </header>

      <div className="content">
        <div>
          Teachers:

          <ul>
            {data.section.teachers.map((tch) => <li key={tch.id}><Link to={`/users/${tch.user.id}`}>{tch.user.name}</Link></li>)}
          </ul>
        </div>

        <div>
          Students:

          <ul>
            {data.section.students.map((stu) => <li key={stu.id}><Link to={`/users/${stu.user.id}`}>{stu.user.name}</Link> - {stu.type}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}

