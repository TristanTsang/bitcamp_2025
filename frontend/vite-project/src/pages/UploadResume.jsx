import { useState } from "react";
import {
  Container,
  FileInput,
  Title,
  Button,
  Text,
  Paper,
} from "@mantine/core";
import classes from "./UploadResume.module.css";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const handleUpload = () => {
    if (!file) return;

    // Simulate file processing
    const reader = new FileReader();
    reader.onload = () => {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        type: file.type,
      });
      setUploaded(true);
    };
    reader.readAsArrayBuffer(file); // simulate processing
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
            onChange={setFile}
            accept=".pdf,.doc,.docx"
            required
            classNames={{ label: classes.label }}
          />
          <Button fullWidth mt="md" onClick={handleUpload} disabled={!file}>
            Submit
          </Button>
        </Paper>
      ) : (
        <Paper withBorder shadow="md" p="xl">
          <Title order={2} mb="md" align="center">
            Resume Uploaded 🎉
          </Title>
          <Text>
            <strong>Name:</strong> {fileInfo.name}
          </Text>
          <Text>
            <strong>Size:</strong> {fileInfo.size}
          </Text>
          <Text>
            <strong>Type:</strong> {fileInfo.type}
          </Text>
          <Text mt="lg" c="dimmed">
            You can now proceed to analyze or score your resume.
          </Text>
        </Paper>
      )}
    </Container>
  );
}

export default UploadResume;
