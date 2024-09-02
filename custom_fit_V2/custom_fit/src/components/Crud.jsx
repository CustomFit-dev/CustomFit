import React, { useEffect, useState } from 'react';
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { fetchData } from './modules/Datos';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { flexRender } from '@tanstack/react-table';
import theme from './modules/Themes';

const Crud = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const data = await fetchData();
      console.log(data);
      setUserProfiles(data);
    };

    fetchUserProfiles();
  }, []);

  const Return = () => {
    navigate('/Home');
  };

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

const handleDeleteUser = async (iduser) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/delete-user/${iduser}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      // User deleted successfully
      setUserProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== iduser)
      );
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error al borrar el usuario:', error.response?.data || error.message);
  }
};


  const columns = [
    { accessorKey: 'nombres', header: 'Nombres' },
    { accessorKey: 'apellidos', header: 'Apellidos' },
    { accessorKey: 'correo_electronico', header: 'Correo' },
    {
      accessorKey: 'nombre_usuario',
      header: 'Nombre de usuario',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2">{row.original.nombre_usuario}</Typography>
          <IconButton
            color="error"
            onClick={() => handleDeleteUser(row.original.id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
    { accessorKey: 'rol.nombrerol', header: 'Rol' },
  ];

  const table = useMaterialReactTable({
    columns,
    data: userProfiles,
    enableRowSelection: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <IconButton
          color="error"
          onClick={() => handleDeleteUser(row.original.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [2, 5, 10],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
    localization: {
      ...MRT_Localization_ES,
      pagination: {
        ...MRT_Localization_ES.pagination,
        rowsPerPage: 'Filas por página',
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'white',
          backgroundColor: 'blue',
          '&.Mui-selected': {
            backgroundColor: 'red',
            color: 'white',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <section className='sec1c'>
        <IconButton onClick={Return}>
          <CloseIcon />
        </IconButton>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <Stack sx={{ m: '2rem 0' }}>
                <Typography variant="h4">Usuarios</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <MRT_GlobalFilterTextField table={table} />
                  <MRT_TablePagination table={table} />
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableCell align="center" variant="head" key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.Header ??
                                      header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableHead>
                    <TableBody>
                      {table.getRowModel().rows.map((row, rowIndex) => (
                        <TableRow key={row.id} selected={row.getIsSelected()}>
                          {row.getVisibleCells().map((cell, _columnIndex) => (
                            <TableCell align="center" variant="body" key={cell.id}>
                              <MRT_TableBodyCellValue
                                cell={cell}
                                table={table}
                                staticRowIndex={rowIndex}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
              </Stack>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Crud;
