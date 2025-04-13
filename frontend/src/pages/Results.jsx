import { Container, Title, Paper, Text, Grid, Button } from "@mantine/core";
import Analytics from "./Analytics"; // Assuming Analytics already displays the score and comparison
import { useResumeStore } from "../store/useResumeStore";
import './Results.css';

function Results() {
  const { userResumes, selectedResume } = useResumeStore();
  console.log(userResumes);

  // Get the resultData and file from the location state
  const resultData = selectedResume.analysis;
  // Function to handle resume download
  const handleDownload = () => {
    const url = selectedResume.resume;
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedResume.username + "Resume"; // Set the downloaded file's name
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container size="lg" my={40} 
    style={{paddingTop: "4em"}}>
      <Paper withBorder shadow="md" p="xl"
      style={{boxShadow: "10", backgroundColor: 'rgba(168, 61, 255, 0.5)'}}>
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
            <Paper withBorder shadow="sm" p="lg" style= {{backgroundColor:"rgba(25, 10, 41, 0.7)"}}>
              <Title order={3}>Resume</Title>
              {
                <>
                  <Button mt="md" onClick={handleDownload}>
                    Download Resume
                  </Button>

                  {/* PDF Viewer */}
                  <iframe
                    src={selectedResume.resume}
                    width="100%"
                    height="600px"
                    style={{ border: "none", marginTop: "1rem" }}
                    title="Resume Preview"
                  ></iframe>
                </>
              }
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Results;