import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (localStorage.getItem('id') != null) {
            navigate('/ventas')
        } else {
            return
        }
    }, [])

    const loguear = () => {
        const params = {
            username,
            password
        }
        login(params)
    }

    const login = (params) => {
        axios.post(`http://127.0.0.1:8000/api/login/`, params).then((res) => {
            console.log('postLogin res', res)
            if (res.data.staff === true) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.id)
                navigate('/ventas')
            } else {
                window.confirm('Las credenciales no son de un administrador')
            }



        }).catch((err) => {
            console.log('Error al iniciar sesion', err)
            window.confirm('Error al iniciar sesion, posiblemente datos erroneos')
        })
    }

    return (
        <Container>
            <Card style={{marginLeft: 'auto', marginRight: 'auto', width: '800px'}}>
                <Card.Body>
                    <Form>
                        <Form.Label><h5>Username</h5></Form.Label>
                        <Form.Control name='username' value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                        <Form.Label><h5>Password</h5></Form.Label>
                        <Form.Control name='password' type='password' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <br />
                        <Button name='login' variant='success' onClick={loguear}>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default LoginForm;