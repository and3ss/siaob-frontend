import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import LoadingSpinner from '../../components/LoadingSpinner';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import './styles.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        DNA Soft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignIn = () => {

  const { signed, signIn, loading } = useAuth();
  
  const [username, setUsername] = useState(null);
  const [pass, setPass] = useState(null);

  const handleSignIn = (event) => {
    event.preventDefault();

    signIn(username, pass);
  }
  
  if (loading) {
    return (
      <div className='loading'>
        {/* <h1>SignIn Page</h1> */}
        <LoadingSpinner className="middleCenter"/>
      </div>
    )    
  }
  return (
      <Grid container component="main" className="root">

        { signed ? (
          <Redirect to='./Dashboard' />
          ) : (
            <>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <div className="image"></div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <form className="form" onSubmit={handleSignIn}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                autoFocus
                onChange = { e => setUsername(e.target.value) }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="pass"
                name="pass"
                label="Senha"
                autoComplete="current-password"
                onChange = { e => setPass(e.target.value) }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>
          </>
        )}
      </Grid>
  );
}
export default SignIn;