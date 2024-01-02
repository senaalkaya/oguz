import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Form from './Form';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // ... stil tanımlamaları aynı kalır ...
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // ... stil tanımlamaları aynı kalır ...
}));

function createData(name) {
  return { name };
}

export default function KategoriTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('API_URL')
      .then(response => {
        const newRows = response.data.map(item => createData(item.name));
        setRows(newRows);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  const CreateCategory = async () => {
    axios.post('')
      .then(res => {
        console.log(res, "post");
      })
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Kategori</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <button onClick={CreateCategory}>Kategori Oluştur</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <Form />
      </Table>
    </TableContainer>
  );
}
