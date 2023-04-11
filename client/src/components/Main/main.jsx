import NavBar from "../NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.css';
import domPurify from 'dompurify';

function App() {
  const [articles, setArticles] = useState([]);
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/articles`)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <NavBar />
      <div className={styles.listarticles_container}>
          <div className={styles.listarticles_content}>
            {articles.length > 0 
            ?
              articles.map((article, index) => (
                <div key={index} className={`${styles.thumbarticle_container} d-flex flex-column`}>
                  <Link className={styles.autortitle} to={`/article/${article.slug}`}>
                    <h3 className="mb-0">{article.title}</h3>
                  </Link>
                  <div className={`mb-1 ${styles.autordetails}`}>
                    Autor: {article.author}, Criado em{" "}
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                  <p className={`card-text mb-auto ${styles.article_content}`}>{domPurify.sanitize(article.content, { USE_PROFILES: { html: false } })}</p>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <Link className={`${styles.readarticle} align-self-center`} to={`/article/${article.slug}`}>
                      <p className="">Continuar Lendo</p>
                    </Link>
                    
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button type="button" className="btn btn-sm btn-outline-success">Editar</button>
                    <button type="button" className="btn btn-sm btn-outline-danger">Excluir</button>
                  </div>
                </div>
              ))
            :
              <h1>Nenhum artigo</h1>
            }
            {/* {articles.map((article, index) => (
              <div key={index} className={`${styles.thumbarticle_container} d-flex flex-column`}>
                <Link className={styles.autortitle} to={`/article/${article.slug}`}>
                  <h3 className="mb-0">{article.title}</h3>
                </Link>
                <div className={`mb-1 ${styles.autordetails}`}>
                  Autor: {article.author}, Criado em{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
                <p className={`card-text mb-auto ${styles.article_content}`}>{domPurify.sanitize(article.content, { USE_PROFILES: { html: false } })}</p>
                
                <div className="d-flex justify-content-between align-items-center">
                  <Link className={`${styles.readarticle} align-self-center`} to={`/article/${article.slug}`}>
                    <p className="">Continuar Lendo</p>
                  </Link>
                  
                </div>
                <div className="btn-group btn-group-sm">
                  <button type="button" className="btn btn-sm btn-outline-success">Editar</button>
                  <button type="button" className="btn btn-sm btn-outline-danger">Excluir</button>
                </div>
              </div>
            ))} */}
          </div>
        </div>
    </div>
  );
}

export default App;
