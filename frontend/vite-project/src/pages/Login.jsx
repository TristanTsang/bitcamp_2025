// Login.jsx
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className={classes.wrapper}>
      <Container size="xl" className={classes.container}>
        <div className={classes.starsAccent}></div>
        <div className={classes.starsAccent2}></div>
        
        <Title ta="center" className={classes.title}>
          Welcome Back
        </Title>
        
        <Text c="dimmed" size="md" ta="center" mt={5} className={classes.subtitle}>
          Don't have an account yet?{' '}
          <Anchor size="md" component={Link} to="/signup" className={classes.anchor}>
            Create account
          </Anchor>
        </Text>
        
        <Paper withBorder shadow="md" p={35} mt={30} radius="lg" className={classes.paper}>
          <div className={classes.formGrid}>
            <div className={classes.formColumn}>
              <TextInput
                size="md"
                label="Email"
                placeholder="applicant@gmail.com"
                required
                classNames={{ label: classes.label, input: classes.input }}
              />
              
              <PasswordInput
                size="md"
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                classNames={{ label: classes.label, input: classes.input }}
              />
              
              <Button size="md" fullWidth mt="xl" className={classes.button}>
                Sign in
              </Button>
              
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