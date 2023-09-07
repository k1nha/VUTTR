import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { HiPlusSm } from "react-icons/hi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IData } from "../../types/types";

interface FormProps {
  stateChanger: (isOpen: boolean) => void;
  setData: (data: IData[]) => void;
  data: IData[];
}

const initialValues = {
  title: "",
  link: "",
  description: "",
  tags: "",
};

export const Form = ({ stateChanger, setData, data }: FormProps) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function addTool() {

    axios
      .post("tools", values, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
      .then(() => {
        toast.success("Tool added successfully!");
        stateChanger(false);
        let newData = data;
        newData.push(values as IData); // TODO: set the correct type and values
        setData(newData);
        // location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data);
        toast.info("Check your console for more details...");
        console.log(err);
      })
      .finally(() => {});
  }

  return (
    <>
      <h2>
        <HiPlusSm />
        Add new tool
      </h2>

      <div className="inputs">
        <label>Tools Name</label>
        <input
          value={values.title}
          type="text"
          name="title"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="inputs">
        <label>Tools Link</label>
        <input
          value={values.link}
          type="text"
          name="link"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="inputs">
        <label>Tools Description</label>
        <input
          value={values.description}
          type="text"
          name="description"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="inputs">
        <label>Tags</label>
        <input
          value={values.tags}
          type="text"
          name="tags"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="btn-modal">
        <button onClick={() => stateChanger(false)}>Close</button>
        <button onClick={addTool}>Add Toll</button>
      </div>
    </>
  );
};
