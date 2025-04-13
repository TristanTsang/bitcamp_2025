// Login.jsx
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
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import classes from "./Login.module.css";
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);
  const { signin } = useAuthStore();
  const handleSubmit = (email, password) => {
    if (email && password) signin(email, password);
  };
  return (
    <div className={classes.wrapper}>
      <Container size="xl" className={classes.container}>
        <div className={classes.starsAccent}></div>
        <div className={classes.starsAccent2}></div>
        
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="md" ta="center" mt={5}>
        Don't have an account yet?{" "}
        <Anchor size="md" component={Link} to="/signup" className={classes.anchor}>
          Create account
        </Anchor>
      </Text>

      <Paper size="lg" withBorder shadow="md" p={35} mt={30} radius="lg" className={classes.paper}>
          <div className={classes.formGrid}>
            <div className={classes.formColumn}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(email, password);
              }}
            >
          <TextInput
            size="md"
            label="Email"
            placeholder="applicant@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            classNames={{ label: classes.label , input: classes.input }}
          />
          <PasswordInput
            size="lg"
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
            classNames={{ label: classes.label, input: classes.input }}
          />
          <Button type="submit" size="lg" fullWidth mt="xl">
            Sign in
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
              <div className={classes.decorativeCircle}></div>
              <Text className={classes.decorativeText}>Continue your journey</Text>
              <div className={classes.decorativeStar1}></div>
              <div className={classes.decorativeStar2}></div>
              <div className={classes.decorativeStar3}></div>
            </div>
          </div>
      </Paper>
    </Container>
    </div>
  );
}

export default Login;
