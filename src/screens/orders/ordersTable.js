import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";

import { format } from "date-fns";

import OrderTableActions from "./orderTableActions";
import OrderModal from "./orderModal";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  dateHeader: {
    cursor: "pointer"
  }
});

class OrdersTable extends Component {
  state = { page: 0, sortDirection: "desc", modal: false };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  sortByDate = () => {
    console.log(this.props);
    this.setState({
      sortDirection: this.state.sortDirection === "desc" ? "asc" : "desc"
    });
    this.props.get("", this.state.sortDirection);
  };

  selectOrder = order => {
    this.setState({ modal: true, selected: order });
  };

  closeModal = () => {
    console.log("tentando chamar o modal close");
    this.setState({ modal: false });
  };

  render() {
    const { classes, orders } = this.props;
    return (
      <Paper className={classes.root} tabIndex={-1}>
        <Dialog open={this.state.modal}>
          <OrderModal order={this.state.selected} close={this.closeModal} />
        </Dialog>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="right">
                <Tooltip title="Sort" placement={"bottom-end"} enterDelay={300}>
                  <TableSortLabel
                    active={true}
                    direction={this.state.sortDirection}
                    onClick={() => this.sortByDate()}
                  >
                    Order Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell align="right">Company Name</TableCell>
              <TableCell align="right">Last Modified Date</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">
                  {format(order.orderDate, "MM/DD/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell align="right">{order.companyName}</TableCell>
                <TableCell align="right">
                  {format(order.lastModifiedDate, "MM/DD/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell align="right">{order.totalPrice}</TableCell>
                <TableCell align="right">{order.plan}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <Fab size="small" onClick={() => this.selectOrder(order)}>
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10]}
                colSpan={3}
                count={50}
                rowsPerPage={10}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                ActionsComponent={OrderTableActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(OrdersTable);
