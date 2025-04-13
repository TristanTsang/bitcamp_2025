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
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { signup } = useAuthStore();

  const handleSubmit = (email, password, username) => {
    if (email && password) signup(email, password, username);
  };

  return (
    <div style={{ paddingTop: "4rem" }}>
      <div className={classes.wrapper}>
        <Container size="xl" className={classes.container}>
          <div className={classes.starsAccent}></div>
          <div className={classes.starsAccent2}></div>
          <Title ta="center" className={classes.title}>
            Create an Account
          </Title>
          <Text
            c="dimmed"
            size="md"
            ta="center"
            mt={5}
            className={classes.subtitle}
          >
            Already have an account?{" "}
            <Anchor
              size="md"
              component={Link}
              to="/login"
              className={classes.anchor}
            >
              Login
            </Anchor>
          </Text>

          <Paper
            size="lg"
            withBorder
            shadow="md"
            p={35}
            mt={30}
            radius="lg"
            className={classes.paper}
          >
            <div className={classes.formGrid}>
              <div className={classes.formColumn}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!username.trim()) {
                      toast.error("You must create a username");
                      return;
                    }
                    if (password.trim().length < 6) {
                      toast.error(
                        "Password must be at least 6 characters long"
                      );
                      return;
                    }
                    handleSubmit(email, password, username);
                  }}
                >
                  <TextInput
                    size="lg"
                    label="Username"
                    placeholder="supercoolusername123"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    classNames={{ label: classes.label }}
                  />
                  <TextInput
                    mt="md"
                    size="lg"
                    label="Email"
                    placeholder="example@email.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    classNames={{ label: classes.label, input: classes.input }}
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
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    mt="xl"
                    className={classes.button}
                  >
                    Sign up
                  </Button>
                </form>
              </div>

              {/* Decorative column with orbital rings and circle */}
              <div className={classes.decorativeColumn}>
                <div className={classes.circleWrapper}>
                  <div className={classes.orbitalRing}></div>
                  <div className={classes.orbitalRing}></div>
                  <div className={classes.decorativeCircle}></div>
                </div>
                <Text className={classes.decorativeText}>
                  Begin your adventure
                </Text>
                <div className={classes.decorativeStar1}></div>
                <div className={classes.decorativeStar2}></div>
                <div className={classes.decorativeStar3}></div>
              </div>
            </div>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Signup;