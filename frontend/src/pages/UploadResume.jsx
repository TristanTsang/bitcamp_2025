import { useState, useRef, useEffect } from "react";
import {
  Container,
  FileInput,
  Title,
  Button,
  Text,
  Paper
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./UploadResume.module.css";
import { useResumeStore } from "../store/useResumeStore";

function UploadResume() {
  const { uploadResume } = useResumeStore();
  const [file, setFile] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();
  
  const canvasRef = useRef(null);
  const uploadBoxRef = useRef(null);

  // Black hole animation effect
  useEffect(() => {
    if (!isAnimating || !canvasRef.current || !uploadBoxRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const uploadBox = uploadBoxRef.current;
    const uploadBoxRect = uploadBox.getBoundingClientRect();
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let boxX = uploadBoxRect.left + uploadBoxRect.width / 2;
    let boxY = uploadBoxRect.top + uploadBoxRect.height / 2;
    let boxWidth = uploadBoxRect.width;
    let boxHeight = uploadBoxRect.height;
    let opacity = 1;
    
    // Create particles for the black hole effect
    const particles = Array.from({ length: 300 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 150 + 50;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 3 + 1,
        color: `hsl(${Math.random() * 60 + 240}, 70%, 50%)`
      };
    });
    
    let animationId;
    const animateBlackHole = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw black hole (central gradient)
      const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 200);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.7, 'rgba(20, 0, 40, 0.8)');
      gradient.addColorStop(1, 'rgba(30, 0, 60, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw accretion disk (rotating elliptical gradient)
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
      
      // Animate particles
      particles.forEach(particle => {
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 10) {
          particle.x = centerX + Math.cos(Math.random() * Math.PI * 2) * 200;
          particle.y = centerY + Math.sin(Math.random() * Math.PI * 2) * 200;
        } else {
          const angle = Math.atan2(dy, dx);
          const force = 30 / distance;
          particle.x += Math.cos(angle) * particle.speed * force;
          particle.y += Math.sin(angle) * particle.speed * force;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Animate the upload box being sucked into the black hole
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
        
        // Only navigate if the upload is complete
        if (isUploaded && (distance < 15 || opacity < 0.05)) {
          setTimeout(() => {
            cancelAnimationFrame(animationId);
            navigate("/results", { state: { file } });
          }, 500);
        }
      }
      
      animationId = requestAnimationFrame(animateBlackHole);
    };
    
    animateBlackHole();
    return () => cancelAnimationFrame(animationId);
  }, [isAnimating, file, navigate, isUploaded]);
  
  const handleUpload = async () => {
    if (!file) return;
    setIsAnimating(true);
    try {
      // Read file as Data URL for upload
      const readerResult = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
      // Upload resume to the database via the store
      await uploadResume(readerResult);
      // Mark as uploaded
      setIsUploaded(true);
    } catch (error) {
      console.log("Upload error:", error.message);
      setIsAnimating(false);
    }
  };
  
  return (
    <div className={classes.pageWrapper}>
      <Container size="sm" className={classes.container}>
        <Title className={classes.title} order={1}>Upload Your Resume</Title>
        <div className={classes.centerWrapper}>
          <Paper className={classes.uploadBox} ref={uploadBoxRef} 
          style={{marginTop:"5rem", border: isAnimating ? "none" : undefined}}>
            <Text className={classes.label}>
            {isAnimating ? "" : "Upload your resume to get started"}</Text>
            <FileInput
              value={file}
              onChange={setFile}
              placeholder="Click to select file"
              accept="application/pdf,.doc,.docx"
              className={classes.fileInput}
            />
            <Button
              onClick={handleUpload}
              disabled={!file || isAnimating}
              className={classes.submitButton}
            >
             Submit
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
