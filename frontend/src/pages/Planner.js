import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  MonthView,
  WeekView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = "2018-11-01";
const schedulerData = [
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:45",
    title: "Meeting",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
  },
];

function Planner() {
  return (
    <Container>
      <Paper>
        <Scheduler data={schedulerData}>
          <ViewState defaultCurrentDate={currentDate} />
          <WeekView startDayHour={8} endDayHour={17} excludedDays={[0, 6]} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
        </Scheduler>
      </Paper>
    </Container>
  );
}

export default Planner;
