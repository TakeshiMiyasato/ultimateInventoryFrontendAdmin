import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from "moment";

const HistorialStock = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [historial, setHistorial] = useState([])
    const [nombreProducto, setNombreProducto] = useState('')

    useEffect(() => {
        if (localStorage.getItem('id') === null)
            navigate('/')
        fetchHistorialStock(id)
    }, [id])

    const fetchHistorialStock = () => {
        axios.post('http://127.0.0.1:8000/api/stocks/getHistorialByProducto/', { "producto": id }, {
            headers: { 'Authorization': `token ${localStorage.getItem('token')}` }
        }).then((res) => {
            console.log('getHistorialByProducto res', res.data)
            setHistorial(res.data)
            setNombreProducto(res.data[0].producto_nombre)
        }).catch((err) => {
            console.log('error al llamar getHistorialByProducto: ', err)
        })
    }

    const beautifyFecha = (f) => {
        return (moment(f).utc().format('YYYY-MM-DD'))
    }

    const bold = (a) => {
        if(a > 0){
            return(
                <b>{a}</b>
            )
        } else {
            return a
        }
    }

    return (
        <Container>
            <h3>Historial de stock de {nombreProducto}</h3>
            <Card>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Fecha</th>
                                <th>Agregado</th>
                                <th>Retirado</th>
                                <th>Stock Actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map(transaccion =>
                                <tr key={"transaccion-" + transaccion.id}>
                                    <td>{transaccion.id}</td>
                                    <td>{beautifyFecha(transaccion.fecha)}</td>
                                    <td>{bold(transaccion.agregado)}</td>
                                    <td>{bold(transaccion.emitido)}</td>
                                    <td><b>{transaccion.stockActual}</b></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default HistorialStock;