import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import {Link, useLocation} from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
    const location = useLocation();
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            anchor="left"
        >
            <Toolbar />
            <List>
                <ListItem
                    button
                    component={Link}
                    to="/adminUser"
                    selected={location.pathname === '/adminUser'}
                >
                    <ListItemText primary="Users" />
                </ListItem>
                {/*<ListItem*/}
                {/*    button*/}
                {/*    component={Link}*/}
                {/*    to="/login"*/}
                {/*    selected={location.pathname === '/login'}*/}
                {/*>*/}
                {/*    <ListItemText primary="Login" />*/}
                {/*</ListItem>*/}
                {/* Add more ListItem elements for other functionalities */}
            </List>
        </Drawer>
    );
};

export default Sidebar;
