import React, {useState} from 'react';
import Modal from 'react-modal';

// Components
import {Card} from './components/Card';

// Styles
import './global/style.scss';
import {useFetch} from './hooks/useFetch';
import axios from "axios";
import {Form} from "./components/Form";

Modal.setAppElement('#root');

export const App = () => {

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false)
  };

  const {loading, data, error} = useFetch({
    url: 'tools',
    method: 'get'
  });

  function addTool(e: any) {
    console.log(e.target.value)
  }

  return (
    <div className='app'>
      <div className="header">
        <h1>VUTTR</h1>
        <p>Very Useful Tools to Remember</p>
      </div>

      <div className="commands">
        <div className="search-commands">
          <input type="text" placeholder='search'/>
          <input type="checkbox" id='checkbox'/>
          <p>search in tags only</p>
        </div>
        <button onClick={openModal}>+ Add</button>
      </div>

      {loading
        ? <p> Loading... </p>
        : data.map(({id, title, description, link, tags}) => (
          <Card key={id} id={id} description={description} link={link} tags={tags} title={title}/>
        ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <Form stateChanger={setIsOpen}/>
      </Modal>
    </div>
  )
}
