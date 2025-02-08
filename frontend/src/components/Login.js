import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const[formdata, setFormdata] = useState({
        loginId: '',
        password: ''
    });

    const submit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("/api/login", formdata, {
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
                <input type="text" name="loginId" placeholder="id" value = {formdata.loginId}></input>
                <input type="password" name="password" placeholder="password" value={formdata.password}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
