import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#ffffff',
    },
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        selectIcon: {
          color: '#ffffff',
        },
        input: {
          color: '#ffffff',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

const customTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(23,23,23)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgb(23,23,23)',
          color: '#ffffff',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&.Mui-selected': {
            backgroundColor: 'rgb(23,23,23)',
            color: '#ffffff',
          },
        },
      },
    },
  },
});

const theme = createTheme(baseTheme, customTheme);

export default theme;
