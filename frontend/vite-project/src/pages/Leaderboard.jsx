import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Stack,
  Text,
  Paper,
  Loader,
  Center,
  ThemeIcon,
  Group,
  Box
} from '@mantine/core';
import { useResumeStore } from '../store/useResumeStore';

function Leaderboard() {
  const { resumes, getAllResumes } = useResumeStore();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await getAllResumes(); // Fetches data and updates the store
      setLoading(false);
    }

    fetchData();
  }, [getAllResumes]);

  useEffect(() => {
    // Sort resumes by score descending and store locally
    const sorted = [...resumes].sort((a, b) => b.score - a.score);
    setLeaderboard(sorted);
  }, [resumes]);

  console.log('leaderboard data:', leaderboard);

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
            paddingBottom: '2rem'
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
            <Stack spacing="md">
            {leaderboard.slice(0, 5).map((resume, index) => (
              <Box
              key={resume.uid || index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                width: '100%',
              }}
            >
              {/* Left: Icon + UID */}
              <Group align="center" noWrap>
                <ThemeIcon
                  color={
                    index === 0
                      ? 'yellow'
                      : index === 1
                      ? 'gray'
                      : index === 2
                      ? 'orange'
                      : 'purple'
                  }
                  size={32}
                  radius="xl"
                >
                  {index + 1}
                </ThemeIcon>
                <Text c="white" fw={500}>
                  {resume.uid || 'Anonymous'}
                </Text>
              </Group>
            
              {/* Right: ELO score */}
              <Text c="dimmed" fw={500} style={{ minWidth: '60px', textAlign: 'right' }}>
                {resume.elo ?? 0} pts
              </Text>
            </Box>
            
            ))}

            </Stack>
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default Leaderboard;