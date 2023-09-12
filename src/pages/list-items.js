import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import StarIcon from "@mui/icons-material/Star";
import Badge from "@mui/material/Badge";
import { TranslationContext } from "../data";
import { TranslationProject } from "../dashboard/grid/components/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { Paths } from "../constants";

const TranslationProjectNames = {
  [TranslationProject.ADS]: "Ads",
  [TranslationProject.CRYPTOSHARED]: "Crypto Shared",
  [TranslationProject.CRYPTOHUB]: "Crypto Hub",
  [TranslationProject.CRYPTODRAWER]: "Crypto Drawer"
};

const ButtonName = {
  Project: "Project",
  Term: "Term library",
  Settings: "Settings"
};

const ButtonIcons = {
  [ButtonName.Project]: PeopleIcon,
  [ButtonName.Term]: BarChartIcon,
  [ButtonName.Settings]: SettingsIcon
};

const PorjectItem = ({
  project
}) => {
  const navigate = useNavigate();
  const { allProjectCounts, setProject, project: currentProject } = React.useContext(TranslationContext);
  const translationProject = TranslationProject[project];
  const name = TranslationProjectNames[translationProject];
  const location = useLocation();

  return (
    <ListItemButton
      sx={{ pl: 4 }}
      onClick={() => {
        setProject(translationProject);
        navigate(Paths.Dashboard);
      }}
      key={translationProject}
      selected={currentProject === translationProject &&
        (location.pathname === Paths.Dashboard || location.pathname === Paths.Index)}
    >
      <ListItemIcon>
        <StarIcon color='warning'/>
      </ListItemIcon>
      {
        <Badge color="error" badgeContent={allProjectCounts[translationProject]}>
          <ListItemText primary={name} sx={{ width: "70px" }} />
        </Badge>
      }
    </ListItemButton>);
};

const MainItem = ({
  primary,
  url
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = React.useCallback(() => {
    navigate(url);
  }, [primary, url, navigate]);
  const Icon = ButtonIcons[primary];

  return (
    <ListItemButton onClick={onClick} selected={location.pathname === url}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItemButton>);
};

export const MainListItems = ({ isDrawerOpen }) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
    navigate(Paths.Dashboard);
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
            Object.keys(TranslationProject).map(key =>
              <PorjectItem project={key} />)
          }
        </List>
      </Collapse>
      <MainItem
        primary={ButtonName.Project}
        url={Paths.Project} />
      <MainItem
        primary={ButtonName.Term}
        url={Paths.Term} />
      <MainItem
        primary={ButtonName.Settings}
        url={Paths.Settings} />
    </React.Fragment>
  );
};
