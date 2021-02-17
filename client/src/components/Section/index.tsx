import {
  useParams,
  Link,
} from 'react-router-dom';

import { TermSelect } from '../TermSelect';

import { useSectionQuery } from '../../generated/graphql';

export const Section : React.FC = () => {
  const { id } = useParams<{id: string}>();

  const { data, error, loading } = useSectionQuery({ variables: { id } });

  if ( loading ) {
    return <div>Still loading</div>;
  }

  if ( error || ! data || ! data.section ) {
    return <div>Huh.  No section data.  Weird, right? {error && error.message}</div>;
  }


  return (
    <>
      <nav>
        <TermSelect value={data.section.term.id}/>

        <ul>
          <li><Link to={`/terms/reports`}>Reports</Link></li>
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

