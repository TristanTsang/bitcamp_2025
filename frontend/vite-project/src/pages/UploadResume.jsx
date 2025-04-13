import { useState } from "react";
import {
  Container,
  FileInput,
  Title,
  Button,
  Text,
  Paper,
  Loader,
} from "@mantine/core";
import classes from "./UploadResume.module.css";
import { useResumeStore } from "../store/useResumeStore";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const { uploadResume } = useResumeStore();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const readerResult = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });

      await uploadResume(readerResult);

      navigate("/results");
    } catch (error) {
      console.log(error.data.message);
    } finally {
      setLoading(false);
    }
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
          onChange={(file) => setFile(file)}
          accept=".pdf"
          required
          classNames={{ label: classes.label }}
        />
        {error && (
          <Text color="red" mt="sm" align="center">
            {error}
          </Text>
        )}

        <Button
          fullWidth
          mt="md"
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? <Loader size="sm" color="white" /> : "Submit"}
        </Button>
      </Paper>
    </Container>
  );
}

export default UploadResume;
