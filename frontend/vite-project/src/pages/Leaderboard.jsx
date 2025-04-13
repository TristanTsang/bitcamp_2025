import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  List,
  Text,
  Paper,
  Loader,
  Center,
  ThemeIcon,
} from '@mantine/core';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from the backend
  useEffect(() => {
    async function fetchScores() {
      setLoading(true);
      try {
        // Replace with your actual fetch call
        const fakeData = [
          { name: 'Alice Johnson', score: 92 },
          { name: 'Ben Li', score: 88 },
          { name: 'Chris Ray', score: 75 },
          { name: 'Dana Lopez', score: 95 },
          { name: 'Elliot Kim', score: 81 },
        ];

        // Sort scores descending
        const sorted = fakeData.sort((a, b) => b.score - a.score);
        setLeaderboard(sorted);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2a0a4a 0%, #4a1577 50%, #2a0a4a 100%)',
        padding: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container size="sm" py="xl">
        <Title
          align="center"
          mb="lg"
          style={{
            fontFamily: 'Copperplate, fantasy',
            fontWeight: 'bold',
            color: '#f2e6ff',
            textShadow: '0 0 10px rgba(153, 51, 255, 0.5)',
          }}
        >
          🏆 Record of Resumes 🏆
        </Title>

        {loading ? (
          <Center>
            <Loader color="violet" />
          </Center>
        ) : (
          <Paper
            withBorder
            shadow="md"
            p="lg"
            radius="md"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <List spacing="md" size="md">
              {leaderboard.map((person, index) => (
                <List.Item
                  key={person.name}
                  icon={
                    <ThemeIcon color="purple" size={32} radius="xl">
                      {index + 1}
                    </ThemeIcon>
                  }
                >
                  <Text>
                    <strong style={{ color: '#f2e6ff' }}>{person.name}</strong> —{' '}
                    <Text span c="dimmed">
                      {person.score} pts
                    </Text>
                  </Text>
                </List.Item>
              ))}
            </List>
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default Leaderboard;