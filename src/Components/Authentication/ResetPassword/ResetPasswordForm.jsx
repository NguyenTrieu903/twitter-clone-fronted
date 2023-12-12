import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { blue } from "@mui/material/colors";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../Store/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const formik = useFormik({
    initialValues: {
      // oldPassword: "",
      newPassword: "",
      tokenValidate:""  
    },
    onSubmit: (values) => {
      handleEmail(values);
    },
  });
  
  useEffect(()=>{
    formik.setFieldValue("tokenValidate", token)
  },[])
  
  const handleEmail = async (values) => {
    try{
      await dispatch((resetPassword(values)));
      // setRedirect(true);
      window.location.href = '/signin';
      // navigate("/signin");
    } catch(error){
      setError(error)
    }
  };
  
  return (
    <Box sx={style}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label="oldPassword"
              name="oldPassword"
              variant="outlined"
              size="large"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.oldPassword}
              helperText={formik.touched.oldPassword}
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="newPassword"
              name="newPassword"
              variant="outlined"
              size="large"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={error?.Invalid}
              helperText={error?.Invalid}
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
            Reset
          </Button>
        </Grid>
        </Grid>
      </form>
    </Box>
  );
}
