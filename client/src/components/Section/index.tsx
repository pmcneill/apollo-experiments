import {
  useParams,
} from 'react-router-dom';

const data = {
  name: 'Some section you picked',
  code: 'OLMSC-150 or OHARM-101',
  instructors: [
    { id: 2886, name: 'Patrick McNeill' }
  ],
  enrollments: [
    { id: 50, user: { id: 100, name: 'Alice' }, type: 'credit' },
    { id: 51, user: { id: 101, name: 'Bob' }, type: 'degree' },
    { id: 52, user: { id: 102, name: 'Carol' }, type: 'noncredit' },
  ],
};

interface Props {
  term_id: string,
};

export const Section : React.FC<Props> = ({ term_id }) => {
  const { section_id } = useParams<{section_id: string}>();

  return (
    <div>
      <h3>Section {section_id} in {term_id}: {data.code} {data.name}</h3>

      <div>
        Teachers:

        <ul>
          {data.instructors.map((ins) => <li key={ins.id}>{ins.name} ({ins.id})</li>)}
        </ul>
      </div>

      <div>
        Students:

        <ul>
          {data.enrollments.map((enr) => <li key={enr.id}>{enr.user.name} ({enr.user.id}), {enr.type}</li>)}
        </ul>
      </div>
    </div>
  );
}
