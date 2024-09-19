import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('formData');
    console.log(formData);
    // Validate inputs (simple example)
    if (!formData.username || !formData.email || !formData.password) {
        alert('Please fill all fields');
        return;
    }

    if (formData.password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });
      console.log('Registration successful:', response.data);
      navigate('/validate')
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type="text"
  //       name="username"
  //       placeholder="Username"
  //       value={formData.username}
  //       onChange={handleChange}
  //       required
  //     />
  //     <input
  //       type="email"
  //       name="email"
  //       placeholder="Email"
  //       value={formData.email}
  //       onChange={handleChange}
  //       required
  //     />
  //     <input
  //       type="password"
  //       name="password"
  //       placeholder="Password"
  //       value={formData.password}
  //       onChange={handleChange}
  //       required
  //     />
  //     <button type="submit">Register</button>
  //   </form>
  // );

  return (
    <Container>
        <Row className="px-4 my-5">
            <Col><h1>Register</h1></Col>
        </Row>
        <Row className="px-4 my-5">
            <Col sm={6}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="username" 
                          placeholder="Enter User Name"
                          value={formData.username}
                          onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange} />
                        <Form.Text className='text-muted'>
                            We'll never share your email!
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="password" 
                          placeholder="Enter Password"
                          value={formData.password}
                          onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">Register &gt;&gt;</Button>

                    &nbsp;&nbsp;
                    <Link
                        to='/login'>
                        <Button variant="outline-primary">Login</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Link
                        to='/'>
                        <Button variant="outline-primary">Cancel</Button>
                    </Link>
                </Form>
            </Col>
        </Row>
    </Container>
)
};

export default Register;

