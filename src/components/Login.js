import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // Jest do tego hook (NIEŹLE!), w kursie na udemy, robiłeś to inaczej (w trochę starszej odsłonie)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true); // To blokuje przed utworzeniem kilku kont!!!
      await logIn(emailRef.current.value, passwordRef.current.value); // Pamiętaj, że to zwraca nam obietnice (jest to napisane w AuthContext.js), dlatego łapiemy to w async / await
      history.push("/");
    } catch {
      setError("Failed to Log In");
    }

    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {" "}
              {/* disabled po prostu wyłącza buttona (nie można na niego kliknąć), CO WAŻNE, w normalnym <button></button> też jest taka własność!!! */}
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
