import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getFormLabelUtilityClasses,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { Avatar, Button, Select } from "@mui/material";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/Auth/Action";
import { useNavigate } from 'react-router-dom';



const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
const validationSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Email is Required"),
  // password: Yup.string().email("Invalid email").required("Email is Required"),
});

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate();
  const [openAuthModel, setOpenAuthModal]=useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (registerData) => {
    try {
       await dispatch(registerUser(registerData));
       navigate("/signin")
      setOpenAuthModal(true);
    } catch (error) {
      setError(error)
    }
    
  };
  
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      birthDate: {
        day: "",
        month: "",
        year: "",
      },
      confirmPassword:""
    },
    validationSchema,
    onSubmit: async (values) => {
      const { day, month, year } = values.birthDate;
      const birthDate = `${year}-${month}-${day}`;
      values.birthDate = birthDate;
      await handleRegister(values);
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("birthDate", {
      ...formik.values.birthDate,
      [name]: event.target.value,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="username"
            variant="outlined"
            size="large"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid> 

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={error?.email || error?.isExistsEmail}
            helperText={error?.email || error?.isExistsEmail}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            size="large"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={error?.password}
            helperText={error?.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="confirmPassword"
            name="confirmPassword"
            type="password"
            variant="outlined"
            size="large"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={error?.confirmPassword}
            helperText={error?.confirmPassword}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Date</InputLabel>
          <Select name="day" 
          onChange={handleDateChange("day")}
          onBlur={formik.handleBlur}
          value={formik.values.birthDate.day || days[0]}>
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Month</InputLabel>
          <Select name="month" 
          onChange={handleDateChange("month")}
          onBlur={formik.handleBlur}
          value={formik.values.birthDate.month || months[0].value}>
            {months.map((month) => (
              <MenuItem key={month.label} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Year</InputLabel>
          <Select name="year" 
          onChange={handleDateChange("year")}
          onBlur={formik.handleBlur}
          value={formik.values.birthDate.year || years[0]}>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid className="mt-20" item xs={12}>
          <Button
            sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            signup
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
