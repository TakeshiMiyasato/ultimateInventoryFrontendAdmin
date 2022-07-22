import { Container } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import RoutesParadox from './config/RoutesParadox'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Container >
      <Router>
        <Header />
        <RoutesParadox />
      </Router>
    </Container>
  );
}

export default App;