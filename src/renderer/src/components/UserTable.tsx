import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

// import DoDisturbIcon from '@mui/icons-material/DoDisturb'

function createData(
  customerDetails: string,
  order: number,
  status: string,
  avatar: string
): { customerDetails: string; order: number; status: string; avatar: string } {
  return { customerDetails, order, status, avatar }
}

const rows = [
  createData(
    'Unais',
    1,
    'Registered',
    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
  )
]

export default function UserCard(): JSX.Element {
  const [selectedRow, setSelectedRow] = useState(null)
  const navigate = useNavigate()

  const handleRowClick = (): void => {
    setTimeout(() => {
      setSelectedRow(null)
    }, 200)
    navigate('/cart') // Reset selected row after 1 second
  }

  return (
    <TableContainer component={Paper} sx={{ height: 500 }}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Details</TableCell>
            <TableCell align="left">Order Details</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.customerDetails}
              onClick={handleRowClick}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
                backgroundColor: selectedRow === row ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                transition: 'background-color 0.5s ease'
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'content',
                  '& > *': { marginRight: '8px' }
                }}
              >
                <Avatar sx={{ bgcolor: deepOrange[500] }} src={row.avatar}></Avatar>
                {row.customerDetails}
              </TableCell>
              <TableCell align="left">{row.order}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
