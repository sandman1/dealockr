import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useCustomToast } from '../../hooks/useCustomToast';

interface LoginProps {
    updateAuthStatus: (status: boolean) => void;
  }

function Login({updateAuthStatus}: LoginProps): React.ReactElement {
    const navigate = useNavigate();
    const { showToast } = useCustomToast();
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
            // You can store the tokens in localStorage/sessionStorage if required
            localStorage.setItem('idToken', response.data.idToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            updateAuthStatus(true);
            showToast("Login successful!", { type: 'success', autoClose: 2000 });
            navigate('/dashboard');
        } catch (error) {
            showToast("Login failed. Please check your username and password.", { type: 'error', autoClose: 2000 });
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
                            <Form.Control 
                                type="text" 
                                name="username" 
                                value={formData.username}
                                placeholder="Enter User Name"
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                minLength={8}
                                name="password" 
                                value={formData.password}
                                placeholder="Enter Password"
                                onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" 
                            type="submit" >Login &gt;&gt;</Button>
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
