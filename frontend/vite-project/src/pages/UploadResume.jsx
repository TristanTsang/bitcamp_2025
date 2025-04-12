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

  const { uploadResume } = useResumeStore();

  const handleUpload = async () => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await uploadResume(reader.result);
    };
  };

  return (
    <Container fluid px="xl" py="xl" my={40} style={{ paddingTop: 89 }}>
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
