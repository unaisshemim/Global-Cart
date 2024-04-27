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
  productDetails: string,
  highest: number,
  lowest: number,
  cartImage: string
): {
  productDetails: string
  highest: number
  lowest: number
  cartImage: string
} {
  return { productDetails, highest, lowest, cartImage }
}

const rows = [
  createData(
    'Crocs ',
    2500,
    3500,
    'https://www.crocs.in/media/catalog/product/2/0/206935_2zm_alt110.jpg?auto=webp&format=pjpg&width=964&height=800&fit=cover'
  )
]

export default function CardTable(): JSX.Element {
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
          {rows.map((row) => (
            <TableRow
              key={row.productDetails}
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
                <Avatar sx={{ bgcolor: deepOrange[500] }} src={row.cartImage}>
                  img
                </Avatar>
                {row.productDetails}
              </TableCell>
              <TableCell align="left">{row.lowest}</TableCell>
              <TableCell align="left">{row.highest}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
