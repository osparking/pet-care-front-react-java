import React from "react";

const AddItemModal = ({ show, closer, saver, label }) => {
  const [itemValue, setItemValue] = useState("");
  const handleSaveItem = () => {
    saver(itemValue);
    setItemValue("");
    closer();
  };
  return <div></div>;
};

export default AddItemModal;
