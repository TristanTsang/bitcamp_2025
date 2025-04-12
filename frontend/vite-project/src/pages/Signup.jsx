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
  } from '@mantine/core';
  import classes from './Login.module.css';
  import { Link } from 'react-router-dom';
  
  function Signup() {
    return (
      <Container size={420} my={50}>
        <Title ta="center" className={classes.title}>
          Create an Account
        </Title>
        <Text c="dimmed" size="md" ta="center" mt={5}>
          Have an account?{' '}
          <Anchor size="md" component={Link} to="/login">
            Login
          </Anchor>
        </Text>
  
        <Paper size="lg" withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput size="lg" label="Email" placeholder="applicant@gmail.com" required 
          classNames = {{label: classes.label}}/>
          <PasswordInput size="lg" label="Password" placeholder="Your password" required mt="md" 
          classNames = {{label: classes.label}}/>
          <Button size="lg" fullWidth mt="xl">
            Signup
          </Button>
        </Paper>
      </Container>
    );
  }
  
  export default Signup;
  