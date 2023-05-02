import React from 'react';
import {Container} from 'react-bootstrap';
import Header from  './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Routes } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen';

const App=()=> {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes path='/' component={HomeScreen} exact/>
          <Routes path='/product/:id' component={ProductScreen} exact/>
        </Container>
      </main>
      <Footer />
      </Router>
   
  );
}

export default App;
