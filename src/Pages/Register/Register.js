import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from '@firebase/auth';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';
import google from '../../images/google-1.png'
import fb from '../../images/fb-1.png'

const Register = () => {
    const { signInUsingGoogle, signInUsingFacebook } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const location = useLocation();
    const redirect_uri = location.state?.from || '/home';

    const auth = getAuth();

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }

    const handleConPasswordChange = e => {
        setConfirmPassword(e.target.value)
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

    const handleGoogleLogin = () => {
        signInUsingGoogle()
            .then(result => {
                history.push(redirect_uri);
            })
    }

    const handleRegistration = e => {
        e.preventDefault();
        console.log(email, password);
        if (password.length < 6) {
          setError('Password Must be at least 6 characters long.')
          return;
        }
        if (password !== confirm_password) {
            setError('Does not match password.')
            return;
          }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
          setError('Password Must contain 2 upper case');
          return;
        }
        registerNewUser(email, password);
    }

    const registerNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(result => {
            const user = result.user;
            console.log(user);
            setError('');
            verifyEmail();
            history.push(redirect_uri);
          })
          .catch(error => {
            setError(error.message);
          })
      }

      const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
          .then(result => {
            console.log(result);
          })
      }
    
    //   const handleResetPassword = () => {
    //     sendPasswordResetEmail(auth, email)
    //       .then(result => { })
    //   }

    return (
        <section className="main-content">
            <div className="container" data-aos="fade-up">
                <div className="section-title text-muted">
                    <h2>Create <br/>New Account</h2>
                </div>

                <form onSubmit={handleRegistration} className="php-email-form" data-aos="fade-up" data-aos-delay="100">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <div className="col-md-12 form-group mt-3 mt-md-0">
                                    <input onBlur={handleEmailChange} type="email" className="form-control" name="email" id="email" placeholder="Email" required />
                                </div>
                                <div className="col-md-12 form-group mt-3 mt-md-0">
                                    <input onBlur={handlePasswordChange} type="password" className="form-control" name="phone" id="phone" placeholder="Password" required />
                                </div>
                                <div className="col-md-12 form-group mt-3 mt-md-0">
                                    <input onBlur={handleConPasswordChange} type="password" className="form-control" name="phone" id="phone" placeholder="Confirm Password" required />
                                </div>
                                <div className="col-md-12 mt-3 mt-md-0">
                                    <label style={{ float: "left" }}>
                                        <input style={{ height: '12px', textAlign: 'left' }} type="checkbox" name="remember" /> I agree with Terms & Conditions
                                    </label>
                                </div>
                            </div>
                            { error && 
                                <div className="py-3 text-danger">{error}</div>
                            }
                        </div>
                    </div>
                    <div className="text-center mt-3"><button className="btn-primary" type="submit">Create Account</button></div>
                    {/* <button type="button" onClick={handleResetPassword} className="btn btn-secondary btn-sm mt-3">Reset Password</button> */}
                </form>
                <div className="mt-4">
                    <h5>Or</h5>
                    <button type="button" onClick={handleGoogleLogin} className="btn btn-light"><img style={{ height: '40px' }} src={google} alt='google' /> Continue With Google</button><br/>
                    <button type="button" onClick={handleFacebookLogin} className="btn btn-light mt-2"><img style={{ height: '40px' }} src={fb} alt='google' /> Continue With Facebook</button>
                </div>
                <div className='mt-5'>
                    Already have an account? <Link to="/login">SignIn</Link>
                </div>
            </div>
        </section>
    );
};

export default Register;