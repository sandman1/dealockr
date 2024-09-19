import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Validate() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        code: '',
    });
    const [message, setMessage] = useState('null');
    const [error, setError] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/confirm', {
            username: formData.username,
            code: formData.code,
            });
            setMessage('Account confirmed successfully!');
            navigate('/login')
            console.log(response.data);
        } catch (error) {
            setError('Failed to confirm account. Please check the confirmation code.');
            console.error(error);
        }
    };

    return (
        <Container>
            <Row className="px-4 my-5">
                <Col><h1>Validate</h1></Col>
            </Row>
            <Row className="px-4 my-5">
                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control 
                                type="text"
                                name="username"
                                value={formData.username} 
                                placeholder="Enter User Name"
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Authentication Code</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="code"
                                value={formData.code}
                                placeholder="Enter Authentication Code"
                                onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Validate &gt;&gt;</Button>
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

export default Validate;