import React, { useMemo, useState, useEffect } from "react";
import Modal from "react-modal";

// Components
import { Card } from "./components/Card";

// Styles
import "./global/style.scss";
import { useFetch } from "./hooks/useFetch";
import { Form } from "./components/Form";
import { IArrTagID } from "./types/types";
import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");

export const App = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTagChecked, setSearchTagChecked] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { loading, data, error, setData } = useFetch({
    url: "tools",
  });

  const searchResults = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    if (searchTagChecked) {
      if (searchTerm === "") {
        return data;
      } else {
        let IndexOfTags: number;
        let ArrIdTags: IArrTagID[] = [];
        data.map(({ tags, id }) => {
          ArrIdTags.push({ id: Number(id), tags: tags });
        });
        ArrIdTags.filter(({ id, tags }: any) => {
          if (tags.includes(lowerSearchTerm)) {
            IndexOfTags = id;
          }
        });
        return data.filter(({ id }) => id === IndexOfTags);
      }
    } else if (searchTerm.length > 0) {
      return data.filter(({ title }) =>
        title.toLowerCase().includes(lowerSearchTerm)
      );
    } else {
      return data;
    }
  }, [searchTerm, data]);

  return (
    <div className="app">
      <div className="header">
        <h1>VUTTR</h1>
        <p>Very Useful Tools to Remember</p>
      </div>

      <div className="commands">
        <div className="search-commands">
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="checkbox"
            id="checkbox"
            onChange={() => setSearchTagChecked(!searchTagChecked)}
          />
          <p>search in tags only</p>
        </div>
        <button onClick={openModal}>+ Add</button>
      </div>

      {loading ? (
        <p style={{ marginTop: "10px" }}>Loading...</p>
      ) : (
        searchResults?.map(({ id, title, description, link, tags }) => (
          <Card
            key={id}
            id={id}
            description={description}
            link={link}
            tags={tags}
            title={title}
            data={data}
            setData={setData}
          />
        ))
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-content">
        <Form stateChanger={setIsOpen} setData={setData} data={data} />
      </Modal>
      <ToastContainer />
    </div>
  );
};
