import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import StarIcon from '@mui/icons-material/Star';
import Badge from '@mui/material/Badge';
import { TranslationContext } from '../data';
import { TranslationStatus, TranslationProject } from './grid/components/constants';

const TranslationProjectNames = {
  [TranslationProject.XPAY]: 'Xpay',
  [TranslationProject.ADS]: 'Ads',
};

export const MainListItems = ({isDrawerOpen}) => {
  const [open, setOpen] = React.useState(true);
  const { rows, project, setProject }= React.useContext(TranslationContext);
  const rowsWithStatusFilter = React.useMemo(() => rows?.filter(r => r.status === TranslationStatus.UNKNOEN), [rows]);

  const handleClick = () => {
    setOpen(!open);
  };
  const isSecondItemOpen = isDrawerOpen && open;
  return (
  <React.Fragment>
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
      {isSecondItemOpen ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={isSecondItemOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {
          Object.keys(TranslationProject).map(key => {
            const translationProject = TranslationProject[key];
            return (
            <ListItemButton sx={{ pl: 4 }} onClick={() => setProject(translationProject)} key={translationProject}>
              <ListItemIcon>
                <StarIcon color='warning'/>
              </ListItemIcon>
              {
                project === translationProject ?
                <Badge color="error" badgeContent={rowsWithStatusFilter.length}>
                  <ListItemText primary={TranslationProjectNames[translationProject]} sx={{width:"70px"}}/>
                </Badge> :
                <ListItemText primary={TranslationProjectNames[translationProject]} sx={{width:"70px"}}/>
              }
            </ListItemButton>);
          })
        }
      </List>
    </Collapse>

    <ListItemButton>
      <ListItemIcon>
        <ManageSearchIcon />
      </ListItemIcon>
      <ListItemText primary="History" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Project" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Notification" />
    </ListItemButton>
  </React.Fragment>
);
  };

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);