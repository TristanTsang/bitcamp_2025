import { useState } from "react";
import {
  Container,
  FileInput,
  Title,
  Button,
  Text,
  Loader,
  Paper,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../store/useResumeStore";
import classes from "./UploadResume.module.css";

function UploadResume() {
  const { uploadResume } = useResumeStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
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
    <Container
      fluid
      px="xl"
      py="xl"
      my={40}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper
        withBorder
        shadow="md"
        p="xl"
        radius="md"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Title
          order={2}
          mb="md"
          align="center"
          style={{
            color: "#f2e6ff",
            textShadow: "0 0 10px rgba(153, 51, 255, 0.5)",
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
              textAlign: "center", // Center the placeholder text
              color: "#e6ccff",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(153, 51, 255, 0.5)",
            },
          }}
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
          style={{
            background: "linear-gradient(135deg, #9933ff, #6600cc)",
            border: "none",
            boxShadow: "0 0 10px rgba(153, 51, 255, 0.5)",
            transition: "all 0.3s ease",
          }}
        >
          {loading ? <Loader size="sm" color="white" /> : "Submit"}
        </Button>
      </Paper>
    </Container>
  );
}

export default UploadResume;
