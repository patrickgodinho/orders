import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import { getList } from "../../redux/actions";
import OrdersTable from "./ordersTable";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class Orders extends Component {
  state = {
    input: ""
  };

  onChange = event => {
    const filter = event.target.value;
    if (filter.length > 2) {
      setTimeout(this.props.get(event.target.value), 1000);
    } else if (filter.length === 0) {
      this.props.get();
    }
  };

  componentDidMount() {
    this.props.get();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Orders
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={this.onChange}
              />
            </div>
          </Toolbar>
        </AppBar>

        {this.props.orderList ? (
          <OrdersTable orders={this.props.orderList} get={this.props.get} />
        ) : (
          0
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderList: state.ordersReducer.orderList
});

const mapDispatchToProps = dispatch => {
  return {
    get: (companyName, sort) => {
      dispatch(getList(1, companyName, sort));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Orders));
