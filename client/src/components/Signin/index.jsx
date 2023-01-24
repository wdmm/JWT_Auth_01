import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Signin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = ({currentTarget:input}) => {
        setFormData({...formData, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8080/api/auth';
            const {data:res} = await axios.post(url, formData);
            localStorage.setItem("JWTToken", res.data);
            window.location = "/";
            console.log(res.data);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500 ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
      <div className={styles.login_container}>
          <div className={styles.login_form_container}>
              <div className={styles.left}>
              <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Login to Account</h1>
                    <input 
                        type="email" 
                        name="email" 
                        onChange={handleChange}
                        placeholder="Email" 
                        value={formData.email} 
                        required 
                        className={styles.input} 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleChange}
                        placeholder="Password" 
                        value={formData.password} 
                        required 
                        className={styles.input} 
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.green_btn}>
                        Sign in
                    </button>
                </form>
              </div>
              <div className={styles.right}>
                <h1>New Here?</h1>
                <Link to={"/signup"}>
                    <button className={styles.white_btn}>
                        Sign up
                    </button>
                </Link>
              </div>
          </div>
      </div>
    );
  }
  
  export default Signin;