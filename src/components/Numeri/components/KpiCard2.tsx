import { Paper } from "@mui/material";

type Props = {
  children: React.ReactNode;
};
const KpiCard2 = ({ children }: Props) => {
  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      {children}
    </Paper>
  );
};

export default KpiCard2;
