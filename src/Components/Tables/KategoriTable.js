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
    axios.get('https://localhost:7053/controller/GetAll')
      .then(response => {
        const newRows = response.data.map(item => createData(item.name));
        setRows(newRows);
        console.log(response.data,"hyfryhfrtyh");
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  const handleNewCategory = (newCategory) => {
    setRows(prevRows => [...prevRows, createData(newCategory)]);
  };

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
            </StyledTableRow>
          ))}
        </TableBody>
        <Form onNewCategory={handleNewCategory}/>
      </Table>
    </TableContainer>
  );
}
