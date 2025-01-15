import React from "react";
import Modal from "../Modal";
import AddIncome from "../HomeComponents/AddIncome";

const IncomeModal = ({ user, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddIncome user={user} />
    </Modal>
  );
};

export default IncomeModal;
