import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const VentaForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [estado, setEstado] = useState('')
    const [fecha, setFecha] = useState('')
    const [nit_factura, setNit_factura] = useState(0)
    const [nombre_factura, setNombre_factura] = useState('')
    const [total, setTotal] = useState(0)
    const [usuario, setUsuario] = useState(0)
    const [detalleVentaList, setDetalleVentaList] = useState([])

    useEffect(() => {
        if (localStorage.getItem('id') === null)
            navigate('/')

        if (id !== undefined)
            fetchVentaDetail(id)
        else {
            setUsuario(localStorage.getItem('id'))
            return
        }

    }, [id])

    const fetchVentaDetail = (id) => {
        axios.post(`http://127.0.0.1:8000/api/ventas/getVentaById/`,{"id": id}, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
            console.log('getSingleVenta res', res.data)
            setEstado(res.data.venta.estado)
            setFecha(res.data.venta.fecha)
            setNit_factura(res.data.venta.nit_factura)
            setNombre_factura(res.data.venta.nombre_factura)
            setTotal(res.data.venta.total)
            setUsuario(res.data.venta.usuario)
            setDetalleVentaList(res.data.detalleVentas)
        }).catch((err) => {
            console.log('Error en getSingleVenta: ', err)
        })
    }

    const maquinaEstadosComponent = (n) => {
        switch (n) {
            case 0:
                return (
                    <div>
                        <br />
                        <h4 style={{ color: 'purple' }}>Creado (A la espera de pago)</h4>
                        <Button variant='danger' onClick={() => maquinaEstados(5)}>Anular</Button>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <br />
                        <h4 style={{ color: '#FFDF00' }}>Pagado</h4>
                        <Button variant='warning' onClick={() => maquinaEstados(1)}>Aceptar Pago</Button>
                        <Button variant='warning' onClick={() => maquinaEstados(4)}>Rechazar Pago</Button>
                        <Button variant='danger' onClick={() => maquinaEstados(5)}>Anular</Button>
                    </div>

                )
            case 2:
                return (
                    <div>
                        <br />
                        <h4 style={{ color: '#00c2ed' }}>Pago Aceptado</h4>
                        <Button variant='warning' onClick={() => maquinaEstados(2)}>Entregar</Button>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <br />
                        <h4 style={{ color: 'green' }}>Entregado</h4>
                    </div>
                )
            case 4:
                return (
                    <div>
                        <h4 style={{ color: 'red' }}>Pago Rechazado</h4>
                    </div>
                )
            case 5:
                return (
                    <div>
                        <h4 style={{ color: 'red' }}>Anulado</h4>
                    </div>
                )
            default:
                <div>
                    <br />
                    <h4 style={{ color: 'purple' }}>Creado</h4>
                    <Button variant='warning' onClick={() => maquinaEstados(0)}>Pagar</Button>
                    <Button variant='danger' onClick={() => maquinaEstados(5)}>Anular</Button>
                </div>
        }
    }

    const maquinaEstados = (n) => {
        switch (n) {
            case 0:
                axios.post(`http://127.0.0.1:8000/api/ventas/creadoPagado/`, {id}, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                    console.log('postVentaPagadoFacturado res', res.data)
                    fetchVentaDetail(id)
                }).catch((err) => {
                    console.log('Error en postVentacreadoPagado: ', err)
                })
                return
            case 1:
                axios.post(`http://127.0.0.1:8000/api/ventas/pagadoAceptado/`, {id}, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                    console.log('postVentaPagadoFacturado res', res.data)
                    fetchVentaDetail(id)
                }).catch((err) => {
                    console.log('Error en postVentaPagadoFacturado: ', err)
                })
                return

            case 2:
                axios.post(`http://127.0.0.1:8000/api/ventas/aceptadoEntregado/`, {id}, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                    console.log('postVentaaceptadoEntregado res', res.data)
                    fetchVentaDetail(id)
                }).catch((err) => {
                    console.log('Error en postVentaaceptadoEntregado: ', err)
                })
                return
            case 4:
                if (window.confirm('Desea marcar como pago Rechazado?, esta accion no se puede deshacer')) {
                    axios.post(`http://127.0.0.1:8000/api/ventas/pagadoRechazado/`, {id}, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                        console.log('postVentapagadoRechazado res', res.data)
                        fetchVentaDetail(id)
                    }).catch((err) => {
                        console.log('Error en postVentapagadoRechazado: ', err)
                    })
                }
                return
            case 5:
                if (window.confirm('Desea marcar como anulado?, esta accion no se puede deshacer')) {
                    axios.post(`http://127.0.0.1:8000/api/ventas/anular/`, {id}, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                        console.log('postVentaAnular res', res.data)
                        fetchVentaDetail(id)
                    }).catch((err) => {
                        console.log('Error en postVentaAnular: ', err)
                    })
                }
                return
            default:
                axios.post(`http://127.0.0.1:8000/api/ventas/creadoPagado/`, {id}, { headers: { 'Authorization': `token ${localStorage.getItem('token')}` } }).then((res) => {
                    console.log('postVentaCreadoPagado res', res.data)
                    fetchVentaDetail(id)
                    return
                }).catch((err) => {
                    console.log('Error en postVentaCreadoPagado: ', err)
                    return
                })
        }
    }


    const beautifyFecha = (f) => {
        return (moment(f).utc().format('YYYY-MM-DD') + 'T' + moment(f).utc().format('HH:mm:ss'))
    }

    return (
        <Container>
            <h3>Venta administracion</h3>
            <Card style={{marginBottom: '50px'}}>
                <Card.Body>
                    <Form>
                        <Form.Label><h5>Fecha</h5></Form.Label>
                        <Form.Control type='datetime-local' value={beautifyFecha(fecha)} disabled onChange={(e) => {
                            setFecha(e.target.value)
                        }} />
                        <Form.Label><h5>Total</h5></Form.Label>
                        <Form.Control name='total' value={total + ' $'} disabled onChange={(e) => {
                            setTotal(e.target.value)
                        }} />
                        <Form.Label><h5>Usuario Creador</h5></Form.Label>
                        <Form.Control value={usuario} disabled onChange={(e) => {
                            setUsuario(e.target.value)
                        }} />
                        <Form.Label><h5>Nombre en Factura</h5></Form.Label>
                        <Form.Control value={nombre_factura} disabled onChange={(e) => {
                            setNombre_factura(e.target.value)
                        }} />
                        <Form.Label><h5>Nit Factura</h5></Form.Label>
                        <Form.Control value={nit_factura} disabled onChange={(e) => {
                            setNit_factura(e.target.value)
                        }} />
                        {maquinaEstadosComponent(estado)}
                        <br />
                    </Form>
                    <Container>
                        <Card>
                            <Card.Body>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio del Detalle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detalleVentaList.map(detalleVenta =>
                                            <tr key={"detalleVenta-" + detalleVenta.id}>
                                                <td><b>{detalleVenta.id}</b></td>
                                                <td>{detalleVenta.producto_nombre}</td>
                                                <td>{detalleVenta.cantidad}</td>
                                                <td><b>{detalleVenta.precioVenta} $</b></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Container>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default VentaForm;