import { Box, Stack, Typography } from "@mui/material";
import { dashboardColors } from "../shared/colors";

type SectionLayoutProps = {
  title: string;
  children: React.ReactNode;
  text?: string;
};

const SectionLayout = ({ title, children, text }: SectionLayoutProps) => {
  return (
    <Box component="section" marginBottom={12}>
      <Box marginBottom={6}>
        <Typography
          component="h2"
          sx={{
            color: dashboardColors.get("primary"),
            fontSize: "2.375rem",
            fontWeight: 700,
            lineHeight: "3.125rem",
            mb: 1,
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
      </Box>

      <Stack
        direction={{ xs: "column", sm: "column" }}
        spacing={{ xs: 2, sm: 2, md: 4 }}
        sx={{ mt: 3 }}
      >
        {children}
      </Stack>
    </Box>
  );
};
export default SectionLayout;
