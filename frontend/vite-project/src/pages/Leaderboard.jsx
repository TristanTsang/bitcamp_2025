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
        // Replace with actual fetch call to your backend
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
        background: 'linear-gradient(90deg, rgba(147, 42, 155, 1) 0%, rgba(89, 160, 198, 1) 48%, rgba(87, 173, 199, 1) 50%, rgba(206, 237, 83, 1) 100%)',
        padding: '5rem',
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)'
      }}>
    <Container size="sm" py="xl">
      <Title align="center" mb="lg" style={{ fontFamily: 'Copperplate, fantasy', fontStyle: "bold", color: "#FFFFFF"}}    >
        🏆 Record of Resumes 🏆
      </Title>

      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Paper withBorder shadow="md" p="lg" radius="md">
          <List spacing="md" size="md">
            {leaderboard.map((person, index) => (
              <List.Item
                key={person.name}
                icon={
                  <ThemeIcon color="blue" size={32} radius="xl">
                    {index + 1}
                  </ThemeIcon>
                }
              >
                <Text>
                  <strong>{person.name}</strong> — <Text span c="dimmed">{person.score} pts</Text>
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
