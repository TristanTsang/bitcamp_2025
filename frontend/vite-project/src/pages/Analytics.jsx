import {
    Card,
    Title,
    Text,
    Progress,
    List,
    Group,
    Divider,
    Box,
    Stack,
  } from '@mantine/core';
  
  function Analytics({
    score,
    strengths,
    weaknesses,
    suggestedActivities,
    experienceScore,
    skillsScore,
    educationScore,
    comparisonText,
  }) {
    return (
      <Card shadow="md" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
        <Title order={2} align="center" mb="md">
          Resume Analysis Summary
        </Title>
  
        {/* Main Score */}
        <Group position="apart" mt="md" mb="xs">
          <Text>Overall Score</Text>
          <Text weight={700}>{score}/100</Text>
        </Group>
        <Progress value={score} color={score > 70 ? 'teal' : score > 50 ? 'yellow' : 'red'} />
  
        <Divider my="lg" />
  
        {/* Grid-style layout inside the Card */}
        <Group align="flex-start" position="apart" grow noWrap>
          {/* Left: Strengths, Weaknesses, Suggestions */}
          <Box style={{ flex: 1 }}>
            <Title order={4} mb="xs">Strengths</Title>
            <List size="sm">
              {strengths.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
  
            <Title order={4} mt="md" mb="xs">Areas to Improve</Title>
            <List size="sm" >
              {weaknesses.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
  
            <Title order={4} mt="md" mb="xs">Suggested Activities</Title>
            <List size="sm">
              {suggestedActivities.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </Box>
  
          {/* Right: Subscores + Comparison */}
          <Box style={{ flex: 1, paddingLeft: '2rem' }}>
            <Stack gap="md">
              <div>
                <Text weight={600} mb={4}>Experience</Text>
                <Progress value={experienceScore} color="blue" />
                <Text size="sm" c="dimmed">{experienceScore}/100</Text>
              </div>
  
              <div>
                <Text weight={600} mb={4}>Skills</Text>
                <Progress value={skillsScore} color="grape" />
                <Text size="sm" c="dimmed">{skillsScore}/100</Text>
              </div>
  
              <div>
                <Text weight={600} mb={4}>Education</Text>
                <Progress value={educationScore} color="cyan" />
                <Text size="sm" c="dimmed">{educationScore}/100</Text>
              </div>
  
              <Divider />
  
              <div>
                <Text weight={600}>Comparison</Text>
                <Text size="sm" c="dimmed" mt={4}>
                  {comparisonText}
                </Text>
              </div>
            </Stack>
          </Box>
        </Group>
      </Card>
    );
  }
  
  export default Analytics;
  