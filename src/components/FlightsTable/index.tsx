'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import SearchIcon from '@mui/icons-material/Search';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { FormControl, OutlinedInput, InputAdornment } from '@mui/material';

import './styles.css';
import flightsData from '../../_mock/flights.json';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left';
}

interface Data {
  id: string;
  time: string;
  destination: string;
  flight: string[];
  status: string;
  gate: string;
  link: string;
}

export default function FlightsTable() {
  const { flights } = flightsData;
  const sortedFlights = flights.sort((a, b) => {
    const dateA = new Date(a.time);
    const dateB = new Date(b.time);
    return dateA.getTime() - dateB.getTime();
  });

  const currentTime = new Date();
  const adjustedTime = new Date(currentTime.getTime() - 1000 * 60 * 30); // deduz 30 min do horário atual
  const adjustedHours = adjustedTime.getHours();
  const adjustedMinutes = adjustedTime.getMinutes();

  const nearByFlights = sortedFlights.filter((flight) => {
    const flightTime = new Date(flight.time);
    const flightHours = flightTime.getHours();
    const flightMinutes = flightTime.getMinutes();

    if (flightHours > adjustedHours) {
      return true;
    }

    if (flightHours === adjustedHours) {
      return flightMinutes >= adjustedMinutes;
    }

    return false;
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [flightSchedule, setFlightSchedule] = useState(nearByFlights);

  const columns: readonly Column[] = [
    { id: 'time', label: 'Hora', minWidth: 5 },
    { id: 'destination', label: 'Destino', minWidth: 20 },
    { id: 'flight', label: 'Voo', minWidth: 10 },
    { id: 'status', label: 'Status', minWidth: 10 },
    { id: 'gate', label: 'Portão', minWidth: 5 },
    { id: 'link', label: '', minWidth: 15 },
  ];

  const rows = flightSchedule.map((flight) =>
    createData(
      flight.id,
      flight.time,
      flight.destination,
      [flight.number, flight.airlineName, flight.airlineLogo],
      flight.status,
      flight.gate,
      flight.mapLink
    )
  );

  function createData(
    id: string,
    time: string,
    destination: string,
    flight: string[],
    status: string,
    gate: string,
    link: string
  ): Data {
    return { id, time, destination, flight, status, gate, link };
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (searchValue: string) => {
    const results = flightSchedule.filter((flight) =>
      flight.number.startsWith(String(searchValue))
    );
    setFlightSchedule(results);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.trim();

    if (searchValue === '') {
      setFlightSchedule(nearByFlights);
      return;
    }

    handleSearch(searchValue);
  };

  const formatTime = (time: string) => {
    const dateFromTime = new Date(time);
    const formatedHour = dateFromTime.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return formatedHour;
  };

  return (
    <div className="container-area">
      <FormControl variant="outlined" className="table-form-area">
        <OutlinedInput
          id="outlined-adornment-weight"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            'aria-label': 'Busca de voos pelo número',
          }}
          placeholder="Buscar voo pelo número. Ex: 2349"
          onChange={handleSearchInputChange}
          className="table-search-input"
        />
      </FormControl>

      <div className="table-area">
        <Paper sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className="table-head"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{formatTime(row.time)}</TableCell>
                    <TableCell>{row.destination}</TableCell>
                    <TableCell>
                      <div className="flight-info">
                        <span>{row.flight[0]}</span>
                        <Image src={row.flight[2]} alt={row.flight[1]} width={36} height={12} />
                      </div>
                    </TableCell>
                    <TableCell sx={{ color: row.status === 'Atrasado' ? 'var(--red900)' : '' }}>
                      {row.status}
                    </TableCell>
                    <TableCell>{row.gate}</TableCell>
                    <TableCell>
                      <Link href={row.link} passHref>
                        <Button
                          variant="contained"
                          className="table-button"
                          sx={{ textTransform: 'none' }}
                        >
                          Ver no mapa
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Voos por página"
          />
        </Paper>
      </div>
    </div>
  );
}
