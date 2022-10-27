import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
import google from '../../../images/google-1.png'
import fb from '../../../images/fb-1.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth();
    const history = useHistory();
    const location = useLocation();
    const redirect_uri = location.state?.from || '/home';

    const { signInUsingGoogle, signInUsingFacebook } = useAuth();
    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

      const handlePasswordChange = e => {
        setPassword(e.target.value)
      }

      const handleGoogleLogin = () => {
        signInUsingGoogle()
            .then(result => {
                history.push(redirect_uri);
            })
            .catch(error => {
                setError(error.message);
            })
        }

        const handleFacebookLogin = () => {
            signInUsingFacebook()
            .then(result => {
                history.push(redirect_uri);
            })
            .catch(error => {
                setError(error.message);
            })
        }

      const handleLogin = e => {
        e.preventDefault();
        if (password.length < 6) {
          setError('Password Must be at least 6 characters long.')
          return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
          setError('Password Must contain 2 upper case');
          return;
        }
        processLogin(email, password);
      }

      const processLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(result => {
              const user = result.user;
              console.log(user);
              setError('');
              history.push(redirect_uri);
          })
          .catch(error => {
            setError(error.message);
          })
      }

    return (
        <section className="main-content">
        <div className="container" data-aos="fade-up">
            <div className="section-title text-muted">
                <h2>Sign In</h2>
            </div>

            <form onSubmit={handleLogin} className="php-email-form" data-aos="fade-up" data-aos-delay="100">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8 m-auto pb-2">
                            <div className="col-md-12 form-group mt-3 mt-md-0">
                                <input onBlur={handleEmailChange} type="email" className="form-control" name="email" id="email" placeholder="Email" required />
                            </div>
                            <div className="col-md-12 form-group mt-3 mt-md-0">
                                <input onBlur={handlePasswordChange} type="password" className="form-control" name="phone" id="phone" placeholder="Password" required />
                            </div>
                            <div className="col-md-12 mt-3 mt-md-0">
                                <label style={{ float: "left" }}>
                                    <input style={{ height: '12px', textAlign: 'left' }} type="checkbox" name="remember" /> Remember me
                                </label>
                            </div>
                        </div>
                        { error && 
                            <div className="py-3 text-danger">{error}</div>
                        }
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn-primary" type="submit">Sign In</button>
                </div>
            </form>
            <div className="mt-4">
                <Link to="/register">Forgot Password?</Link>
                <h5>Or</h5>
                <button type="button" onClick={handleGoogleLogin} className="btn btn-light"><img style={{ height: '40px' }} src={google} alt='google' /> Continue With Google</button><br/>
                <button type="button" onClick={handleFacebookLogin} className="btn btn-light mt-2"><img style={{ height: '40px' }} src={fb} alt='google' /> Continue With Facebook</button>
            </div>
            <div className='mt-5'>
                Don't have account? <Link to="/register">SignUp</Link>
            </div>
        </div>
    </section>
    );
};

export default Login;