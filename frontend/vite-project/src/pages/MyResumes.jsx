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
  Box
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

  const minY = 0
  const maxY = 100
  const midY = (minY + maxY) / 2;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        minHeight: "80vh",
      }}
    >
      <h1 style={{ paddingTop: "2em" }}>Your Resume History</h1>

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
          <Box style={{ position: 'relative', width: '300px', height: '100px', margin: 'auto' }}>
            {/* Your Sparkline chart */}
            <Sparkline w={'300px'} h={'100px'} data={eloHistory} curveType="linear"
                  color="purple"
                  fillOpacity={0.6}
                  strokeWidth={2}
                  style={{marginLeft:"2rem"}} />
            
            {/* X axis label */}
            <Text
              size="xs"
              style={{
                position: 'absolute',
                bottom: -20,
                left: 25,
                width: '100%',
                textAlign: 'center',
              }}
            >
              {"Resume Progress"}
            </Text>
            
            {/* Y axis label */}
            <Text
              size="xs"
              style={{
                position: 'absolute',
                left: -30,
                top: '60%',
                transform: 'translateY(-50%) rotate(-90deg)',
                transformOrigin: 'left top',
              }}
            >
              {"Elo"}
            </Text>

            {/* Y-axis numeric tick labels */}
            <Box
              style={{
                position: 'absolute',
                left: 0,
                top: -5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
              }}
            >
              <Text size="xs" style={{ color: 'white' }}>
                {maxY}
              </Text>
              <Text size="xs" style={{ color: 'white' }}>
                {midY.toFixed(0)}
              </Text>
              <Text size="xs" style={{ color: 'white' }}>
                {minY}
              </Text>
            </Box>
          </Box>
        </Paper>
      </div>

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
      </div>
    </div>
  );
}

export default MyResumePage;
