import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import classes from "./Login.module.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { signin } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      
      try {
        await signin(email, password);
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      } catch (error) {
        setLoading(false);
        console.error("Login failed:", error);
      }
    }
  };
  
  // Other effects (like shooting stars) remain unchanged
  
  return (
    <div className={classes.wrapper}>
      {/* Background elements */}
      <div className={classes.nebula}></div>
      <div className={classes.starsAccent}></div>
      <div className={classes.starsAccent2}></div>
      
      {/* Shooting stars containers */}
      <div className={classes.shootingStar}></div>
      <div className={classes.shootingStar}></div>
      <div className={classes.shootingStar}></div>
      
      <Container size="xl" className={classes.container}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="md" ta="center" mt={5} className={classes.subtitle}>
          Don't have an account yet?{" "}
          <Anchor size="md" component={Link} to="/signup" className={classes.anchor}>
            Create account
          </Anchor>
        </Text>
        
        <Paper size="lg" withBorder shadow="md" p={35} mt={30} radius="lg" className={classes.paper}>
          <div className={classes.formGrid}>
            <div className={classes.formColumn}>
              <form onSubmit={handleSubmit}>
                <TextInput
                  size="md"
                  label="Email"
                  placeholder="applicant@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  classNames={{ label: classes.label, input: classes.input }}
                  disabled={loading}
                />
                <PasswordInput
                  size="lg"
                  label="Password"
                  placeholder="Your password"
                  required
                  mt="md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  classNames={{ label: classes.label, input: classes.input }}
                  disabled={loading}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  fullWidth 
                  mt="xl"
                  loading={loading}
                >
                  {loading ? "Logging in..." : "Sign in"}
                </Button>
              </form>
              <Anchor
                size="sm"
                ta="center"
                display="block"
                mt="md"
                className={classes.forgotPassword}
              >
                Forgot your password?
              </Anchor>
            </div>
            
            <div className={classes.decorativeColumn}>
              <div className={classes.orbitalRing}></div>
              <div className={classes.orbitalRing}></div>
              
              <div className={classes.decorativeCircle}></div>
              <Text className={classes.decorativeText}>Continue your journey</Text>
              <div className={classes.decorativeStar1}></div>
              <div className={classes.decorativeStar2}></div>
              <div className={classes.decorativeStar3}></div>
            </div>
          </div>
        </Paper>
      </Container>
      
      {/* Conditionally render the login success overlay only when on /login */}
      {location.pathname === '/login' && (
        <div className={`${classes.loginSuccess} ${showSuccess ? classes.active : ""}`}>
          <div className={classes.successInner}>
            <div className={classes.successCircle}></div>
            <div className={classes.successText}>Welcome Back!</div>
            <div className={classes.successSubtext}>Redirecting to your dashboard...</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;