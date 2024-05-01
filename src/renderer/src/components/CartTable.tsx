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

interface CartTableProps {
  data: {
    name: string
    image: string
    lowestPrize: number
    highestPrize: number
  }[]
}

export default function CardTable({ data }: CartTableProps): JSX.Element {
  const [selectedRow, setSelectedRow] = useState(null)
  const navigate = useNavigate()

  const handleRowClick = (row): void => {
    setSelectedRow(row)
    setTimeout(() => {
      setSelectedRow(null)
    }, 200)
    navigate('/product') // Reset selected row after 1 second
  }

  return (
    <TableContainer component={Paper} sx={{ height: 500 }}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Lowest Prize</TableCell>
            <TableCell align="left">highest Prize</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              onClick={() => handleRowClick(row)}
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
                <Avatar sx={{ bgcolor: deepOrange[500] }} src={row.image}>
                  img
                </Avatar>
                {row.name}
              </TableCell>
              <TableCell align="left">{row.lowestPrize}</TableCell>
              <TableCell align="left">{row.highestPrize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
