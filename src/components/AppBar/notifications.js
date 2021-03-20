import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';

const Notifications = ({username, img}) => {

  const [anchorEl, setAnchorEl] = useState(null);

  return(
    <div className="notifications">
      <IconButton className="btnNotific" color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Badge badgeContent={0} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)} >
        <MenuItem onClick={() => setAnchorEl(null)}>Não há notificações</MenuItem>
      </Menu>
    </div>
  );
}

export default Notifications;