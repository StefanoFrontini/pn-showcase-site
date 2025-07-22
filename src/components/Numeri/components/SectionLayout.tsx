import { Container, Stack, Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

type SectionLayoutProps = {
  title: string;
  children: React.ReactNode;
  text?: string;
};

const SectionLayout = ({ title, children, text }: SectionLayoutProps) => {
  return (
    <Container
      component="section"
      sx={{ py: 6, maxWidth: 1340, backgroundColor: "white" }}
      maxWidth={false}
    >
      <Typography
        component="h2"
        sx={{
          color: dashboardColors.get("primary"),
          fontSize: "2.375rem",
          fontWeight: 700,
          lineHeight: "3.125rem",
        }}
      >
        {title}
      </Typography>
      <Typography
        component="p"
        sx={{
          color: dashboardColors.get("primary"),
          fontSize: "1.125rem",
          fontWeight: 400,
          lineHeight: "1.5rem",
        }}
      >
        {text}
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "column" }}
        spacing={{ xs: 2, sm: 2, md: 4 }}
        sx={{ mt: 3 }}
      >
        {children}
      </Stack>
    </Container>
  );
};
export default SectionLayout;
