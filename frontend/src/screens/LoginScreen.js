import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Row , Col, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

export const LoginScreen = (location, history) => {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {loading , error, userInfo}= userLogin

    const redirect= location.search ? location.search.split('=')[1]: '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect]
    )

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password) )
    }

  return (
  <FormContainer>
    <h1>Sign In</h1>
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <Loader></Loader>}
    <Form onSubmit={submitHandler}>
        <FormGroup controlId='email' >
        <FormLabel>Email Address</FormLabel>
        <Form.Control 
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
        </FormGroup>

        <FormGroup controlId='password' >
        <FormLabel>Password</FormLabel>
        <Form.Control 
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        </FormGroup>
        <Button type='submit' variant='primary'>
            Sign In
        </Button>
    </Form>
    <Row className='py-3'>
        <Col>
            New Costumer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>
            Register 
            </Link>
        </Col>
    </Row>
  </FormContainer>
            )
            }
export default LoginScreen
