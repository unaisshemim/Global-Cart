import UserCard from '@renderer/components/UserTable'

const Users = (): JSX.Element => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20vh',

          width: '100%'
        }}
      >
        <div style={{ width: '40%' }}>
          <h1>Users</h1>
          <UserCard />
        </div>
      </div>
    </>
  )
}

export default Users
