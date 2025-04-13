import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

function Home() {
  return (
    <div style={{ paddingTop: "5rem" }}>
      <h1 style={{ paddingBottom: "2rem", paddingTop: "2em" }}>
        Resume Reviewer
      </h1>
      <div className="card">
        <p style={{ marginLeft: "2em", marginRight: "2em" }}>
          Resume Reviewer helps you recognize places in your resume where you
          can strengthen to help you get your dream job. It also provides a
          score to your resume and ranks it among other resumes, so you can see
          how you compare to other applicants.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          alignItems: "center",
          paddingTop: "3rem",
        }}
      >
        <Button
          w="auto"
          component={Link}
          to="/upload"
          size="md"
          variant="filled"
          style={{ alignSelf: "center", marginBottom: "1rem" }}
        >
          Upload
        </Button>
        <Button
          w="auto"
          component={Link}
          to="/leaderboard"
          size="md"
          variant="filled"
          style={{ alignSelf: "center", marginBottom: "1rem" }}
        >
          Leaderboard
        </Button>
        <Button
          w="auto"
          component={Link}
          to="/history"
          size="md"
          variant="filled"
          style={{ alignSelf: "center" }}
        >
          My Resumes
        </Button>
      </div>
    </div>
  );
}

export default Home;
