import { useState } from 'react';
import {
  Container,
  FileInput,
  Title,
  Button,
  Text,
  Paper,
} from "@mantine/core";
import { useNavigate } from 'react-router-dom';

import classes from "./UploadResume.module.css";

function UploadResume() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = () => {
    if (!file) return;
    // Pass the file state to the results page via navigation state
    navigate('/results', { state: { file } });
  };

  return (
    <Container
      fluid
      px="xl"
      py="xl"
      my={40}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}
    >
      <Paper
        withBorder
        shadow="md"
        p="xl"
        radius="md"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <Title
          order={2}
          mb="md"
          align="center"
          style={{
            color: '#f2e6ff',
            textShadow: '0 0 10px rgba(153, 51, 255, 0.5)'
          }}
        >
          Upload Your Resume
        </Title>
        <FileInput
          size="lg"
          label="Resume file"
          placeholder="Click to select your resume (PDF)"
          value={file}
          onChange={setFile}
          accept=".pdf"
          required
          classNames={{ label: classes.label }}
          styles={{
            input: {
              textAlign: 'center', // Center the placeholder text
              color: '#e6ccff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(153, 51, 255, 0.5)',
            },
          }}
        />
        <Button
          fullWidth
          mt="md"
          onClick={handleUpload}
          disabled={!file}
          style={{
            background: 'linear-gradient(135deg, #9933ff, #6600cc)',
            border: 'none',
            boxShadow: '0 0 10px rgba(153, 51, 255, 0.5)',
            transition: 'all 0.3s ease',
          }}
        >
          Submit
        </Button>
      </Paper>
    </Container>
  );
}

export default UploadResume;