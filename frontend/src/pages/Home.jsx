import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

function Home() {
  return (
    <div style={{ paddingTop: "3rem" }}>
      <h1 style={{ paddingBottom: "1.5rem", paddingTop: "2em", color: "white" }}>
        CosmicCV
      </h1>
      <h4 style={{ paddingBottom: "1rem"}} >An 'Out of this World' Resume Reviewer</h4>
      <div className="card">
      <h4 style={{ paddingBottom: "1rem"}}>Gaze upon your career path written in the stars</h4>
        <p style={{ marginLeft: "2em", marginRight: "2em" }}>
          CosmicCV helps you recognize places in your resume you can strengthen
          to help you get your dream job. It also provides a score to your
          resume and ranks it among other resumes, so you can see how you
          compare to other applicants. Furthermore, you can check other
          applicants' resumes for direction. To help you keep track of your
          progress, it also provides a history of your resumes and a graph of
          your scores.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          alignItems: "center",
          paddingTop: "1.5rem",
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
