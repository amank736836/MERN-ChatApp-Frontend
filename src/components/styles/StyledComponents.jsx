import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

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
  padding: 1rem;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  display: inline-block;
  &:hover {
    transform: scale(1.05);
  }
`;
