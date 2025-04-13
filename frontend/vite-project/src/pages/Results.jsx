import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Title, Paper, Text, Grid, Button } from '@mantine/core';
import Analytics from './Analytics'; // Assuming Analytics already displays the score and comparison

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the resultData and file from the location state
  const { resultData, file } = location.state || {};

  useEffect(() => {
    if (!resultData) {
      navigate('/');
    } 
  }, [resultData, navigate]);

  if (!resultData) {
    return null; // Optionally show loading spinner or redirect
  }

  // Function to handle resume download
  const handleDownload = () => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name; // Set the downloaded file's name
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container size="lg" my={40}>
      <Paper withBorder shadow="md" p="xl">
        <Grid gutter="lg">
          {/* Left Column: Analysis Section */}
          <Grid.Col span={12} md={6}>
            <Analytics
              score={resultData.score}
              strengths={resultData.strengths}
              weaknesses={resultData.weaknesses}
              suggestedActivities={resultData.suggestedActivities}
              experienceScore={resultData.experienceScore}
              skillsScore={resultData.skillsScore}
              educationScore={resultData.educationScore}
              comparisonText={resultData.comparisonText}
            />
          </Grid.Col>

          {/* Right Column: Resume Preview */}
          <Grid.Col span={12} md={6}>
            <Paper withBorder shadow="sm" p="lg">
              <Title order={3}>Resume</Title>
              {file ? (
                <>
                  <Text mt="md">Resume uploaded: {file.name}</Text>
                  <Button mt="md" onClick={handleDownload}>
                    Download Resume
                  </Button>

                  {/* PDF Viewer */}
                  <iframe
                    src={URL.createObjectURL(file)}
                    width="100%"
                    height="600px"
                    style={{ border: 'none', marginTop: '1rem' }}
                    title="Resume Preview"
                  ></iframe>
                </>
              ) : (
                <Text mt="md">No resume available</Text>
              )}
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Results;
