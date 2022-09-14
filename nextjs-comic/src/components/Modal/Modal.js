import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide, title, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <h2 className="text-center">{title}</h2>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
