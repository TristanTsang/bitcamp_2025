// Signup.jsx
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
import classes from './Login.module.css'; // Using the same CSS module as Login
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className={classes.wrapper}>
      <Container size="xl" className={classes.container}>
        <div className={classes.starsAccent}></div>
        <div className={classes.starsAccent2}></div>
        
        <Title ta="center" className={classes.title}>
          Create an Account
        </Title>
        
        <Text c="dimmed" size="md" ta="center" mt={5} className={classes.subtitle}>
          Already have an account?{' '}
          <Anchor size="md" component={Link} to="/login" className={classes.anchor}>
            Login
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
              
              <PasswordInput
                size="md"
                label="Confirm Password"
                placeholder="Confirm your password"
                required
                mt="md"
                classNames={{ label: classes.label, input: classes.input }}
              />
              
              <Button size="md" fullWidth mt="xl" className={classes.button}>
                Sign up
              </Button>
            </div>
            
            <div className={classes.decorativeColumn}>
              <div className={classes.decorativeCircle}></div>
              <Text className={classes.decorativeText}>Begin your adventure</Text>
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

export default Signup;