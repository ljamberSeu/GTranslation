import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { FilterRow } from './filter-row';
import { Filter } from '../../components/api/api-list';
import { GridContext } from '../../../data';

export default function FilterMenu({
  anchorEl, setAnchorEl
}) {
  const open = !!anchorEl;
  const {setFilters: setFiltersForAPI} = React.useContext(GridContext);
  const [filters, setFilters] = React.useState([new Filter()]);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        setFiltersForAPI(filters);
        setAnchorEl(null);
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      sx={{minWidth: '500px'}}
    >
      {filters?.map?.((f, i) => (
        <MenuItem item xs={12} key={i}>
          <FilterRow
            filter={f}
            onChange={(newF) => {
              const newFilters = [...filters];
              newFilters[i] = newF;
              setFilters(newFilters);
            }}
            onDelete={() => {
              const newFilters = [...filters];
              newFilters.splice(i, 1);
              setFilters(newFilters);
            }}
          />
        </MenuItem>
      ))}
      <div style={{margin: '20px'}}>
        <Tooltip title="Add new filter">
          <Button onClick={() => setFilters(s => [...(s || []), new Filter()])} variant='contained' color='inherit' >
            <AddIcon color='primary' />
            And
          </Button>
        </Tooltip>
        <Tooltip title="Apply filters" sx={{marginInlineStart: '20px'}}>
          <Button
            onClick={() => { 
              setFiltersForAPI(filters);
              setAnchorEl(null);
            }}
            variant='contained'
            color='primary'
          >
            Apply filters
          </Button>
        </Tooltip>
      </div>
    </Menu>
  );
}