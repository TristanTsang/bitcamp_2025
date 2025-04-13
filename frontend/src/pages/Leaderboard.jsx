import { useEffect, useState, useRef } from "react";
import {
  Container,
  Title,
  List,
  Text,
  Paper,
  Loader,
  Center,
  ThemeIcon,
  Box,
  Stack,
  Group,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useResumeStore } from "../store/useResumeStore"; // adjust path accordingly

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { resumes, getAllResumes, setSelectedResume } = useResumeStore();
  const navigate = useNavigate();
  // Animation control
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star particles
    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        brightness: Math.random() * 0.8 + 0.2,
        color: `hsl(${Math.random() * 60 + 240}, 80%, 70%)`,
      });
    }

    // Nebula clouds
    const nebulae = [];
    for (let i = 0; i < 5; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 150,
        hue: Math.random() * 120 + 180, // Blue to purple range
        opacity: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.2 - 0.1,
      });
    }

    // Cosmic dust particles
    const dustParticles = [];
    for (let i = 0; i < 100; i++) {
      dustParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        color: `hsla(${Math.random() * 60 + 240}, 70%, 70%, ${
          Math.random() * 0.5 + 0.2
        })`,
      });
    }

    // Distant galaxies
    const galaxies = [];
    for (let i = 0; i < 3; i++) {
      galaxies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 50 + 30,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed:
          (Math.random() * 0.001 + 0.0002) * (Math.random() > 0.5 ? 1 : -1),
        color1: `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.7)`,
        color2: `hsla(${Math.random() * 60 + 280}, 80%, 70%, 0.5)`,
      });
    }

    // Shooting stars
    const shootingStars = [];
    const addShootingStar = () => {
      if (Math.random() > 0.99) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 15 + 10,
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 4,
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
        });
      }
    };

    // Aurora effect
    let time = 0;
    const drawAurora = () => {
      const height = canvas.height / 5;
      const y = canvas.height - height;

      const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
      gradient.addColorStop(0, "rgba(90, 20, 200, 0)");
      gradient.addColorStop(1, "rgba(130, 50, 220, 0.1)");

      ctx.fillStyle = gradient;
      ctx.beginPath();

      ctx.moveTo(0, canvas.height);
      for (let x = 0; x < canvas.width; x += 20) {
        const waveHeight =
          Math.sin((x / canvas.width) * Math.PI * 2 + time) * 20;
        const waveHeight2 =
          Math.sin((x / canvas.width) * Math.PI * 4 + time * 1.5) * 10;
        ctx.lineTo(x, y + waveHeight + waveHeight2);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      time += 0.01;
    };

    // Animated glow effect for items
    const glowIntensities = leaderboard.map(() => Math.random());
    let glowDirection = 1;
    const updateGlows = () => {
      for (let i = 0; i < glowIntensities.length; i++) {
        glowIntensities[i] += (Math.random() * 0.02 - 0.01) * glowDirection;
        if (glowIntensities[i] > 1) {
          glowIntensities[i] = 1;
          glowDirection = -1;
        } else if (glowIntensities[i] < 0.7) {
          glowIntensities[i] = 0.7;
          glowDirection = 1;
        }

        const listItem = document.getElementById(`leaderboard-item-${i}`);
        if (listItem) {
          const hue = 270 + i * 15; // Slightly different hue for each item
          listItem.style.boxShadow = `0 0 ${
            10 + glowIntensities[i] * 10
          }px hsla(${hue}, 70%, 50%, ${glowIntensities[i] * 0.7})`;
          listItem.style.borderColor = `hsla(${hue}, 80%, 70%, ${glowIntensities[i]})`;
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        gradient.addColorStop(
          0,
          `hsla(${nebula.hue}, 80%, 50%, ${nebula.opacity * 1.5})`
        );
        gradient.addColorStop(
          0.5,
          `hsla(${nebula.hue + 20}, 70%, 40%, ${nebula.opacity})`
        );
        gradient.addColorStop(1, "hsla(260, 60%, 30%, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move nebulae
        nebula.x += nebula.speed;
        nebula.y += nebula.speed / 2;

        // Wrap around screen
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
        if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;
      });

      // Draw galaxies
      galaxies.forEach((galaxy) => {
        ctx.save();
        ctx.translate(galaxy.x, galaxy.y);
        ctx.rotate(galaxy.rotation);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.radius);
        gradient.addColorStop(0, galaxy.color1);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, galaxy.radius, 0, Math.PI * 2);
        ctx.fill();

        // Galaxy spiral arms
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = galaxy.color2;
          ctx.lineWidth = galaxy.radius / 10;
          ctx.beginPath();
          for (let j = 0; j < Math.PI * 4; j += 0.1) {
            const radius = ((j * galaxy.radius) / (Math.PI * 4)) * 0.7;
            const x = Math.cos(j + (i * Math.PI * 2) / 3) * radius;
            const y = Math.sin(j + (i * Math.PI * 2) / 3) * radius;
            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }

        ctx.restore();

        // Rotate galaxy
        galaxy.rotation += galaxy.rotationSpeed;
      });

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(Date.now() * 0.003 * star.speed) * 0.3 + 0.7;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Make stars twinkle
        star.size = Math.max(
          1,
          star.size + (Math.random() * 0.2 - 0.1) * star.speed
        );

        // Move stars slightly
        star.y += star.speed;

        // Wrap around screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw dust particles
      dustParticles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Move dust particles in random directions
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.angle += Math.random() * 0.1 - 0.05;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw shooting stars
      shootingStars.forEach((star, index) => {
        if (star.life > 0) {
          ctx.save();
          ctx.translate(star.x, star.y);
          ctx.rotate(star.angle);

          const gradient = ctx.createLinearGradient(0, 0, star.length, 0);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.life})`);
          gradient.addColorStop(1, "rgba(80, 120, 255, 0)");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(star.length, star.length * 0.05);
          ctx.lineTo(star.length, -star.length * 0.05);
          ctx.closePath();
          ctx.fill();

          ctx.restore();

          // Move shooting star
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.life -= star.decay;
        } else {
          shootingStars.splice(index, 1);
        }
      });

      // Draw aurora
      drawAurora();

      // Add occasional shooting star
      addShootingStar();

      // Update glow effects for list items
      if (!loading) {
        updateGlows();
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [loading, leaderboard]);

  // Simulate fetching data from the backend
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await getAllResumes(); // fetch backend data and store it in Zustand
      setLoading(false);
    }
    fetchData();
  }, [getAllResumes]);

  useEffect(() => {
    // Sort resumes by score descending and store locally
    const sorted = [...resumes].sort((a, b) => b.score - a.score);
    setLeaderboard(sorted);
  }, [resumes]);

  console.log("leaderboard data:", leaderboard);

  return (
    <div
      ref={containerRef}
      className="cosmic-container"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0220 0%, #1b0042 50%, #0a0220 100%)",
        padding: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Canvas Animation */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <Container size="sm" py="xl" style={{ position: "relative", zIndex: 1 }}>
        <Title
          align="center"
          mb="xl"
          className="cosmic-title"
          style={{
            fontFamily: "Orbitron, Copperplate, fantasy",
            fontWeight: "bold",
            color: "#f2e6ff",
            textShadow:
              "0 0 15px rgba(153, 51, 255, 0.7), 0 0 30px rgba(90, 20, 200, 0.5)",
            fontSize: "2.5rem",
            position: "relative",
            animation: "cosmicPulse 4s infinite alternate",
          }}
        >
          <span
            className="trophy-left"
            style={{
              marginRight: "15px",
              display: "inline-block",
              animation: "trophyFloat 3s infinite alternate",
            }}
          >
            🏆
          </span>
          Record of Resumes
          <span
            className="trophy-right"
            style={{
              marginLeft: "15px",
              display: "inline-block",
              animation: "trophyFloat 3s infinite alternate-reverse",
            }}
          >
            🏆
          </span>
        </Title>

        {loading ? (
          <Center style={{ height: "300px" }}>
            <div className="cosmic-loader" style={{ position: "relative" }}>
              <div
                className="cosmic-loader-ring"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "4px solid transparent",
                  borderTopColor: "#9d4edd",
                  animation: "cosmicSpin 1.5s linear infinite",
                  boxShadow: "0 0 20px rgba(157, 78, 221, 0.6)",
                }}
              ></div>
              <div
                className="cosmic-loader-ring"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "4px solid transparent",
                  borderRightColor: "#c77dff",
                  animation: "cosmicSpin 1.2s linear infinite reverse",
                  boxShadow: "0 0 15px rgba(199, 125, 255, 0.6)",
                }}
              ></div>
              <div
                className="cosmic-loader-ring"
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: "4px solid transparent",
                  borderBottomColor: "#e0aaff",
                  animation: "cosmicSpin 0.9s linear infinite",
                  boxShadow: "0 0 10px rgba(224, 170, 255, 0.6)",
                }}
              ></div>
            </div>
          </Center>
        ) : (
          <Paper
            withBorder
            shadow="md"
            p="lg"
            radius="lg"
            className="cosmic-board"
            style={{
              background: "rgba(30, 10, 60, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow:
                "0 0 30px rgba(90, 30, 160, 0.5), inset 0 0 20px rgba(180, 120, 255, 0.2)",
              animation: "boardGlow 8s infinite alternate",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative cosmic elements */}
            <div
              className="board-shimmer-top"
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "300%",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
                animation: "shimmer 5s infinite",
              }}
            ></div>

            <div
              className="board-shimmer-bottom"
              style={{
                position: "absolute",
                bottom: 0,
                right: "-100%",
                width: "300%",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
                animation: "shimmerReverse 5s infinite",
              }}
            ></div>

            <Stack spacing="lg">
              {leaderboard.slice(0, 10).map((resume, index) => (
                <Box
                  onClick={() => {
                    setSelectedResume(resume);
                    navigate("/results");
                  }}
                  key={resume._id || index}
                  className="leaderboard-item"
                  style={{
                    background: `rgba(30, 10, 60, ${0.8 - index * 0.08})`,
                    borderRadius: "1rem",
                    padding: "1rem",
                    margin: "0.75rem 0",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(180, 120, 255, 0.3)",
                    boxShadow: `0 0 15px hsla(${
                      270 + index * 15
                    }, 70%, 50%, 0.4)`,
                    transform: `scale(${1 - index * 0.03})`,
                    animation: `itemFadeIn 0.6s ${index * 0.2}s both ease-out`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {/* Left side */}
                  <Group align="center" gap="md">
                    <ThemeIcon
                      color={
                        index === 0
                          ? "gold"
                          : index === 1
                          ? "silver"
                          : index === 2
                          ? "orange"
                          : "purple"
                      }
                      size={40}
                      radius="xl"
                      style={{
                        boxShadow: `0 0 10px ${
                          index === 0
                            ? "rgba(255, 215, 0, 0.7)"
                            : index === 1
                            ? "rgba(192, 192, 192, 0.7)"
                            : index === 2
                            ? "rgba(205, 127, 50, 0.7)"
                            : "rgba(147, 51, 234, 0.7)"
                        }`,
                        animation: "rankPulse 2s infinite alternate",
                      }}
                    >
                      {index === 0 ? "👑" : index + 1}
                    </ThemeIcon>
                    <Text
                      style={{
                        color: "#f2e6ff",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        textShadow: "0 0 5px rgba(242, 230, 255, 0.5)",
                      }}
                    >
                      {resume.username || "Anonymous"}
                    </Text>
                  </Group>

                  {/* Right side */}
                  <Text
                    span
                    style={{
                      background: `linear-gradient(90deg, #9d4edd, #c77dff)`,
                      padding: "0.3rem 0.8rem",
                      borderRadius: "1rem",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "0 0 10px rgba(157, 78, 221, 0.5)",
                      animation: "scorePulse 3s infinite",
                      minWidth: "60px",
                      textAlign: "right",
                    }}
                  >
                    {resume.elo} pts
                  </Text>
                </Box>
              ))}
            </Stack>
          </Paper>
        )}
      </Container>

      {/* CSS Animations */}
      <style jsx="true">{`
        @keyframes cosmicSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes shimmerReverse {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes boardGlow {
          0% {
            box-shadow: 0 0 30px rgba(90, 30, 160, 0.5),
              inset 0 0 20px rgba(180, 120, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(130, 80, 220, 0.6),
              inset 0 0 25px rgba(200, 150, 255, 0.3);
          }
          100% {
            box-shadow: 0 0 30px rgba(90, 30, 160, 0.5),
              inset 0 0 20px rgba(180, 120, 255, 0.2);
          }
        }

        @keyframes trophyFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(-5deg);
          }
        }

        @keyframes rankPulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }

        @keyframes scorePulse {
          0% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.9;
          }
        }

        @keyframes cosmicPulse {
          0% {
            text-shadow: 0 0 15px rgba(153, 51, 255, 0.7),
              0 0 30px rgba(90, 20, 200, 0.5);
          }
          100% {
            text-shadow: 0 0 25px rgba(180, 100, 255, 0.9),
              0 0 40px rgba(120, 60, 220, 0.7);
          }
        }

        @keyframes itemFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .leaderboard-item:hover {
          transform: translateX(10px) scale(1.02) !important;
          box-shadow: 0 0 25px rgba(180, 120, 255, 0.6) !important;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}

export default Leaderboard;
