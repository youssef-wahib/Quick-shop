import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
});
//background:'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
export default theme;