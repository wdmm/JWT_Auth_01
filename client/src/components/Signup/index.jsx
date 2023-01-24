import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = ({currentTarget:input}) => {
        setFormData({...formData, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8080/api/users';
            const {data:res} = await axios.post(url, formData);
            navigate("/login");
            console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500 ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
      <div className={styles.signup_container}>
          <div className={styles.signup_form_container}>
              <div className={styles.left}>
                <h1>Welcome Back</h1>
                <Link to={"/login"}>
                    <button className={styles.white_btn}>
                        Sign in
                    </button>
                </Link>
              </div>
              <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input 
                        type="text" 
                        name="firstName" 
                        onChange={handleChange}
                        placeholder="First name" 
                        value={formData.firstName} 
                        required 
                        className={styles.input} 
                    />
                    <input 
                        type="text" 
                        name="lastName" 
                        onChange={handleChange}
                        placeholder="Last name" 
                        value={formData.lastName} 
                        required 
                        className={styles.input} 
                    />
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
                        Sign up
                    </button>
                </form>
              </div>
          </div>
      </div>
    );
  }
  
  export default Signup;