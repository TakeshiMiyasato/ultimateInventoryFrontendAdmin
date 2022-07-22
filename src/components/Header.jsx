import React from 'react';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate()

    const logoutComponent = () => {
        if (localStorage.getItem('id') !== null) {
            return (
                <Nav>
                    <Nav.Link onClick={logout} style={{ color: 'white' }}>Logout</Nav.Link>
                </Nav>
            )
        }
    }

    const dropdownComponent = () => {
        if (localStorage.getItem('id') !== null) {
            return (
                <NavDropdown name='dropdown' title='Acciones'>
                    <NavDropdown.Item href='/' >Lista Ventas Pendientes</NavDropdown.Item>
                    <NavDropdown.Item href='/ventas/anuladasRechazadas' >Lista Ventas Anuladas Rechazadas</NavDropdown.Item>
                    <NavDropdown.Item href='/ventas/entregadas' >Lista Ventas Entegadas</NavDropdown.Item>
                    <NavDropdown.Item href='/productos' >Lista Productos</NavDropdown.Item>
                    <NavDropdown.Item href='/formProducto' >Crear Producto</NavDropdown.Item>
                    <NavDropdown.Item href='/categorias' >Lista Categoria</NavDropdown.Item>
                    <NavDropdown.Item href='/formCategoria' >Crear Categoria</NavDropdown.Item>
                </NavDropdown>
            )
        }
    }

    const logout = () => {
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <Navbar bg="dark" expand='lg'>
                <Container fluid>
                    <Navbar.Brand href='/' style={{ color: "white" }}>Ultimate Inventory Admin</Navbar.Brand>
                    {dropdownComponent()}
                    {logoutComponent()}

                </Container>
            </Navbar>
            <br />
        </div>
    );
}

export default Header;