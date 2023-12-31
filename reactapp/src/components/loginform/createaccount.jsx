﻿import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        const body = {
             "email": email, "password": password
        }
        const response = await fetch(`/authenticate/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        alert(data.message);
        if (response.status === 201) {
            navigate('/');
        }
    };

    return (
        <Form onSubmit={handleRegister}>
            <FloatingLabel
                controlId="floatingInputEmail"
                label="Email"
                className="mb-3"
            >
                <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FloatingLabel>

        
            <FloatingLabel
                controlId="floatingInputUserName"
                label="User"
                className="mb-3"
            >
                <Form.Control
                    type="Text"
                    placeholder="UserName"
                    name="User"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
                controlId="floatingInputPassword"
                label="Lösenord"
                className="mb-3"
            >
                <Form.Control
                    type="password"
                    placeholder="Lösenord"
                    name="password"
                    value={password}
                   onChange={(e) => setPassword(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
                controlId="floatingConfirmPassword"
                label="Bekräfta lösenord"
                className="mb-3"
            >
                <Form.Control
                    type="password"
                    placeholder="Bekräfta lösenord"
                    name="confirmPassword"
                    
                    
                />
            </FloatingLabel>

            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Godkänn villkoren" />
            </Form.Group>

            <Button variant="outline-primary" type="submit" onClick={handleRegister}>
                Skapa konto
            </Button>
            <Button variant="outline-dark" type="button">
                Avbryt
            </Button>
        </Form>
    );
}

export default CreateAccount;
