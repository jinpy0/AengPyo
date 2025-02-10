import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import api from './Api';  // axios 인스턴스 사용

function Register() {
    const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 훅

    // 회원가입 후 생성된 회원 ID를 저장 (추후 조회 URL에 사용)
    const [id, setId] = useState("");

    // 사용자 입력을 저장할 상태 변수
    const [formdata, setFormdata] = useState({
        loginId: '',
        name: '',
        password: ''
    });

    // 입력값 변경 시 상태 업데이트
    const change = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    // 회원가입 요청 함수
    const submit = async (e) => {
        e.preventDefault(); // 기본 제출 이벤트 방지

        try {
            // 백엔드 API로 회원가입 요청을 보냄
            const response = await api.post("/members/register", formdata);

            const { id } = response.data; // 서버 응답에서 회원 ID 추출
            setId(id);  // 회원 ID 상태 업데이트

            // 회원가입 완료 메시지
            alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");

            // 입력 필드 초기화
            setFormdata({ loginId: '', name: '', password: '' });

            // 회원가입 완료 후 ~~~해당 회원의 상세 페이지로 이동~~~ -> 로그인 화면으로 이동
            navigate(`/login`);

        } catch (err) {
            console.error("회원가입 오류:", err);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="register">
            <form onSubmit={submit}>
                아이디: <input type="text" name="loginId" value={formdata.loginId} onChange={change} required/><br/>
                이름: <input type="text" name="name" value={formdata.name} onChange={change} required/><br/>
                비밀번호: <input type="password" name="password" value={formdata.password} onChange={change} required/><br/>
                <input type="submit" value="회원가입"/>
            </form>
        </div>
    );
}

export default Register;
