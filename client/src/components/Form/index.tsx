import React, {useState} from 'react';
import './style.scss';
import axios from "axios";
import {HiPlusSm} from 'react-icons/hi'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  title: '',
  link: '',
  description: '',
  tags: ''
}

export const Form = ({stateChanger, setData, data}: any) => {

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    })
  }

  function addTool() {
    const body = {
      ...values,
      tags: values.tags.split(" ")
    };

    axios.post('tools', body)
      .then(() => {
        toast.success("Tool added successfully!");
        stateChanger(false);
        setData((prev: any)=> [...prev, body])
      })
      .catch((err) => {
        toast.error(err.message);
        toast.info("Check your console for more details...");
        console.log(err);
      })
      .finally(() => {
      });
  }

  return (
    <>
      <h2><HiPlusSm/>Add new tool</h2>

      <div className='inputs'>
        <label>Tools Name</label>
        <input
          value={values.title}
          type='text'
          name='title'
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='inputs'>
        <label>Tools Link</label>
        <input
          value={values.link}
          type='text'
          name='link'
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='inputs'>
        <label>Tools Description</label>
        <input
          value={values.description}
          type='text'
          name='description'
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='inputs'>
        <label>Tags</label>
        <input
          value={values.tags}
          type='text'
          name='tags'
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="btn-modal">
        <button onClick={() => stateChanger(false)}>Close</button>
        <button onClick={addTool}>Add Toll</button>
      </div>
    </>
  )
}


