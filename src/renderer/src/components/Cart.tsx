import { Card, CardContent, Typography } from '@mui/material'

const Cart = (): JSX.Element => {
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
      <div style={{ width: '150px', height: '150px' }}>
        <img
          src="https://www.southernliving.com/thmb/Rz-dYEhwq_82C5_Y9GLH2ZlEoYw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-837898820-1-4deae142d4d0403dbb6cb542bfc56934.jpg"
          alt="image"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20' }}
        />
      </div>

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
          Crocs Men
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Cart
