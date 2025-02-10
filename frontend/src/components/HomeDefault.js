import React from 'react';

function HomeDefault({ loginId, setLoginId, password, setPassword, onLogin }) {
    return (
        <div>
            <h2>로그인</h2>
            <input
                type="text"
                placeholder="아이디"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={onLogin}>로그인</button>
        </div>
    );
}

export default HomeDefault;
