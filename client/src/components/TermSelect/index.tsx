import React from 'react';

import { useParams } from 'react-router-dom';

interface Props {
  onTermChange: (id: number) => void,
};

export const TermSelect: React.FC<Props> = ( { onTermChange } ) => {
  const { term_id } = useParams<{ term_id: string | undefined }>();

  const terms = [{ id: 1, name: 'Term 1' }, { id: 2, name: 'Term 2' }];

  return (
    <div>
      Choose a term:
      <select value={term_id ? term_id : '0'} onChange={ (evt) => onTermChange(+evt.target.value) }>
        { ( ! term_id ) && <option key="0">Choose</option>}
        {terms.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
    </div>
  );
}
