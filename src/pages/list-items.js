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
import { useNavigate } from "react-router-dom";

const TranslationProjectNames = {
  [TranslationProject.ADS]: "Ads",
  [TranslationProject.CRYPTOSHARED]: "Crypto Shared",
  [TranslationProject.CRYPTOHUB]: "Crypto Hub",
  [TranslationProject.CRYPTODRAWER]: "Crypto Drawer"
};

const PorjectItem = ({
  project
}) => {
  const navigate = useNavigate();
  const { allProjectCounts, setProject } = React.useContext(TranslationContext);
  const translationProject = TranslationProject[project];
  const name = TranslationProjectNames[translationProject];

  return (
    <ListItemButton sx={{ pl: 4 }} onClick={() => {
      setProject(translationProject);
      navigate("/dashboard");
    }} key={translationProject}>
      <ListItemIcon>
        <StarIcon color='warning'/>
      </ListItemIcon>
      {
        <Badge color="error" badgeContent={allProjectCounts[translationProject]}>
          <ListItemText primary={name} sx={{ width: "70px" }}/>
        </Badge>
      }
    </ListItemButton>);
};
export const MainListItems = ({ isDrawerOpen }) => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
    navigate("/dashboard");
  };
  const isSecondItemOpen = isDrawerOpen && open;
  const navigate = useNavigate();

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
            Object.keys(TranslationProject).map(key => <PorjectItem project={key}/>)
          }
        </List>
      </Collapse>

      <ListItemButton onClick={() => navigate("/project")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Project" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/termlib")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Term library" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/settings")}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </React.Fragment>
  );
};
