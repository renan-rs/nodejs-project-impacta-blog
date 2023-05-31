import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import styles from './styles.module.css';

const SingleArticle = () => {
  const [article, setArticle] = useState("");
  const params = new useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/article/${params.slug}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="">
      <NavBar />
      <div className={styles.singlearticle_container}>
        <div className={styles.singlearticle_content}>
          {article && (
            <div>
              <h1 className="text-center">{article.title}</h1>
              <hr/>
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content,
                }}
              />
              <p className="">
                Autor: {article.author}, Criado em{" "}
                {new Date(article.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
