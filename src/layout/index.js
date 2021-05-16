import React from 'react';
import useAuth from '../hooks/useAuth';

import AppBar from '../components/AppBar';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ViewListIcon from '@material-ui/icons/ViewList';
import LanguageIcon from '@material-ui/icons/Language';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import './styles.css';


const Layout = ({ children }) => {

  const { signed, user } = useAuth();

  var enabled = true ;

  const items = [
    "divider",
    { label: "Dashboard", enabled: enabled, type: "item", icon: <InsertChartIcon color={'primary'}/>, to: './Dashboard' },
    {
      label: "Obras",
      type: "mainItem", 
      enabled: enabled, 
      icon: <ViewListIcon color={'primary'} />,
      items: [
        { label: "Listagem", type: "subItem", icon: <PlaylistAddCheckIcon color={'primary'} />, to: './Obras' },
        { label: "Cadastro", type: "subItem", icon: <PlaylistAddIcon color={'primary'} />, to: './CadastroObra' },
      ]
    },
    {
      label: "Gestão",
      type: "mainItem", 
      enabled: enabled, 
      icon: <SettingsIcon color={'primary'} />,
      items: [
        { label: "Usuários", type: "subItem", icon: <PeopleAltIcon color={'primary'} />, to: './Users' },
        // { label: "Etapas", type: "subItem", icon: <FormatListNumberedIcon color={'primary'} />, to: './Steps' },
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