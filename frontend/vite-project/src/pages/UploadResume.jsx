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
import { useResumeStore } from "../store/useResumeStore";
function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const { uploadResume } = useResumeStore();

  const handleUpload = async () => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await uploadResume(reader.result);
      setUploaded(true);
    };
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
          <Text mt="lg" c="dimmed">
            You can now proceed to analyze or score your resume.
          </Text>
        </Paper>
      )}
    </Container>
  );
}

export default UploadResume;
