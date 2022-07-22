import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('id')!= null){
            return
        }else{
            navigate('/')
        }
    }, [])

    const guardarDatos = () => {
        const params = {
            username,
            email,
            password
        }
        insertUser(params)
    }

    const insertUser = (params) => {
        axios.post(`http://127.0.0.1:8000/api/register/`, params).then((res) => {
            console.log('postInserJuego res', res)
        }).catch((err) => {
            console.log('Error al postJuego', err)
        })
    }

    return (
        <Form>
            <Form.Label><h5>Username</h5></Form.Label>
            <Form.Control name='usernameReg' value={username} onChange={(e) => {
                setUsername(e.target.value)
            }} />
            <Form.Label><h5>Email</h5></Form.Label>
            <Form.Control name='emailReg' value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} />
            <Form.Label><h5>Password</h5></Form.Label>
            <Form.Control name='passwordReg' value={password} onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <br/>
            <Button name='btnReg' variant='success' onClick={guardarDatos}>Guardar</Button>
        </Form>
    );
}

export default LoginForm;