import { useState, useRef, useEffect } from 'react';
import { Container, FileInput, Title, Button, Text, Paper } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import classes from "./UploadResume.module.css";
import { useResumeStore } from "../store/useResumeStore";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const uploadBoxRef = useRef(null);

  useEffect(() => {
    if (!isAnimating || !canvasRef.current || !uploadBoxRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const uploadBox = uploadBoxRef.current;
    const uploadBoxRect = uploadBox.getBoundingClientRect();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let boxX = uploadBoxRect.left + uploadBoxRect.width / 2;
    let boxY = uploadBoxRect.top + uploadBoxRect.height / 2;
    let boxWidth = uploadBoxRect.width;
    let boxHeight = uploadBoxRect.height;
    let opacity = 1;

    const particles = Array.from({ length: 300 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 150 + 50;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 240}, 70%, 50%)`,
      };
    });

    let animationId;

    const animateBlackHole = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Black hole
      const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 200);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.7, 'rgba(20, 0, 40, 0.8)');
      gradient.addColorStop(1, 'rgba(30, 0, 60, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Accretion disk
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(Date.now() * 0.0005);
      ctx.translate(-centerX, -centerY);
      const diskGradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 200);
      diskGradient.addColorStop(0, 'rgba(100, 10, 200, 0)');
      diskGradient.addColorStop(0.5, 'rgba(120, 20, 220, 0.3)');
      diskGradient.addColorStop(0.7, 'rgba(140, 40, 240, 0.2)');
      diskGradient.addColorStop(1, 'rgba(160, 60, 255, 0)');
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 200, 70, 0, 0, Math.PI * 2);
      ctx.fillStyle = diskGradient;
      ctx.fill();
      ctx.restore();

      // Particles
      particles.forEach(p => {
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10) {
          p.x = centerX + Math.cos(Math.random() * Math.PI * 2) * 200;
          p.y = centerY + Math.sin(Math.random() * Math.PI * 2) * 200;
        } else {
          const angle = Math.atan2(dy, dx);
          const force = 30 / dist;
          p.x += Math.cos(angle) * p.speed * force;
          p.y += Math.sin(angle) * p.speed * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Suck in the upload box
      if (opacity > 0) {
        const dx = centerX - boxX;
        const dy = centerY - boxY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        boxX += dx * 0.02;
        boxY += dy * 0.02;
        boxWidth *= 0.99;
        boxHeight *= 0.99;
        opacity *= 0.99;

        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#6b21a8';
        ctx.fillRect(boxX - boxWidth / 2, boxY - boxHeight / 2, boxWidth, boxHeight);
        ctx.globalAlpha = 1;

        if (distance < 15 || opacity < 0.05) {
          setTimeout(() => {
            cancelAnimationFrame(animationId);
            navigate('/results', { state: { file } });
          }, 500);
        }
      }

      animationId = requestAnimationFrame(animateBlackHole);
    };

    animateBlackHole();
    return () => cancelAnimationFrame(animationId);
  }, [isAnimating, file, navigate]);

  const handleUpload = () => {
    if (!file) return;
    setIsAnimating(true);
  };

  return (
    <div className={classes.pageWrapper}>
      <Container size="sm" className={classes.container}>
        <Title className={classes.title} order={1}>Upload Your Resume</Title>
        <div className={classes.centerWrapper}>
          <Paper className={classes.uploadBox} ref={uploadBoxRef}>
            <Text className={classes.label}>Upload your resume to get started</Text>
            <FileInput
              value={file}
              onChange={setFile}
              placeholder="Click to select file"
              accept="application/pdf,.doc,.docx"
              className={classes.fileInput}
            />
            <Button
              onClick={handleUpload}
              disabled={!file}
              className={classes.submitButton}
            >
              {isAnimating ? "Processing..." : "Submit"}
            </Button>
          </Paper>
        </div>
        {isAnimating && (
          <canvas ref={canvasRef} className={classes.animationCanvas} />
        )}
      </Container>
    </div>
  );
}

export default UploadResume;
