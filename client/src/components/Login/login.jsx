import { Link } from 'react-router-dom';
import styles from "./styles.module.css";
import {useState} from 'react';
import axios from 'axios';

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error,setError] = useState("");

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API}/auth`;
      const {data: res} = await axios.post(url,data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("userName", res.userName);
      window.location = "/home";
      //console.log(res.message);
    } catch (error) {
      if(error.response && error.response.status >= 400 &&
        error.response.status <= 500){
          setError(error.response.data.message)
        }
    }
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <h1>Acesse sua conta</h1>
            <input 
              type='email' 
              placeholder='Email'
              name='email' 
              onChange={handleChange}
              value={data.email} 
              required 
              className={styles.input} />
            <input 
              type='password' 
              placeholder='Password'
              name='password' 
              onChange={handleChange}
              value={data.password} 
              required 
              className={styles.input} />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type='submit' className={styles.purple_btn}>
              Entrar
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Novo por aqui?</h1>
          <Link to="/signup">
            <button type='button' className={styles.white_btn}>
              Cadastrar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login;