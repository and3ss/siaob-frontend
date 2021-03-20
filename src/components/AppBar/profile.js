import React from 'react';
import { IconButton, Badge } from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';

const Profile = ({username, img}) => {
  return(
    <div className="notifications">
      <IconButton className="btnNotific" color="inherit" >
        <Badge badgeContent={0} color="secondary">
          <AccountCircle />
        </Badge>
      </IconButton>
    </div>
  );
}

export default Profile;