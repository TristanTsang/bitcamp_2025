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

function Login() {
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);
  const { signin } = useAuthStore();
  const handleSubmit = (email, password) => {
    if (email && password) signin(email, password);
  };
  return (
    <Container size={420} my={50}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="md" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="md" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper size="lg" withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={() => {
            handleSubmit(email, password);
          }}
        >
          <TextInput
            size="lg"
            label="Email"
            placeholder="applicant@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            classNames={{ label: classes.label }}
          />
          <PasswordInput
            size="lg"
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
            classNames={{ label: classes.label }}
          />
          <Button type="submit" size="lg" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
