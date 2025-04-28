import { Menu } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu } from "../../redux/reducers/misc";

const FileMenu = ({ anchorE1 }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);
  const closeFileMenu = () => {
    dispatch(setIsFileMenu(false));
  };

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={closeFileMenu}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, alias
        enim aut saepe sequi minima aliquid nihil necessitatibus consequuntur,
        nostrum iste! Amet non neque
      </div>
    </Menu>
  );
};

export default FileMenu;
