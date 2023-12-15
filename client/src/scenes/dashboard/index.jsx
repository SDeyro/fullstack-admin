import React from "react";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import StatBox from "components/StatBox";
import { useGetDashboardQuery } from "state/api";

const Dashboard = () => {
  const theme = useTheme();
  const { data } = useGetDashboardQuery();
  const isNotMediumScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem" pb="1.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />

        <Box>
          <Button
            startIcon={<DownloadOutlined />}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.secondary[300],
              },
            }}
          >
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNotMediumScreen ? undefined : "span 12",
          },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={data?.totalCustomers}
          increase="+14%"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          description="Since last month"
        />

        <StatBox
          title="Sales Today"
          value={data?.todayStat.totalSales}
          increase="+21%"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          description="Since last month"
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart isDashboard={true} view="sales" />
        </Box>

        <StatBox
          title="Monthly Sales"
          value={data?.thisMonthStats.totalSales}
          increase="+5%"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          description="Since last month"
        />

        <StatBox
          title="Yearly Sales"
          value={data?.yearlySalesTotal}
          increase="+43%"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          description="Since last month"
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          Sample
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>

          <BreakdownChart isDashboard={true} />

          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of the real states and information via category for
            revenue made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
