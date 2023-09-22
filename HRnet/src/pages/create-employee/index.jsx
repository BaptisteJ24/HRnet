import { useState } from "react";
import Form from "../../components/form";
import ReactModal from "react-modal";

const CreateEmployee = () => {
  const [showModal, setShowModal] = useState(false);

  ReactModal.setAppElement("#root");

  return (
    <div className="create-employee">
      <h2>Create Employee</h2>
      <Form handleShowModal={setShowModal} />
      <ReactModal isOpen={showModal} contentLabel="Success Modal">
        <p>New Employee Created !</p>
        <button className="button" onClick={() => setShowModal(false)}>
          Close
        </button>
      </ReactModal>
    </div>
  );
};

export default CreateEmployee;
