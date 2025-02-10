import React from 'react';

function HomeAdmin({userName, onLogout}) {
    return (
        <div>
            <h2>환영합니다, {userName}!</h2>
            <button>회원 목록 조회</button>
            <button>주문 목록 조회</button>
            <button>상품 등록</button>
            <button onClick={onLogout}> 로그아웃 </button>
        </div>
    );
}

export default HomeAdmin;
