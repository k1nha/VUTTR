import './style.scss';
import React, {useState} from 'react';
import {IData} from '../../types/types';
import Modal from 'react-modal';
import axios from "axios";
import {HiX} from 'react-icons/hi';

Modal.setAppElement('#root');

export const Card = ({id, title, description, link, tags}: IData) => {

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deleteItem(idCard: number | undefined) {
    axios.delete(`tools/${idCard}`)
      .then()
      .catch((err) => console.log(err))
      .finally(() => {
        alert('Item excluido');
        closeModal();
        location.reload();
      });
  }

  return (
    <div className='card'>
      <div className="head">
        <h2><a href={link}>{title}</a></h2>
        <button className='btn-remove' onClick={openModal}>x remove</button>
      </div>

      <p>{description}</p>
      <h5 className='tag'>{tags.map((item) => (
        <span>#{item} </span>
      ))}</h5>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-remove"
      >
        <h2><HiX/>Remove Tool</h2>
        <p>Are you sure you want to remove <strong>{title}</strong>?</p>
        <div className="button-remove">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={() => deleteItem(id)}>Yes, remove</button>
        </div>
      </Modal>
    </div>
  )
}
