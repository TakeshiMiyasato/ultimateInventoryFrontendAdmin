import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

const CategoriaList = () => {

    const [listaCategorias, setListaCategorias] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') != null) {
            fetchCategoriaList()
        } else {
            navigate('/')
        }
    }, [])

    const fetchCategoriaList = () => {
        axios.get('http://127.0.0.1:8000/api/categorias/', {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllCategorias res', res.data)
            setListaCategorias(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllCategorias: ', err)
        })
    }

    const deleteCategoria = (id) => {
        const confirmation = window.confirm('Eliminar esta categoria?')
        if (!confirmation) {
            return
        }
        axios.delete(`http://127.0.0.1:8000/api/categorias/${id}`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('deleteCategoria res', res)
            fetchCategoriaList()
        }).catch((err) => {
            console.log('deleteCategoria err', err)
        })
    }

    return (
        <Container>
            <h3>Lista de Categoria</h3>
            <Card>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaCategorias.map(categoria =>
                                <tr key={"categoria-" + categoria.id}>
                                    <td><h4>{categoria.id}</h4></td>
                                    <td><h4>{categoria.nombre}</h4></td>
                                    <td><Link to={`/formCategoria/${categoria.id}`} className='btn btn-warning'>Editar</Link></td>
                                    <td><Button className='btn btn-danger' onClick={() => deleteCategoria(categoria.id)}>Eliminar</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default CategoriaList;