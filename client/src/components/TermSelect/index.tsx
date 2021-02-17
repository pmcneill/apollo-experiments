import React from 'react';

import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { useTermsQuery } from '../../generated/graphql';

export interface Props {
  value?: string,
};

export const TermSelect: React.FC<Props> = ( { value } ) => {
  const { data, error, loading } = useTermsQuery();

  const history = useHistory(),
    location = useLocation();

  const onTermChange = (term_id: string) => {
    const url = `/terms/${term_id}`;

    if ( ! term_id || url == location.pathname ) {
      return;
    }

    history.push(url);
  };


  if ( loading ) {
    return <div>Still loading</div>;
  }

  if ( error || ! data || ! data.terms ) {
    return <div>Huh.  No terms.  Weird, right?</div>;
  }

  return (
    <div>
      Choose a term:
      <select value={value ? value : '0'} onChange={ (evt) => onTermChange(evt.target.value) }>
        { ( ! value ) && <option key="0">Choose</option>}
        {data.terms.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
    </div>
  );
}
