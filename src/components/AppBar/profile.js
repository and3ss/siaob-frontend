import React, { useCallback, useState } from 'react';
import { IconButton, Badge, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import useAuth from '../../hooks/useAuth';

const Profile = ({username, img}) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const { signOut } = useAuth();

  const handleSignOut = useCallback( () => {
    signOut();
  }, [signOut]);

  return(
    <div className="notifications">
      <IconButton className="btnNotific" color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge badgeContent={0} color="secondary">
          <AccountCircle />
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)} >
        <MenuItem>Perfil</MenuItem>
        <MenuItem onClick={handleSignOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}

export default Profile;