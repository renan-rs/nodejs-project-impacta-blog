import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import NavBar from "../NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const FormComponent = () => {
  const userName = localStorage.getItem("userName");
  const [state, setState] = useState({
    title: "",
    author: userName || "",
  });

  const { title, author } = state;
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (event) => {
    setContent(event);
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/create`, { title, content, author })
      .then(() => {
        Swal.fire("Artigo criado!", "O artigo foi criado com sucesso", "success");
        setState({ ...state, title: "", author: "" });
        setContent("");
        navigate('/home');
      })
      .catch((err) => {
        Swal.fire("Algo deu errado...", err.response.data.error, "error");
      });
  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="">
      <NavBar />
      <div className={styles.newarticle_container}>
        <div className={styles.newarticle_form_container}>
          <h1>Escrever artigo</h1>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={inputValue("title")}
              />
            </div>
            <div className="form-group">
              <label>Conteúdo</label>
              <ReactQuill
                modules={modules} 
                formats={formats} 
                value={content}
                onChange={submitContent}
                theme="snow"
                className="pb-5 mb-3"
                placeholder="escreve o artigo"
                style={{ border: "1px solid #666" }}
              />
            </div>
            <div className="form-group">
              <label>Autor</label>
              <input
                type="text"
                className="form-control"
                value={author}
                onChange={inputValue("author")}
              />
            </div>
            <br />
            <input type="submit" value="criar" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
