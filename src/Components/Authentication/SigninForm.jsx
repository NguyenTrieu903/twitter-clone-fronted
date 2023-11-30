import React from "react";
import { getFormLabelUtilityClasses, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Store/Auth/Action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});
const SigninForm = () => {
    const dispath=useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
        dispath(loginUser(values))
      console.log("form value ", values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
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
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid className="mt-20" item xs={12}>
          <Button
            sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            signin
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;
