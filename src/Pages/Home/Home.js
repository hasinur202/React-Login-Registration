import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';

const Home = () => {
    const { logOut } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const redirect_uri = location.state?.from || '/login';

    const handleLogOut = () => {
        logOut()
        .then(result => {
            history.push(redirect_uri);
        })
        .catch(error => {})
    }

    return (
        <section className="main-content">
            <div className="container" data-aos="fade-up">
                <div className="section-title text-muted">
                    <h2>Login Successfully...</h2>
                    <br/>
                    <h4>Welcome to Home Page</h4>
                    <br/>
                    <button onClick={handleLogOut} type="button" className="btn btn-danger">Logout</button>
                </div>
            </div>
        </section>
    );
};

export default Home;