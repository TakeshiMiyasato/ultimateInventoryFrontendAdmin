import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";

const VentaList = () => {

    const { tipo } = useParams()

    const [listaVentas, setListaVentas] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('id') === null) {
            navigate('/')
        }
        if (tipo === 'anuladasRechazadas'){
            fetchVentasAnuladasRechazadasList()
        } else if (tipo === 'entregadas'){
            fetchVentasEntregadasList()
        } else {
            fetchVentasPendientesList()
        }
        
    }, [])

    const fetchVentasPendientesList = () => {
        axios.get('http://127.0.0.1:8000/api/ventas/getVentasPendientes/', {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllVentas res', res.data)
            setListaVentas(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllVentas: ', err)
        })
    }

    const fetchVentasAnuladasRechazadasList = () => {
        axios.get('http://127.0.0.1:8000/api/ventas/getVentasAnuladasRechazadas/', {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllVentas res', res.data)
            setListaVentas(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllVentas: ', err)
        })
    }

    const fetchVentasEntregadasList = () => {
        axios.get('http://127.0.0.1:8000/api/ventas/getVentasEntregadas/', {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getAllVentas res', res.data)
            setListaVentas(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllVentas: ', err)
        })
    }

    const estadoToText = (n) => {
        switch (n) {
            case 0:
                return 'Creado'
            case 1:
                return 'Pagado'
            case 2:
                return 'Pago Aceptado'
            case 3:
                return 'Entregado'
            case 4:
                return 'Pago Rechazado'
            case 5:
                return 'Anulado'
            default:
                return 'Creado'
        }
    }

    return (
        <Container>
            <h3>Ventas pendientes</h3>
            <Card>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Estado</th>
                                <th>Total</th>
                                <th>Nombre Factura</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaVentas.map(venta =>
                                <tr key={"venta-" + venta.id}>
                                    <td><h4>{venta.id}</h4></td>
                                    <td><h4>{estadoToText(venta.estado)}</h4></td>
                                    <td>{venta.total} $</td>
                                    <td>{venta.nombre_factura}</td>
                                    <td><Link to={`/formVenta/${venta.id}`} className='btn btn-info'>Ver Detalles</Link></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default VentaList;