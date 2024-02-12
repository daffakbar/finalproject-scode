import React from "react";

const Form = ({ value, handleSave, onChange }) => {
  return (
    <div className="grid grid-cols-1 mt-4">
      <textarea
        className="textarea textarea-bordered mx-2"
        placeholder="Bio"
        value={value}
        onChange={onChange}
      ></textarea>
      <button
        className="btn btn-primary uppercase mt-4 mx-2"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Form;
