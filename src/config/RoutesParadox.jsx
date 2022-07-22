import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoriaForm from '../pages/Categorias/CategoriaForm';
import CategoriaList from '../pages/Categorias/CategoriaList';
import ProductoForm from '../pages/Productos/ProductoForm';
import ProductoList from '../pages/Productos/ProductoList';
import LoginForm from '../pages/RegisterLogin/LoginForm';
import RegisterForm from '../pages/RegisterLogin/RegisterForm';
import HistorialStock from '../pages/Stock/HistorialStock';
import VentaForm from '../pages/Ventas/VentaForm';
import VentaList from '../pages/Ventas/VentaList';

const RoutesParadox = () => {
    return (
            <Routes>
                <Route path='/' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm/>}/>
                <Route path='/categorias' element={<CategoriaList/>}/>
                <Route path='/productos' element={<ProductoList/>}/>
                <Route path='/ventas' element={<VentaList/>}/>
                <Route path='/ventas/:tipo' element={<VentaList/>}/>
                <Route path='/historialStock/:id' element={<HistorialStock/>}/>
                <Route path='/formVenta/:id' element={<VentaForm/>}/>
                <Route path='/formVenta/' element={<VentaForm/>}/>
                <Route path='/formCategoria/:id' element={<CategoriaForm/>}/>
                <Route path='/formCategoria/' element={<CategoriaForm/>}/>
                <Route path='/formProducto/:id' element={<ProductoForm/>}/>
                <Route path='/formProducto/' element={<ProductoForm/>}/>
            </Routes>

    );
}

export default RoutesParadox;