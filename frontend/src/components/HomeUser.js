import React from 'react';

function HomeUser({ userName, onLogout }) {
    return (
        <div>
            <h2>환영합니다, {userName}!</h2>
            <button>상품 목록</button>
            <button>주문하기</button>
            <button>내 주문 목록</button>
            <button>내 정보 보기</button>
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={onLogout}>
                로그아웃
            </button>
        </div>
    );
}

export default HomeUser;
