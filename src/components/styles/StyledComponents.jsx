import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";

export const VisuallyHiddenInput = styled("input")({
  border: "0",
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const StyledLink = styled(LinkComponent)`
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  display: inline-block;
  &:hover {
    transform: scale(1.05);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: `${grayColor}`,
});

export const SearchField = styled("input")`
  padding: 1rem 2rem;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: ${grayColor};
  font-size: 1.1rem;
`;

export const CurveButton = styled("button")({
  borderRadius: "1.5rem",
  padding: "1rem 2rem",
  border: "none",
  outline: "none",
  cursor: "pointer",
  backgroundColor: matBlack,
  color: "white",
  fontSize: "1.1rem",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});
