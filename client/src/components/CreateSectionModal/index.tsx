import React, { useState } from 'react';

import { Modal, ModalProps } from '../Modal';

import useFormData from '../../util/useFormData';
import {
  useCoursesQuery,
  useCreateSectionMutation,
} from '../../generated/graphql';

export interface CreateSectionData {
  course_id: string,
  section_code: string,
};

export interface CreateSectionProps extends ModalProps {
  term_id: string,
}

export const CreateSectionModal : React.FC<CreateSectionProps> = ( { term_id, onSave, ...props } ) => {
  const { data, error, loading } = useCoursesQuery();
  const [ values, update_value ] = useFormData({ course_id: '', section_code: ''});

  const [ createSectionMutation ] = useCreateSectionMutation({
    variables: {
      course_id: '',
      term_id,
      code: '',
    },
  });

  const saveModal = async () => {
    if ( ! values.section_code || ! values.course_id ) {
      alert("Please fill in the fields");
      return false;
    }

    let saved = await createSectionMutation({
      variables: {
        course_id: values.course_id,
        term_id,
        code: values.section_code,
      }
    });

    console.log(saved);

    // Bubble back up to the parent do they can reload or what have you.
    onSave(saved);
  };


  if ( loading || error || ! data || !data.courses ) {
    return <div>Loading or failed</div>;
  }

  return (
    <Modal onSave={saveModal} {...props}>
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
