import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/login')}>
                로그인
            </button>

            <button onClick={() => navigate('/register')}>
                회원가입
            </button>
        </div>
    );
}


export default Home;
