import { Add, ArrowBack, Close } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import CartTable from '@renderer/components/CartTable'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'

const Cart = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState({ name: '', image: '', lowestPrize: 0, highestPrize: 0 }) // [ { name: 'item1', link: 'link1' }, { name: 'item2', link: 'link2' }
  const [getCart, setGetCart] = useState([])
  const [error, setError] = useState({
    name: '',
    image: ''
  })
  const navigate = useNavigate()
  const handleBack = (): void => {
    navigate('/')
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  }

  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const handleSubmit = (): void => {
    if (cart.image && cart.name) {
      const existingCartItems = JSON.parse(localStorage.getItem('cart') || '[]')
      existingCartItems.push(cart)
      localStorage.setItem('cart', JSON.stringify(existingCartItems))
      setOpen(false)
      window.location.reload()
    } else {
      setError({
        name: cart.name ? '' : 'Please enter a product name',
        image: cart.image ? '' : 'Please enter an image link'
      })
    }
  }
  useEffect(() => {
    setGetCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '45vh',
        height: '100px',
        width: '100%'
      }}
    >
      <div style={{ width: '40%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            size="small"
            sx={{ height: 40, color: 'white', borderColor: 'white' }}
            onClick={handleBack}
          >
            Back
          </Button>
          <h1>Cart</h1>
          <Button
            variant="contained"
            endIcon={<Add />}
            size="small"
            sx={{ height: 40 }}
            onClick={handleOpen}
          >
            Add
          </Button>
        </div>
        <CartTable data={getCart} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            height: 400,
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <h2 id="parent-modal-title" style={{ marginTop: 2, fontWeight: 'bold' }}>
            Add Product to Cart
          </h2>
          <TextField
            id="outlined-multiline-flexible"
            label="Product Name"
            multiline
            maxRows={2}
            style={{ marginTop: 2 }}
            onChange={(e) => {
              setCart({ ...cart, name: e.target.value })
              setError({ ...error, name: '' }) // Reset error message when input changes
            }}
            fullWidth
            error={!!error.name} // Set error state based on error message
            helperText={error.name}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Image Link"
            multiline
            maxRows={4}
            style={{ marginTop: 10 }}
            onChange={(e) => {
              setCart({ ...cart, image: e.target.value })
              setError({ ...error, image: '' }) // Reset error message when input changes
            }}
            fullWidth
            error={!!error.image} // Set error state based on error message
            helperText={error.image} // Display error message
          />
          <div style={{ marginTop: 10 }}>
            <Button
              variant="outlined"
              endIcon={<Close />}
              size="small"
              sx={{ height: 40, color: 'red' }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              endIcon={<Add />}
              size="small"
              sx={{ height: 40, marginLeft: '20px' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Cart
