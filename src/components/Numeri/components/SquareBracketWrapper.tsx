import { Box } from "@mui/material";
type Props = {
  children: React.ReactNode;
};

export default function SquareBracketWrapper({ children }: Props) {
  return <Box>[{children}]</Box>;
}
