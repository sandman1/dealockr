import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface LoginProps {
    updateAuthStatus: (status: boolean) => void;
  }

function Login({updateAuthStatus}: LoginProps): React.ReactElement {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setMessage('');
    
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            setMessage('Login successful!');
            console.log('Tokens:', response.data);
            // You can store the tokens in localStorage/sessionStorage if required
            localStorage.setItem('idToken', response.data.idToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            updateAuthStatus(true);
            navigate('/dashboard');
        } catch (error) {
            setError('Login failed. Please check your username and password.');
            console.error('Login error:', error);
        }
      };

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1>Login</h1></Col>
                <Col>{error && <p>{error}</p>}</Col>
            </Row>
            <Row className="px-4 my-5">
                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Name"
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" minLength={8} placeholder="Enter Password"
                                onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit" >Login &gt;&gt;</Button>
                        &nbsp;&nbsp;
                        <Link
                            to='/register'>
                            <Button variant="outline-primary">Register</Button>
                        </Link>
                        &nbsp;&nbsp;
                        <Link
                            to='/'>
                            <Button variant="outline-primary">Cancel</Button>
                        </Link>
                    </Form>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Col>
            </Row>
        </Container>
    )
}

export default Login;
