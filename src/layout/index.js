import React from 'react';
import useAuth from '../hooks/useAuth';

import AppBar from '../components/AppBar';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ViewListIcon from '@material-ui/icons/ViewList';
import LanguageIcon from '@material-ui/icons/Language';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import './styles.css';


const Layout = ({ children }) => {

  const { signed, user } = useAuth();
  
  var enabled = true ;
  
  const items = [
    "divider",
    { label: "Dashboard", enabled: enabled, type: "item", icon: <InsertChartIcon className="color"/>, to: './Dashboard' },
    { label: "Obras", enabled: enabled, type: "item", icon: <ViewListIcon className="color"/>, to: './Obras' },
    {
      label: "WebServices",
      type: "mainItem", 
      enabled: enabled, 
      icon: <LanguageIcon className="color" />,
      items: [
        { label: "Gestão", type: "subItem", icon: <SettingsApplicationsIcon className="color" />, to: './WebService' }
      ]
    },
    {
      label: "Gestão",
      type: "mainItem", 
      enabled: enabled, 
      icon: <SettingsIcon className="color" />,
      items: [
        { label: "Usuários", type: "subItem", icon: <PeopleAltIcon className="color" />, to: './Users' }
      ]
    }
  ];

  return (
    <React.Fragment>
      { signed ? (
        <AppBar items={items} />
      ) : (
        <>
        </>
      )}

      <main>
        { children }
      </main>
    </React.Fragment>
  )
}

export default Layout;