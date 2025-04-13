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
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);
  const { signup } = useAuthStore();
  const handleSubmit = (email, password) => {
    if (email && password) signup(email, password);
  };

  return (
    <Container size={420} my={50}>
      <Title ta="center" className={classes.title}>
        Create an Account
      </Title>
      <Text c="dimmed" size="md" ta="center" mt={5}>
        Have an account?{" "}
        <Anchor size="md" component={Link} to="/login">
          Login
        </Anchor>
      </Text>

      <Paper size="lg" withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password.trim().length < 6) {
              toast.error("Password must be at least 6 characters long");
              return;
            }
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
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
