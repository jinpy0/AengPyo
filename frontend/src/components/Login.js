import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const[formdata, setFormdata] = useState({
        loginId: '',
        password: ''
    });

    const change = (e) => {
        setFormdata({...formdata, [e.target.name]: e.target.value});
    };

    const submit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8080/api/login", formdata, {
                headers: {"Content-Type": "application/json"}
            });

            const {id} = response.data;
            setFormdata(id);
            navigate("/");
        }
        catch (e) {
            console.log(e);
        }

    }

    return(
        <div>
            <form onSubmit={submit}>
                <input type="text" name="loginId" placeholder="id" value = {formdata.loginId} onChange={change}></input>
                <input type="password" name="password" placeholder="password" value={formdata.password} onChange={change}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
