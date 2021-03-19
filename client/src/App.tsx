import React from 'react'
import { Container, Box, Typography } from '@material-ui/core'
import Homepage from './components/Homepage.component'
import FormTemplate from './components/FormTemplate.component'
import Configure from './components/Configure.component'

const App: React.FC = () => (
  <Container maxWidth='md'>
    <Box my={4}>
      <Configure />
    </Box>
    <Box my={4}>
      <Homepage />
    </Box>
  </Container>
)

export default App
