import React from 'react';

import './Modal.css';

export interface ModalProps {
  /**
   * Whether to display the modal
   */
  isVisible: boolean,

  /**
   * Callback when the modal's "save" button is pressed.
   * Up to whatever component this is wrapping to grab
   * that and read in any values it needs
   */
  onSave: (values: Record<string, any>) => void,

  /**
   * Called when the modal is closed (X, Cancel, or clicking background)
   */
  onCancel: () => void,
}

export const Modal: React.FC<ModalProps> = ({ isVisible, onSave, onCancel, children }) => {
  // my CSS is lacking, or my understanding of click events.  the click event on the
  // window is propagating to the background and always closing it.
  //  <div className={"modal-bg " + (isVisible ? "" : "hidden")} onClick={onCancel}>
  return (
    <div className={"modal-bg " + (isVisible ? "" : "hidden")}>
      <div className="modal">
        <div className="closeButton" onClick={onCancel}>X</div>

        <div>
          {children}
        </div>

        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
