import { AllInbox, Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import TopCard from "../../components/card";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AccessTime } from "@mui/icons-material";
import moment from "moment";
import DashboardServices from "../../services/dashboard.services";
import { Appointment } from "../../types/appointment";
import { Book } from "../../types/book";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import NumberFormat from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const NumberFormatCustom = React.forwardRef<NumberFormat, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  },
);

export default function DashboardComponent() {
  const [date, setDate] = useState(new Date()),
    [newBook, setNewBook] = useState({
      startAppointmentTime: new Date(),
      endAppointmentTime: new Date(),
      title: "",
      price: 0,
    }),
    [loading, setLoading] = useState(false),
    [bookLoading, setBookLoading] = useState(false),
    [appointmentLoading, setAppointmentLoading] = useState(false),
    [appointment, setAppointment] = useState<Array<Appointment>>([]),
    [book, setBook] = useState<Array<Book>>([]),
    dashboardServices = useMemo(() => new DashboardServices(), []);
  useEffect(() => {
    dashboardServices.getAppointment().then((res) => {
      console.log(res);
      if (res.statusCode === 200) {
        setAppointment(res.result);
        dashboardServices.getBook().then((res) => {
          setBook(res.result);
          setLoading(true);
        });
      }
    });
  }, [dashboardServices]);
  return loading ? (
    <div style={{ padding: 25 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <TopCard
            icon={
              <AllInbox style={{ fontSize: 60, color: "white", padding: 10 }} />
            }
            title={"Accpeted"}
            value={
              appointment.filter((res) => res.status === "accpeted").length + ""
            }
            color="#3498db"
          />{" "}
        </Grid>
        <Grid item xs={12} md={4}>
          <TopCard
            icon={
              <AllInbox style={{ fontSize: 60, color: "white", padding: 10 }} />
            }
            title={"Waiting"}
            value={
              appointment.filter((res) => res.status === "wating").length + ""
            }
            color="#f1c40f"
          />{" "}
        </Grid>
        <Grid item xs={12} md={4}>
          <TopCard
            icon={
              <AllInbox style={{ fontSize: 60, color: "white", padding: 10 }} />
            }
            title={"Rejacted"}
            value={
              appointment.filter((res) => res.status === "rejacted").length + ""
            }
            color="#e74c3c"
          />{" "}
        </Grid>

        <Grid item xs={12} md={3}>
          <Calendar
            onChange={(e: Date) => {
              setDate(e);
            }}
            value={date}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <div>
              <Typography fontSize="22pt">Add Appointment</Typography>
            </div>{" "}
            <TextField
              value={newBook.title}
              label="Book Title"
              name="title"
              style={{ marginBottom: 10 }}
              fullWidth
              onChange={(e) => {
                setNewBook((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
            <TextField
              fullWidth
              label="Book Price"
              value={newBook.price}
              style={{ marginBottom: 15 }}
              onChange={(e) => {
                setNewBook((prev) => ({
                  ...prev,
                  price: parseInt(e.target.value),
                }));
              }}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom as any,
              }}
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                label="Start Appointment "
                value={newBook.startAppointmentTime}
                onChange={(newValue) => {
                  console.log(newValue);
                  setNewBook((prev: any) => ({
                    ...prev,
                    startAppointmentTime: newValue,
                  }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <div style={{ marginTop: 15 }}></div>
              <MobileDateTimePicker
                label="End Appointment "
                value={newBook.endAppointmentTime}
                onChange={(newValue) => {
                  console.log(newValue);
                  setNewBook((prev: any) => ({
                    ...prev,
                    endAppointmentTime: newValue,
                  }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
              fullWidth
              variant="contained"
              style={{ marginTop: 10 }}
              disabled={
                newBook.price === 0 ||
                newBook.price.toString() === "NaN" ||
                newBook.title === ""
              }
              onClick={() => {
                setBookLoading(true);
                dashboardServices
                  .addBook({
                    endAppointmentTime: newBook.endAppointmentTime.getTime(),
                    startAppointmentTime:
                      newBook.startAppointmentTime.getTime(),
                    title: newBook.title,
                    price: newBook.price,
                  })
                  .then((res) => {
                    setNewBook({
                      title: "",
                      price: 0,
                      endAppointmentTime: newBook.endAppointmentTime,
                      startAppointmentTime: newBook.startAppointmentTime,
                    });
                    setBookLoading(false);
                    dashboardServices
                      .getBook()
                      .then((res) => setBook(res.result));
                  });
              }}
            >
              Add
            </Button>
            <CardContent>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <List>
                  {book
                    .filter(
                      (res) =>
                        moment(res.startAppointmentTime).format(
                          "dd-MMM-yyyy",
                        ) === moment(date.getTime()).format("dd-MMM-yyyy") &&
                        res.taken === false,
                    )
                    .map((res) => (
                      <ListItem disablePadding key={res._id}>
                        <Card>
                          <Typography variant="h4">{res.title}</Typography>
                          <Typography variant="body1">
                            Start Time:
                            {moment(res.endAppointmentTime).format("hh:mm a")} *
                            End Time:
                            {moment(res.endAppointmentTime).format("hh:mm a")}
                          </Typography>

                          <Button
                            variant="contained"
                            style={{ width: "100%" }}
                            onClick={(e) => {
                              setBookLoading(true);
                              dashboardServices
                                .deleteBook(res._id)
                                .then((res) => {
                                  setBookLoading(false);
                                  dashboardServices
                                    .getBook()
                                    .then((res) => setBook(res.result));
                                });
                            }}
                          >
                            <Delete />
                          </Button>
                        </Card>
                      </ListItem>
                    ))}{" "}
                </List>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  {bookLoading ? <CircularProgress /> : <></>}
                </div>
              </Box>
              <Divider />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <Typography fontSize="22pt">Waiting Appointment</Typography>

            <CardContent>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <List>
                  {appointment
                    .filter((res) => res.status === "wating")
                    .map((res) => (
                      <ListItem
                        disablePadding
                        key={res._id}
                        style={{ display: "block" }}
                      >
                        <Typography variant="h5">{res.title}</Typography>
                        <Typography>
                          Start Time:{" "}
                          {moment(res.startAppointmentTime).format("hh:mm a")} *
                          End Time:
                          {moment(res.endAppointmentTime).format("hh:mm a")}
                        </Typography>
                        <IconButton
                          onClick={(e) => {
                            setAppointmentLoading(true);
                            dashboardServices
                              .updateAppointment({
                                id: res.id,
                                _id: res._id,
                                status: "rejacted",
                              })
                              .then((res) => {
                                setAppointmentLoading(false);
                                dashboardServices
                                  .getAppointment()
                                  .then((res) => setAppointment(res.result));
                              });
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            setAppointmentLoading(true);
                            dashboardServices
                              .updateAppointment({
                                id: res.id,
                                _id: res._id,
                                status: "accpeted",
                              })
                              .then((res) => {
                                setBookLoading(true);
                                setAppointmentLoading(false);
                                dashboardServices
                                  .getAppointment()
                                  .then((res) => setAppointment(res.result));
                                dashboardServices.getBook().then((res) => {
                                  setBookLoading(false);
                                  setBook(res.result);
                                });
                              });
                          }}
                        >
                          <AccessTime />
                        </IconButton>
                        <Divider />
                      </ListItem>
                    ))}
                </List>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  {appointmentLoading ? <CircularProgress /> : <></>}
                </div>
              </Box>
              <Divider />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Container>
      <CircularProgress />
    </Container>
  );
}
