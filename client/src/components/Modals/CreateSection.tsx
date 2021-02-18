import React, { useState } from 'react';

import { Modal, ModalProps } from './Modal';

import useFormData from '../../util/useFormData';
import { useCoursesQuery } from '../../generated/graphql';

import './Modal.css';

export interface CreateSectionData {
  course_id: string,
  section_code: string,
};

export const CreateSection : React.FC<ModalProps> = ( { onSave, ...props } ) => {
  const { data, error, loading } = useCoursesQuery();
  const [ result, update_value ] = useFormData({ course_id: '', section_code: ''});

  if ( loading || error || ! data || !data.courses ) {
    return <div>Loading or failed</div>;
  }

  return (
    <Modal onSave={() => onSave(result)} {...props}>
      <div>
        Course:
        <select name="course_id" onChange={update_value}>
          <option key="none" value="">Choose</option>
          {data.courses.map((c) => (<option key={c.id} value={c.id}>{c.code}</option>))}
        </select>
      </div>

      <div>
        Code: <input type="text" size={5} name="section_code" onChange={update_value}/>
      </div>
    </Modal>
  );
};
