import { useState } from 'react';
import {
  Container,
  FileInput,
  Title,
  Button,
  Text,
  Paper,
  Loader
} from '@mantine/core';
import classes from './UploadResume.module.css';
import { useNavigate } from 'react-router-dom';

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      console.warn('No file selected');
      return;
    }

    setLoading(true);
    setError(null);

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
        localStorage.setItem('resultData', JSON.stringify(data));
        navigate('/results', { state: { resultData: data, file } });
      } else {
        const errorMessage = data?.error || 'Upload failed';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('🔥 Network or parsing error:', err);
      setError('Something went wrong while uploading your resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" my={40}>
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

        {error && (
          <Text color="red" mt="sm" align="center">
            {error}
          </Text>
        )}

        <Button fullWidth mt="md" onClick={handleUpload} disabled={!file || loading}>
          {loading ? <Loader size="sm" color="white" /> : 'Submit'}
        </Button>
      </Paper>
    </Container>
  );
}

export default UploadResume;
