import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

const ProductoList = () => {

    const [listaProductos, setListaProductos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') != null) {
            fetchProductoList()
        } else {
            navigate('/')
        }
    }, [])

    const fetchProductoList = () => {
        axios.get('http://127.0.0.1:8000/api/productos/getAllProductos/', {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllProductos res', res.data)
            setListaProductos(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllProductos: ', err)
        })
    }

    const deleteProducto = (id) => {
        const confirmation = window.confirm('Eliminar esta producto?')
        if (!confirmation) {
            return
        }
        axios.delete(`http://127.0.0.1:8000/api/productos/${id}`, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('deleteProducto res', res)
            fetchProductoList()
        }).catch((err) => {
            console.log('deleteProducto err', err)
        })
    }

    return (
        <Container>
            <h3>Lista de Productos</h3>
            <Card>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categoria</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaProductos.map(producto =>
                                <tr key={"producto-" + producto.id}>
                                    <td><h4>{producto.id}</h4></td>
                                    <td><h4>{producto.nombre}</h4></td>
                                    <td><h4>{producto.precio} $</h4></td>
                                    <td><h4>{producto.categoria_nombre}</h4></td>
                                    <td><Link to={`/historialStock/${producto.id}`} className='btn btn-info'>Ver Stock historial</Link></td>
                                    <td><Link to={`/formProducto/${producto.id}`} className='btn btn-warning'>Editar</Link></td>
                                    <td><Button className='btn btn-danger' onClick={() => deleteProducto(producto.id)}>Eliminar</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default ProductoList;