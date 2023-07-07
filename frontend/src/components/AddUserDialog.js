import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import Grow from "@mui/material/Grow";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = {
  description: "",
  completed: "",
};

const FormDialogAddUser = props => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const handleClickOpen = () => {
    setErrors({});
    setUser(initialFormState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!user.description || user.description.trim() === "") {
      formIsValid = false;
      tempErrors["description"] = "Cannot be empty";
    }

    if (!user.AdminEmail || user.AdminEmail.trim() === "") {
      formIsValid = false;
      tempErrors["AdminEmail"] = "Cannot be empty";
    }

    let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexp.test(user.AdminEmail)) {
      formIsValid = false;
      tempErrors["AdminEmail"] = "Email is not valid";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = e => {
    const onSuccess = (msg) => {
      props.refresh()
      setOpen(false);
      if(msg=="Department created" || msg=="Sub-admin added" ||msg=="Student added")
      toast.success(msg);
      else
      toast.error(msg);
    };
    e.preventDefault();
    var name=JSON.parse(localStorage.getItem('setDueDepartment'));
    const newAdminEmail = user.AdminEmail;
    if (validate()) {
      if(props.for==="Department") {
        name= user.name;
        const superAdminEmail = user.AdminEmail;
        props.create({name,user,superAdminEmail},onSuccess,props.url);
      }
      else{

        props.create({name,user,newAdminEmail},onSuccess,props.url);
      }
    }
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        Add Circle
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ padding: "30px 30px 0px 30px" }}
        >
          {props.for==="Admin" && "Add User"}
          {props.for==="Super Admin" && "Add Admin"}
        </DialogTitle>

        <DialogContent style={{ padding: "30px 30px 10px 30px" }}>
          <br />
          <br />

          <TextField
            autoFocus
            name="name"
            label="Name"
            value={user.name}
            fullWidth
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />

          <br />
          <br />

          <TextField
            name="AdminEmail"
            label="Admin Email"
            value={user.AdminEmail}
            fullWidth
            onChange={handleInputChange}
            {...(errors.AdminEmail && { error: true, helperText: errors.AdminEmail })}
          />
        </DialogContent>

        <DialogActions style={{ padding: 30 }}>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogAddUser;
