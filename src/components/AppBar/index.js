import React, { useState } from "react";
import { Link } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Grid, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import Profile from "./profile";

import './styles.css';
import Notifications from "./notifications";

const SidebarItem = ({ index, depthStep = 10, depth = 0, expanded, onClick: onClickProp, item, ...rest }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { label, type, items, to, icon } = item;


  function toggleCollapse() {
    setCollapsed(!collapsed);
  }

  function onClick(e) {
    if (Array.isArray(items)) {
      toggleCollapse();
    }
    if (onClickProp && type !== 'mainItem') {
      onClickProp(e, item);
    }
  }

  let expandIcon;

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon className={"sidebar-item-expand-arrow right color" }/>
    ) : (
      <ExpandMoreIcon className="sidebar-item-expand-arrow right color" />
    );
  }

  return (
    <>
      <ListItem
        key={index}
        button
        {...rest}
        component={to ? Link : null} to={to ? to : null}
        onClick={onClick} >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ paddingLeft: depth * depthStep }} >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={label} />
          {expandIcon}
        </Grid>
      </ListItem>

      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List component="div" disablePadding>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  <SidebarItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                    onClick={onClickProp} />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  );
}

const Sidebar = ({ items, depthStep, depth, expanded }) => {

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuBtn = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <AppBar position="fixed" className="bgColor">
        <Toolbar>
          <IconButton className="btnMenu" edge="start" onClick={handleMenuBtn} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Piloto
          </Typography>
          <div className="toolbarActions">
            <Notifications />
            <Profile />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        //variant="persistent"
        variant="temporary"
        anchor="left"
        open={showMenu}
        onClose={handleMenuBtn} >
        <div className="drawerHeader">
          <IconButton onClick={handleMenuBtn}>
            <ChevronLeftIcon className="color"/>
          </IconButton>
        </div>
        <List className="drawerList">
          {items.map((sidebarItem, index) => (
            <React.Fragment key={`${sidebarItem.name}${index}`}>
              {sidebarItem === "divider" ? (
                <Divider style={{ margin: "6px 0" }} />
              ) : (
                (!sidebarItem.enabled) ? '' : (
                  <SidebarItem
                    index={index}
                    depthStep={depthStep}
                    depth={depth}
                    expanded={expanded}
                    onClick={handleMenuBtn}
                    item={sidebarItem}
                  />
                )
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Toolbar />
    </div>
  );
}
export default Sidebar