import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

const ProductoForm = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [listaCategoria, setListaCategoria] = useState([])

    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState(0)
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState(0)
    const [stock, setStock] = useState(0)
    const [stockOriginal, setStockOriginal] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        }
        if (id !== undefined) {
            fetchProductoDetail(id)
            fetchCategoriaList()
        }

        else {
            setCategoria(1)
            fetchCategoriaList()
            return
        }

    }, [id])

    const fetchProductoDetail = () => {
        axios.post(`http://127.0.0.1:8000/api/productos/getProductoById/`, { "id": id }, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getSingleProducto res', res.data)
            setNombre(res.data.nombre)
            setCategoria(res.data.categoria)
            setDescripcion(res.data.descripcion)
            setPrecio(res.data.precio)
            setStockOriginal(res.data.stock)
            setStock(res.data.stock)
        }).catch((err) => {
            console.log('Error en getSingleProducto: ', err)
        })
    }

    const fetchCategoriaList = () => {
        axios.get('http://127.0.0.1:8000/api/categorias/getAllCategorias/', {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllCategorias res', res.data)
            setListaCategoria(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllCategorias: ', err)
        })
    }

    const stockComponent = () => {
        if (id !== undefined) {
            return (
                <div>
                    <Form.Label><h5>Stock</h5></Form.Label>
                    <Form.Control value={stock} onChange={(e) => {
                        setStock(e.target.value)
                    }} />
                </div>
            )
        }
    }

    const guardarDatos = () => {
        const params = {
            "id": id,
            "nombre": nombre,
            "categoria": categoria,
            "descripcion": descripcion,
            "precio": precio
        }
        if (id !== undefined) {
            if (stock !== stockOriginal) {
                var emitido = 0
                var agregado = 0

                if (stock < stockOriginal) {
                    emitido = stockOriginal - stock
                } else {
                    agregado = stock - stockOriginal
                }
                const paramsStock = {
                    "producto": id,
                    "agregado": agregado,
                    "emitido": emitido
                }
                console.log(paramsStock)
                axios.post(`http://127.0.0.1:8000/api/stocks/actualizarStock/`, paramsStock, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                    console.log('postActualizarStock res', res.data)
                    navigate('/productos')
                }).catch((err) => {
                    console.log('Error en postActualizarStock: ', err)
                })
            }
            axios.patch(`http://127.0.0.1:8000/api/productos/updateProducto/`, params, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('patchProducto res', res.data)
                navigate('/productos')
            }).catch((err) => {
                console.log('Error en patchProducto: ', err)
            })
        } else {
            axios.post(`http://127.0.0.1:8000/api/productos/createProducto/`, params, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                console.log('postProducto res', res.data)
                navigate('/productos')
            }).catch((err) => {
                console.log('Error en postCateogira: ', err)
            })
        }
    }

    const titulo = () => {
        if(id !== undefined){
            return (
                <h3>Edición de Producto</h3>
            )
        } else {
            return (
                <h3>Creación de Producto</h3>
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
                        <Form.Label><h5>Categoria</h5></Form.Label>
                        <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            {listaCategoria.map(categoria =>
                                <option key={'categoria=' + categoria.id} value={categoria.id}>{categoria.nombre}</option>
                            )}
                        </Form.Select>
                        <Form.Label><h5>Descripcion</h5></Form.Label>
                        <Form.Control value={descripcion} onChange={(e) => {
                            setDescripcion(e.target.value)
                        }} />
                        <Form.Label><h5>Precio</h5></Form.Label>
                        <Form.Control value={precio} onChange={(e) => {
                            setPrecio(e.target.value)
                        }} />
                        {stockComponent()}
                        <br />
                        <Button variant='success' onClick={guardarDatos}>Guardar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default ProductoForm;