import React, { useState } from 'react';

import { Modal, ModalProps } from '../Modal';

import useFormData from '../../util/useFormData';
import {
  useCreateUserMutation,
  useEnrollMutation,
  useUsersQuery,
} from '../../generated/graphql';

export interface EnrollmentData {
  section_id: string,
  type: string,
  user_id?: string,
  first?: string,
  last?: string,
  email?: string,
};

export interface EnrollProps extends ModalProps {
  section_id: string,
}

export const EnrollModal : React.FC<EnrollProps> = ( { section_id, onSave, ...props } ) => {
  const { data, error, loading } = useUsersQuery();
  const [ values, update_value ] = useFormData({
    section_id,
    type: 'credit',
    user_id: '',
    first: '',
    last: '',
    email: '',
  });

  const [ createUserMutation ] = useCreateUserMutation({
    variables: {
      first: '',
      last: '',
      email: '',
    },
  });

  const [ enrollMutation ] = useEnrollMutation({
    variables: {
      section_id,
      type: 'credit',
      user_id: '',
    }
  });

  const saveModal = async () => {
    let saved = await enrollMutation({
      variables: {
        section_id,
        type: values.type,
        user_id: values.user_id,
      }
    });

    console.log(saved);

    onSave(saved);
  };


  if ( loading || error || ! data || !data.users ) {
    return <div>Loading or failed</div>;
  }

  return (
    <Modal onSave={saveModal} {...props}>
      <div>
        Type:
        <select name="type" onChange={update_value}>
          <option value="credit">Credit</option>
          <option value="noncredit">Non-Credit</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <div>
        User ID: <input type="text" size={5} name="user_id" onChange={update_value}/>
      </div>
    </Modal>
  );
};
