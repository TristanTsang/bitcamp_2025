import { Carousel } from "@mantine/carousel";
import { Card, Text, Title, Badge, Group } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import { motion } from "framer-motion";
import { useResumeStore } from "../store/useResumeStore";
import { useEffect } from "react";
export const ResumeCarousel = ({ resumes }) => {
  const { getUserResumes, userResumes } = useResumeStore();
  useEffect(() => {
    getUserResumes();
  }, [getUserResumes]);
  console.log(userResumes);
  if (!userResumes || userResumes.length === 0)
    return <Text>No resumes found.</Text>;
  return (
    <Carousel
      slideSize="33%"
      align="center"
      slideGap="md"
      withIndicators
      draggable
    >
      {userResumes.map((resume) => (
        <Carousel.Slide key={resume._id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card shadow="md" p="xl" radius="lg" padding="lg" withBorder style>
              <Title order={3}>{resume.username}'s Resume</Title>
              <Text size="sm" mt="xs" color="dimmed">
                Uploaded on: {new Date(resume.createdAt).toLocaleDateString()}
              </Text>

              <Text mt="md">
                <strong>Score:</strong> {resume.elo} / 100
              </Text>
            </Card>
          </motion.div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
