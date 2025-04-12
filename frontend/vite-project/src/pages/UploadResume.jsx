import { useState } from 'react';
import { Container, FileInput, Title, Button, Text, Paper, Grid } from '@mantine/core';
import classes from "./UploadResume.module.css";
import Analytics from './Analytics';
import { useNavigate } from 'react-router-dom';

function UploadResume() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
  
    const handleUpload = () => {
      if (!file) return;
  
      // Optional: process file first
      navigate('/results', { state: { file } }); // ✅ pass file via location state
    };
  
    return (
      <Container fluid px="xl" py="xl" my={40} style={{ paddingTop: 89, }}>
        <Paper withBorder shadow="md" p="xl">
          <Title order={2} mb="md" align="center">
            Upload Your Resume
          </Title>
          <FileInput
            size="lg"
            label="Resume file"
            placeholder="Click to select your resume (pdf)"
            value={file}
            onChange={setFile}
            accept=".pdf"
            required
            classNames={{ label: classes.label }}
          />
          <Button fullWidth mt="md" onClick={handleUpload} disabled={!file}>
            Submit
          </Button>
        </Paper>
      </Container>
    );
  }

export default UploadResume;
