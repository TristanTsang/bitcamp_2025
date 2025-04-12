import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

function Home() {
    return (
        <>
        <h1>Resume Reviewer</h1>
        <div className="card">
          <p>
            Resume Reviewer helps you recognize places in your resume where you can strengthen to help you get your dream job.
            It also provides a score to your resume and ranks it among other resumes, so you can see how you compare to other applicants.
          </p>
        </div>
        <div className="card" style={{ display: "flex", flexDirection: "column", rowGap: "1rem", alignItems: "center"}}>
        <Button
                w="auto"
                component={Link}
                to="/upload"
                size="md"
                variant='filled'
                style={{ alignSelf: 'center' }}
            >Upload</Button>
        <Button
                w="auto"
                component={Link}
                to="/leaderboard"
                size="md"
                variant='filled'
                style={{ alignSelf: 'center' }}
            >Leaderboard</Button>
        </div>
        </>
    );
  }
  
  export default Home;