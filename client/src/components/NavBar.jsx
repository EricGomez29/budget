import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import './styles.css'

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed">
            <ToolBar className="navBar">
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{minWidth: "0px"}}>
                        <MenuIcon />
                    </Button>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <Link to='/home' style={{textDecoration: "none", color: "black"}}>
                            <MenuItem onClick={handleClose}>Inicio</MenuItem>
                        </Link>
                        <Link to='/new-operation' style={{textDecoration: "none", color: "black"}}>
                            <MenuItem onClick={handleClose}>Nueva Operacion</MenuItem>
                        </Link>
                        <Link to='/movements' style={{textDecoration: "none", color: "black"}}>
                            <MenuItem onClick={handleClose}>Todos los movimientos</MenuItem>
                        </Link>
                    </Menu>
                </div>
                <Typography variant="h6" color="inherit">
                    BUDGET
                </Typography>

                <AccountCircle />
            </ToolBar>
        </AppBar>
    )
}