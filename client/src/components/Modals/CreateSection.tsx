import React, { useState } from 'react';

import { Modal, ModalProps } from './Modal';

import useFormData from '../../util/useFormData';

import './Modal.css';

export interface CreateSectionData {
  course: string,
  section_code: string,
};

export const CreateSection : React.FC<ModalProps> = ( { onSave, ...props } ) => {
  const [ result, update_value ] = useFormData({ course: '', section_code: ''});

  return (
    <Modal onSave={() => onSave(result)} {...props}>
      Course: <input type="text" size={30} name="course" onChange={update_value}/>
      Code: <input type="text" size={5} name="section_code" onChange={update_value}/>
    </Modal>
  );
};
