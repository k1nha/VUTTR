import React, {useEffect, useMemo, useState} from 'react';
import Modal from 'react-modal';

// Components
import {Card} from './components/Card';

// Styles
import './global/style.scss';
import {useFetch} from './hooks/useFetch';
import {Form} from "./components/Form";

Modal.setAppElement('#root');

export const App = () => {

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTagChecked, setSearchTagChecked] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false)
  }

  const {loading, data, error} = useFetch({
    url: 'tools',
    method: 'get'
  });

  const searchResults = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    if (searchTagChecked) {
      if (searchTerm === '') {
        return data
      } else {
        let a = -1;
        // TO-DO: Typing this Array
        let ArrIdTags:any = []
        data.map(({ tags, id }) => { ArrIdTags.push({ id: id, tags: tags }) })
        const tagIncludes = ArrIdTags.filter(({id, tags}: any) => {
          if (tags.includes(lowerSearchTerm)) {
            a = id
          } 
        })    
        return data.filter(({id})=> id === a)
      }
    } else {
      return data.filter(({title}) => title.toLowerCase().includes(lowerSearchTerm))
    }
  }, [searchTerm, data])

  return (
    <div className='app'>
      <div className="header">
        <h1>VUTTR</h1>
        <p>Very Useful Tools to Remember</p>
      </div>

      <div className="commands">
        <div className="search-commands">
          <input
            type="text"
            placeholder='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="checkbox"
            id='checkbox'
            onChange={(e) => setSearchTagChecked(!searchTagChecked)}
          />
          <p>search in tags only</p>
        </div>
        <button onClick={openModal}>+ Add</button>
      </div>

      {loading
        ? <p>Loading...</p>
        : searchResults?.map(({id, title, description, link, tags}) => (
          <Card key={id} id={id} description={description} link={link} tags={tags} title={title}/>
        ))
      }

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
