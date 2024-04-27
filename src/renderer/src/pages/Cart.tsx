import CartTable from '@renderer/components/CartTable'
import { useNavigate } from 'react-router-dom'

const Cart = (): JSX.Element => {
  const navigate = useNavigate()
  const handleBack = (): void => {
    navigate('/')
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
        <h1>Cart</h1>
        <CartTable />
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  )
}

export default Cart
