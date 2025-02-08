import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState} from "react";

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
        setFormdata({...formdata, [e.target.name]: e.target.value});
    };

    // 회원가입 요청 함수
    const submit = async (e) => {
        e.preventDefault(); // 기본 제출 이벤트 방지

        try {
            // 백엔드 API로 회원가입 요청을 보냄
            const response = await axios.post("/api/members/register", formdata, {
                headers: {"Content-Type": "application/json"}  // JSON 형식으로 데이터 전송
            });

            const {id} = response.data; // 서버 응답에서 회원 ID 추출
            setId(id);  // 회원 ID 상태 업데이트

            // 회원가입 완료 후 해당 회원의 상세 페이지로 이동
            navigate(`/members/${id}`);

        } catch (err) {
            console.log("회원가입 오류:", err);
        }
    };

    return (
        <div className="register">
            <form onSubmit={submit}>
                아이디: <input type="text" name="loginId" value={formdata.loginId} onChange={change}/><br/>
                이름: <input type="text" name="name" value={formdata.name} onChange={change}/><br/>
                비밀번호: <input type="password" name="password" value={formdata.password} onChange={change}/><br/>
                <input type="submit" value="회원가입"/>
            </form>
        </div>
    );
}

export default Register;
