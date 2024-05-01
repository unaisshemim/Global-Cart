import UserCard from '@renderer/components/UserTable'

const Users = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8vh'
      }}
    >
      <div style={{ width: '70%' }}>
        <h1>Users</h1>
        <UserCard />
      </div>
    </div>
  )
}

export default Users
