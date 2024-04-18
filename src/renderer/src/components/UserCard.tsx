import { Card, CardContent, Typography } from '@mui/material'
import Avatar, { genConfig } from 'react-nice-avatar'

const UserCard = (): JSX.Element => {
  const config = genConfig({ sex: 'man', hairStyle: 'mohawk' })
  return (
    <Card
      sx={{
        minWidth: 600,
        maxHeight: 200,
        backgroundColor: '#D4F2E6',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center', // Center vertically
        padding: 2
      }}
    >
      <Avatar style={{ width: '5rem', height: '5rem', marginRight: '1rem' }} {...config} />
      <CardContent
        sx={{
          padding: '10px',
          display: 'flex',
          alignItems: 'center', // Center vertically
          justifyContent: 'center', // Center horizontally
          //flex,: 1 // Allow text to take remaining space
          marginLeft: '3rem'
        }}
      >
        <Typography variant="h3" color={'#4C8886'} fontWeight={500}>
          Unaiz
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard
