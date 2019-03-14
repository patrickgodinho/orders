import React, { Component } from "react";
import styled from "styled-components";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { format } from "date-fns";

export default ({ order, close }) => (
  <div>
    <DialogTitle id="form-dialog-title">Order #{order.id}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Order Id"
        fullWidth
        disabled
        value={order.id}
      />
      <TextField
        autoFocus
        margin="dense"
        label="Order Date"
        fullWidth
        disabled
        value={format(order.orderDate, "MM/DD/YYYY HH:mm:ss")}
      />
      <TextField
        autoFocus
        margin="dense"
        label="Company Name"
        fullWidth
        disabled
        value={order.companyName}
      />
      <TextField
        autoFocus
        margin="dense"
        label="Last Modified Date"
        fullWidth
        disabled
        value={format(order.lastModifiedDate, "MM/DD/YYYY HH:mm:ss")}
      />
      <TextField
        autoFocus
        margin="dense"
        label="Total"
        fullWidth
        disabled
        value={order.totalPrice}
      />
      <TextField
        autoFocus
        margin="dense"
        label="Status"
        fullWidth
        disabled
        value={order.status}
      />
      <TextField
        autoFocus
        margin="dense"
        label="Plan"
        fullWidth
        disabled
        value={order.plan}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="primary">
        Cancel
      </Button>
    </DialogActions>
  </div>
);
