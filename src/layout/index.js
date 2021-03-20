import React from 'react';
import useAuth from '../hooks/useAuth';

import AppBar from '../components/AppBar';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ViewListIcon from '@material-ui/icons/ViewList';
import LanguageIcon from '@material-ui/icons/Language';
import DescriptionIcon from '@material-ui/icons/Description';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import './styles.css';


const Layout = ({ children }) => {

  const { signed, user } = useAuth();

  var enabled = (user.nivel >= 2) ? true : false ;
  
  const items = [
    "divider",
    { label: "Dashboard", enabled: enabled, type: "item", icon: <InsertChartIcon className="color"/>, to: './dashboard' },
    { label: "Relatorio", enabled: enabled, type: "item", icon: <ViewListIcon className="color"/>, to: './Relatorio' },
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
    <div className='layout'>
      <div>
        { signed ? (
          <AppBar items={items} />
        ) : (
          <>
          </>
        )}
      </div>

      <main>
      
        { children }
      
      </main>
    </div>
  )
}

export default Layout;