import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blue } from "@mui/material/colors";
import ResetPassword from "./ResetPasswordForm";
import { useNavigate } from "react-router-dom";
import { emailReset } from "../../../Store/Auth/Action";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertDialog from "./AlertDialog";

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
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

export default function SendEmailModal() {
  // const [openResetPassword, setopenResetPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openAlertDialog, setopenAlertDialog] = useState(false);
  const handleCloseAlertDialog = () => setopenAlertDialog(false);
  // const handleCloseResetPassword = () => setopenResetPassword(false);
  const handleEmail = async (values) => {
    try {
      const data = await dispatch(emailReset(values.email));
      if(data.status===200){
        setSuccessMessage(data.message)
      }
    } catch (error) {
      setError(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleEmail(values);
      setopenAlertDialog(true)
    },
  });
  return (
    //   <Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-3">
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              size="large"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={error?.NotCreate}
              helperText={error?.NotCreate}
            />
            <Grid className="mt-20" item xs={12}>
              <Button
                sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                Next
              </Button>
            </Grid>
            {/* {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} */}
          </div>
          {/* <ResetPassword open={openResetPassword} handleClose={handleCloseResetPassword} ></ResetPassword> */}
        </form>
        <AlertDialog open={openAlertDialog} handleClose={handleCloseAlertDialog} errorMessage={error} successMessage={successMessage}></AlertDialog>
      </Box>
  );
}
