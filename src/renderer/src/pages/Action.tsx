import Cart from '@renderer/components/Cart'

const Users = (): JSX.Element => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100,
          height: '100px'
        }}
      >
        <Cart />
      </div>
    </>
  )
}

export default Users
