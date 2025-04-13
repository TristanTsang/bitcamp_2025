// Header.jsx
import { useState } from 'react';
import { Burger, Container, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { useAuthStore } from "./store/useAuthStore";

export function Header() {
  const { authUser, signout } = useAuthStore();
  const [opened, { toggle }] = useDisclosure(false);
  
  return (
    <header className={classes.header}>
      <Container fluid size="md" className={classes.inner}>
        <Button
          component={Link}
          to="/"
          variant="gradient"
          gradient={{ from: '#1a0033', to: '#4a1577', deg: 135 }}
          size="md"
          style={{ fontSize: 20, fontWeight: 'bold' }}
          className={classes.title}
        >
          Resume Reviewer
        </Button>
        
        {!authUser && (
          <div>
            <Group gap={5} visibleFrom="xs" className={classes.debugGroup}>
              <Button
                component={Link}
                to="/signup"
                size="md"
                variant="default"
                className={classes.signup}
              >
                Signup
              </Button>

              <Button
                component={Link}
                to="/login"
                size="md"
                className={classes.login}
                style={{ backgroundColor: "#7668fc" }}
              >
                Login
              </Button>
            </Group>
          </div>
        )}
        {authUser && (
          <div>
            <Group gap={5} visibleFrom="xs" className={classes.debugGroup}>
              <Button
                component={Link}
                onClick={() => {
                  signout();
                }}
                size="md"
                variant="default"
                style={{ backgroundColor: "#7668fc" }}
                className={classes.signup}
              >
                Logout
              </Button>
            </Group>
          </div>
        )}
        
        <Burger 
          opened={opened} 
          onClick={toggle} 
          hiddenFrom="xs" 
          size="sm"
          color="#e6ccff" 
        />
      </Container>
    </header>
  );
}
