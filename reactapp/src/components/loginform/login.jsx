import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function Login({ toggleCreateAccount }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['session']);

    const handleLogin = async () => {
        const body = {
            "email": email, "password": password
        }
        const response = await fetch(`/authenticate/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (response.status === 200) {
            setCookie('session', 'test', { path: '/' });
            localStorage.setItem("token", data.token)
            alert("logged in");
            navigate('/');
        } else {
            alert('Wrong credentials.');
        }
    };

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
            >
                <Form.Control type="email" placeholder="name@example.com"
                input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </FloatingLabel>

            <FloatingLabel
                controlId="floatingPassword"
                label="Lösenord"
                className="mb-3"
            >
                <Form.Control type="password" placeholder="Password"
                input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel>

            <Button variant="outline-primary" type="submit" onClick={handleLogin}>
                Logga in
            </Button>

            <Button variant="outline-secondary" onClick={toggleCreateAccount}>
                Skapa konto
            </Button>
        </>
    );
}

export default Login;
