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
  
  function Login() {
    return (
      <Container size={420} my={50}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="md" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="md" component="button">
            Create account
          </Anchor>
        </Text>
  
        <Paper size="lg" withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput size="lg" label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput size="lg" label="Password" placeholder="Your password" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="md">
              Forgot password?
            </Anchor>
          </Group>
          <Button size="lg" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }
  
  export default Login;
  