import { useState } from 'react';
import { Container, FileInput, Title, Button, Text, Paper, Loader } from '@mantine/core';
import classes from "./UploadResume.module.css";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      console.warn('No file selected');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    console.log('📄 Selected file:', file);
    formData.append('resume', file);

    try {
      console.log('📤 Sending request to backend...');
      const response = await fetch('http://localhost:3000/api/review-resume', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      console.log('📨 Response headers:', contentType);

      if (!contentType || !contentType.includes('application/json')) {
        const rawText = await response.text();
        console.error('❌ Response is not JSON. Raw response:', rawText);
        alert('Unexpected response from server.');
        return;
      }

      const data = await response.json();
      console.log('✅ Response from backend:', data);

      if (response.ok) {
        setFileInfo({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          type: file.type,
        });
        setFeedback(data.feedback || 'No feedback provided');
        setUploaded(true);
      } else {
        console.error('🚫 Backend error response:', data);
        alert(data.error || 'Something went wrong on the server.');
      }
    } catch (error) {
      console.error("🔥 Network or parsing error:", error);
      alert('Something went wrong while uploading your resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" my={40}>
      {!uploaded ? (
        <Paper withBorder shadow="md" p="xl">
          <Title order={2} mb="md" align="center">
            Upload Your Resume
          </Title>
          <FileInput
            size="lg"
            label="Resume file"
            placeholder="Click to select your resume"
            value={file}
            onChange={(f) => {
              console.log('📎 File selected in input:', f);
              setFile(f);
            }}
            accept=".pdf,.doc,.docx"
            required
            classNames={{ label: classes.label }}
          />
          <Button fullWidth mt="md" onClick={handleUpload} disabled={!file || loading}>
            {loading ? 'Uploading...' : 'Submit'}
          </Button>
        </Paper>
      ) : (
        <Paper withBorder shadow="md" p="xl">
          <Title order={2} mb="md" align="center">
            Resume Uploaded 🎉
          </Title>
          <Text><strong>Name:</strong> {fileInfo?.name}</Text>
          <Text><strong>Size:</strong> {fileInfo?.size}</Text>
          <Text><strong>Type:</strong> {fileInfo?.type}</Text>
          <Text mt="lg" c="dimmed">
            You can now proceed to analyze or score your resume.
          </Text>

          <Text mt="md">
            <strong>Feedback:</strong>
          </Text>
          {feedback ? (
            <Text>{feedback}</Text>
          ) : (
            <Loader size="sm" variant="dots" />
          )}
        </Paper>
      )}
    </Container>
  );
}

export default UploadResume;
