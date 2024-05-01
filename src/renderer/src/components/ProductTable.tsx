import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Avatar, CircularProgress } from '@mui/material'

// import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FlagIcon from '@mui/icons-material/Flag'
import { useEffect, useState } from 'react'
interface ProductTableProps {
  data: {
    link: string
    lastPrize: number
    website: string
    logo: string
  }[]
  currentPrizes: object
  loading: boolean
}
export default function ProductTable({
  data,
  currentPrizes,
  loading
}: ProductTableProps): JSX.Element {
  const [prize, setPrize] = useState({})
  console.log(currentPrizes)
  useEffect(() => {
    setPrize(currentPrizes)
  }, [currentPrizes])
  return (
    <TableContainer component={Paper} sx={{ height: 500 }}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Previous Prize</TableCell>
            <TableCell align="left">Current Prize</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.link}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
                backgroundColor: 'inherit',
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
                <Avatar sx={{ bgcolor: 'white' }} src={row.logo}></Avatar>
                {row.website}
              </TableCell>

              <TableCell align="left">{row.lastPrize}</TableCell>
              <TableCell align="left">
                {prize[row.link] === null || prize[row.link] === undefined ? '-' : prize[row.link]}
              </TableCell>
              <TableCell align="left">
                {loading &&
                (currentPrizes[row.link] === undefined || currentPrizes[row.link] === null) ? ( // If loading is true and current prize is not available
                  <CircularProgress color="secondary" size={20} />
                ) : currentPrizes[row.link] ? ( // If current prize exists (truthy)
                  <CheckCircleOutlineIcon sx={{ color: 'green' }} />
                ) : (
                  // If current prize doesn't exist (falsy)
                  <FlagIcon sx={{ color: 'red' }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
