import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

const CategoriaForm = () => {
    const { id, idVenta } = useParams()

    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        }
        if (id !== undefined)
            fetchCategoriaDetail(id)
        console.log(id)
        if (idVenta !== undefined) {
            console.log(idVenta)
        }
        else
            return
    }, [id])

    const fetchCategoriaDetail = (id) => {
        axios.post(`http://127.0.0.1:8000/api/categorias/getCategoriaById/`, {"id": id}, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getSingleCategoria res', res.data)
            setNombre(res.data.nombre)
        }).catch((err) => {
            console.log('Error en getSingleCategoria: ', err)
        })
    }

    const guardarDatos = () => {
        const params = {
            "id": id,
            "nombre": nombre
        }
        if (id !== undefined) {
            axios.patch(`http://127.0.0.1:8000/api/categorias/updateCategoria/`, params, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('patchCategoria res', res.data)
                navigate('/categorias')
            }).catch((err) => {
                console.log('Error en patchCateogira: ', err)
            })
        } else {
            axios.post(`http://127.0.0.1:8000/api/categorias/createCategoria/`, params, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('postCategoria res', res.data)
                navigate('/categorias')
            }).catch((err) => {
                console.log('Error en postCateogira: ', err)
            })
        }
    }

    const titulo = () => {
        if(id !== undefined){
            return (
                <h3>Edición de Categoria</h3>
            )
        } else {
            return (
                <h3>Creación de Categoria</h3>
            )
        }
    }

    return (
        <Container>
            {titulo()}
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Label><h5>Nombre</h5></Form.Label>
                        <Form.Control value={nombre} onChange={(e) => {
                            setNombre(e.target.value)
                        }} />
                        <br />
                        <Button variant='success' onClick={guardarDatos}>Guardar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default CategoriaForm;