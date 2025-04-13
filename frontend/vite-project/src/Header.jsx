// Header.jsx
import { useState } from 'react';
import { Burger, Container, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

export function Header() {
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
        
        <Group gap={5} visibleFrom="xs" className={classes.buttonGroup}>
          <Button
            component={Link}
            to="/signup"
            size="md"
            variant="outline"
            className={classes.signup}
          >
            Signup
          </Button>
          
          <Button
            component={Link}
            to="/login"
            size="md"
            className={classes.login}
          >
            Login
          </Button>
        </Group>
        
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