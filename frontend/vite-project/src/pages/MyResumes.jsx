import { useState } from "react";
import {
  Container,
  FileInput,
  Title,
  Button,
  Text,
  Group,
  Loader,
  Paper,
} from "@mantine/core";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../store/useResumeStore";
import { useEffect } from "react";
import { Sparkline } from "@mantine/charts";
import { useAuthStore } from "../store/useAuthStore";
import PDFAsImage from "../components/PDFAsImage";

function MyResumePage() {
  const { getUserResumes, userResumes, setSelectedResume } = useResumeStore();

  useEffect(() => {
    getUserResumes();
  }, [getUserResumes]);
  console.log(userResumes);
  const eloHistory = userResumes.reverse().map((resume) => resume.elo);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        minHeight: "80vh",
      }}
    >
      <h1 style={{ paddingTop: "2em" }}>Your Resume History</h1>

      {userResumes.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper
            className={classes.paper}
            w={400}
            h={200}
            mb="xl"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkline
              w={300}
              h={100}
              data={eloHistory}
              curveType="linear"
              color="purple"
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </Paper>
        </div>
      )}

      <div
        style={{
          padding: "0px 60px 60px 60px",
          rowGap: "1rem",
          columnGap: "2rem",
          display: "grid",
          gridTemplateColumns: " repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {userResumes.map((resume) => (
          <Paper
            onClick={() => {
              setSelectedResume(resume);
              navigate("/results");
            }}
            className={classes.paper}
            shadow="sm"
            radius="md"
            key={resume._id}
            withBorder
            style={{
              height: "250px",
              width: "250px",
              border: "2px solid black",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                height: "200px",
                width: "250px",
              }}
              src={resume.resume.slice(0, -3) + "png"}
            ></img>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Text fw={700}>
                {new Date(resume.createdAt).toLocaleDateString()}
              </Text>
              <Text fw={700}>Score: {resume.elo}</Text>
            </div>
          </Paper>
        ))}
        {userResumes.length === 0 && (
          <Text size="sm">You have no resumes to view</Text>
        )}
      </div>
    </div>
  );
}

export default MyResumePage;
