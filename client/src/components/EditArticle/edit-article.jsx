import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

const EditArticle = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });
  const { title, author, slug } = state;
  const [content, setContent] = useState("");
  const params = useParams();

  const submitContent = (event) => {
    setContent(event);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/article/${params.slug}`)
      .then((response) => {
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => alert(err));
  }, []);

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

  const showUpdateForm = () => (
    <div className={styles.editarticle_container}>
      <div className={styles.editarticle_form_container}>
        <h1>Editar Artigo</h1>
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
          <input type="submit" value="Atualizar" className="btn btn-primary" />
        </form>
      </div>
    </div>

    
  );

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API}/article/${slug}`, {
        title,
        content,
        author,
      })
      .then((response) => {
        Swal.fire("Tudo certo!", "Artigo atualizado com sucesso!", "success");
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((err) => {
        Swal.fire("Oops...", err.response.data.error, "error");
      });
  };

  return (
    <div className="">
      <NavBar />
      {showUpdateForm()}
    </div>
  );
};

export default EditArticle;
