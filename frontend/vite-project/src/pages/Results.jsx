import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Paper, Title, Text, Button } from '@mantine/core';
import Analytics from './Analytics';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;

  if (!file) {
    return (
      <Paper p="xl">
        <Title order={3}>No resume uploaded</Title>
        <Text mt="md">Please go back and upload your resume first.</Text>
        <Button mt="md" onClick={() => navigate('/')}>
          Back to Upload
        </Button>
      </Paper>
    );
  }

  return (
    <div style = {{ paddingTop: 89 ,width: '100vw', marginLeft: 'calc(-50vw + 50%)', boxSizing: 'border-box',

    }}>
    <Grid align="stretch" px ='xl' py="md">
      {/* Analytics */}
      <Grid.Col span={{ base: 12, md: 6 }} px="md">
        <Paper withBorder radius="md" shadow="md" style={{ height: '100%' }}>
        <Analytics
            score={78}
            strengths={['Strong project experience', 'Quantified achievements', 'awdsawd', 'awdsawdsa', 'awdsawd']}
            weaknesses={['Missing keywords', 'No summary section']}
            suggestedActivities={[
                'Add a summary highlighting your goals',
                'Include more industry-specific keywords',
            ]}
            experienceScore={85}
            skillsScore={72}
            educationScore={64}
            comparisonText="Your resume ranks in the top 25% of applicants for similar roles."
        />
        </Paper>
      </Grid.Col>

      {/* PDF Preview */}
      <Grid.Col span={{ base: 12, md: 6 }} px="md">
        <Paper shadow="md" radius="md" withBorder style={{ height: '100%' , display: 'flex', flexDirection: "column", 
            paddingLeft: "1rem", paddingRight: "1rem", paddingTop:"1rem"}}>
        <Title order={2} align="center" mb="md">
          Your Resume
        </Title>
          <iframe
            src={URL.createObjectURL(file)}
            style={{ width: '100%', height: '75vh', border: '1px solid #ccc' , flex: 1, borderRadius: '5px'}}
            title="Resume PDF Preview"
          />
        </Paper>
      </Grid.Col>
    </Grid>
    </div>
  );
}

export default ResultsPage;
