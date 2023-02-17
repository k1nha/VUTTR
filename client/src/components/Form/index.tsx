import React, {useState} from 'react';
import './style.scss';
import axios from "axios";
import {HiPlusSm} from 'react-icons/hi'

const initialValues = {
  title: '',
  link: '',
  description: '',
  tags: ''
}
export const Form = ({stateChanger}: any) => {

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    })
  }

  function addTool() {
    axios.post('tools', {
      ...values,
      tags: values.tags.split(" ")
    })
      .then()
      .catch((err) => console.log(err))
      .finally(() => location.reload());
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
          type='url'
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


