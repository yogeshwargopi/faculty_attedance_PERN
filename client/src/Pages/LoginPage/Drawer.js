import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import home from "../../Assets/h.png";
import faculty from "../../Assets/f.png";
import hod from "../../Assets/ho.png";
import principal from "../../Assets/p.png";
import hr from "../../Assets/hrd.png";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const handlefa = () => {
    navigate("/login/faculty");
    setOpenDrawer(false);
  };
  const handleHod = () => {
    navigate("/login/hod");
    setOpenDrawer(false);
  };
  const handleprinc = () => {
    navigate("/login/principal");
    setOpenDrawer(false);
  };
  const handleHr = () => {
    navigate("/login/hr");
    setOpenDrawer(false);
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List
          style={{
            width: "150px",
          }}
        >
          <ListItemButton onClick={handleHome}>
            <img
              src={home}
              alt="hi"
              width={20}
              height={20}
              style={{ marginRight: "5px" }}
            />
            <ListItemText>Home</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handlefa}>
            <img
              src={faculty}
              alt="hi"
              width={20}
              height={20}
              style={{ marginRight: "5px" }}
            />
            <ListItemText>Faculty</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleHod}>
            <img
              src={hod}
              alt="hi"
              width={20}
              height={20}
              style={{ marginRight: "5px" }}
            />
            <ListItemText>Hod</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleprinc}>
            <img
              src={principal}
              alt="hi"
              width={20}
              height={20}
              style={{ marginRight: "5px" }}
            />
            <ListItemText>Principal</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleHr}>
            <img
              src={hr}
              alt="hi"
              width={20}
              height={20}
              style={{ marginRight: "5px" }}
            />
            <ListItemText>Hr team</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
