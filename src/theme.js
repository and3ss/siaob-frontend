import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/data-grid';
import teal from '@material-ui/core/colors/teal';
import { indigo } from '@material-ui/core/colors';

const theme = createMuiTheme(
  {
    palette: {
      primary: teal,
      secondary: indigo,
    }
  },
  ptBR
);

theme.overrides = {
  MuiCssBaseline: {
    '@global': {
      html: {
        WebkitFontSmoothing: 'auto',
      },
      body: {
        fontSize: '1rem',
      }
    },
  },
  MuiButton: {
    disableElevation: true
  }
}

export default theme;