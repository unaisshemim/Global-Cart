import ProductTable from '@renderer/components/ProductTable'

import { useNavigate } from 'react-router-dom'

const Product = (): JSX.Element => {
  const navigate = useNavigate()
  const handleBack = (): void => {
    navigate('/cart')
  }
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
        <h1>Product</h1>
        <ProductTable />
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  )
}

export default Product
