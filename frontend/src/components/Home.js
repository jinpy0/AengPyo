import React, {useEffect, useState} from 'react';
import HomeDefault from './HomeDefault';
import HomeUser from './HomeUser';
import HomeAdmin from './HomeAdmin';
import api from './Api';

function Home() {
    const [role, setRole] = useState(null);
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        api.get('/session')
            .then(res => {
                setRole(res.data.grade);
                setUserName(res.data.name);
            })
            .catch(() => {
                setRole(null)
                setUserName('');
            });
    }, []);

    const handleLogin = () => {
        api.post('/login', {loginId, password})
            .then(res => {
                setRole(res.data.grade);
                setUserName(res.data.name);
            })
            .catch(err => console.error('로그인 실패:', err));
    };

    const handleLogout = () => {
        api.post('/logout')
            .then(() => {
                setRole(null);
                setUserName('');
            })
            .catch(err => console.error('로그아웃 실패:', err));
    };

    if (role === 'USER') {
        return <HomeUser userName = {userName} onLogout={handleLogout}/>;
    } else if (role === 'ADMIN') {
        return <HomeAdmin userName = {userName} onLogout={handleLogout}/>;
    } else {
        return (
            <HomeDefault
                loginId={loginId}
                setLoginId={setLoginId}
                password={password}
                setPassword={setPassword}
                onLogin={handleLogin}
            />
        );
    }
}

export default Home;
