import { Add, ArrowBack, Close } from '@mui/icons-material'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import ProductTable from '@renderer/components/ProductTable'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useNavigate } from 'react-router-dom'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import axios from 'axios'
import amazon from '../assets/amazon.jpg'
import flipkart from '../assets/flipkart.jpg'
import ajio from '../assets/ajio.jpg'
import myntra from '../assets/myntra.png'

const Product = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState({
    link: '',
    lastPrize: 0,
    website: '',
    logo: ''
  })
  const [website, setWebsite] = useState('')
  const [getProducts, setGetProducts] = useState([])
  const [error, setError] = useState({
    link: '',
    website: ''
  })
  const [currentPrizes, setCurrentPrizes] = useState({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleBack = (): void => {
    navigate('/cart')
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
    if (products.link && products.website) {
      const existingProductItems = JSON.parse(localStorage.getItem('products') || '[]')
      existingProductItems.push(products)
      console.log(existingProductItems)
      localStorage.setItem('products', JSON.stringify(existingProductItems))
      setOpen(false)
      //reload the page
      window.location.reload()
    } else {
      setError({
        link: products.link ? '' : 'Please enter a product link',
        website: products.website ? '' : 'Please select a website'
      })
    }
  }
  const websiteChange = (e): void => {
    setWebsite(e.target.value)
    const logo = {
      AMAZON: amazon,
      FLIPKART: flipkart,
      AJIO: ajio,
      MYNTRA: myntra
    }
    setProducts({ ...products, website: e.target.value, logo: logo[e.target.value] })
  }

  const fetchCurrentPrices = async (): Promise<void> => {
    const updatedCurrentPrizes = {}
    if (getProducts) {
      for (const row of getProducts as { link: string }[]) {
        console.log(row)
        try {
          const response = await axios.post('http://localhost:3000/getprize', { link: row.link })
          // Assuming the API response contains the current prize information in a certain format
          updatedCurrentPrizes[row.link] = response.data.prize
          setCurrentPrizes(updatedCurrentPrizes)
        } catch (error) {
          console.error('Error fetching current prize:', error)
        }
      }
    }
  }
  const handleStart = (): void => {
    setLoading(true)
    fetchCurrentPrices()
    setLoading(false)
  }
  useEffect(() => {
    setGetProducts(JSON.parse(localStorage.getItem('products') || '[]'))
  }, [])
  useEffect(() => {}, [currentPrizes])

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
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
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
          <h1>Product</h1>
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
        <ProductTable data={getProducts} currentPrizes={currentPrizes} loading={loading} />
        <Button
          variant="outlined"
          startIcon={<PlayArrowIcon />}
          size="small"
          sx={{ height: 40, color: 'white', borderColor: 'white', bgcolor: 'green' }}
          onClick={handleStart}
        >
          Start
        </Button>
      </div>

      <div></div>
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
            Add Product Link
          </h2>
          <TextField
            id="outlined-multiline-flexible"
            label="Product Link"
            multiline
            maxRows={2}
            style={{ marginTop: 2, marginBottom: 10 }}
            onChange={(e) => {
              setProducts({ ...products, link: e.target.value })
              setError({ ...error, link: '' }) // Reset error message when input changes
            }}
            error={!!error.link}
            fullWidth
          />
          <FormControl fullWidth error={!!error.website}>
            <InputLabel id="demo-simple-select-label">Website</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={website}
              label="Website"
              onChange={(e) => {
                websiteChange(e)
                setError({ ...error, website: '' }) // Reset error message when input changes
              }}
            >
              <MenuItem value={'AMAZON'}>Amazon</MenuItem>
              <MenuItem value={'FLIPKART'}>Flipkart</MenuItem>
              <MenuItem value={'AJIO'}>Ajio</MenuItem>
              <MenuItem value={'MYNTRA'}>Myntra</MenuItem>
              <MenuItem value={'OFFICIAL'}>Official</MenuItem>
            </Select>
          </FormControl>
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

export default Product
