import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, Experimental_CssVarsProvider, experimental_extendTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PersonIcon from '@mui/icons-material/Person';
import LockClockIcon from '@mui/icons-material/LockClock';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LockIcon from '@mui/icons-material/Lock';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../img/logocustomfit.png';


const NAVIGATION = [
  {
    segment: 'Datos personales',
    title: 'Datos personales',
    icon: <PersonIcon />,
  },
  {
    segment: 'Control de actividad',
    title: 'Control de actividad',
    icon: <LockClockIcon />,
  },
  {
    segment: 'Historial de compras',
    title: 'Historial de compras',
    icon: <ShoppingBagIcon />,
  },
  {
    segment: 'Seguiridad',
    title: 'Seguiridad',
    icon: <LockIcon />,
  },
  {
    segment: 'Seguiridad',
    title: 'Mis pedidos',
    icon: <LocalShippingIcon />,
  },
  {
    segment: 'Pagos',
    title: 'Pagos',
    icon: <PaymentIcon />,
  },
  {
    segment: 'Salir',
    title: 'Salir',
    icon: <LogoutIcon />,
  },
];



function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Profile(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <Experimental_CssVarsProvider>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src={Logo} alt="MUI logo" />,
          title: 'CustomFit',
        }}
        router={router}
        
        window={demoWindow}
      >
        <DashboardLayout>
          <DemoPageContent pathname={pathname} />
        </DashboardLayout>
      </AppProvider>
    </Experimental_CssVarsProvider>
  );
}

Profile.propTypes = {
  window: PropTypes.func,
};

export default Profile;
