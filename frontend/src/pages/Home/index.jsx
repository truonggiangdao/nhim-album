import React from 'react';
import AuthGuard from '../../contexts/auth/AuthGuard';

const Home = () => {
    return (
        <AuthGuard>
            <div>Home</div>
        </AuthGuard>
    );
};

export default Home;
