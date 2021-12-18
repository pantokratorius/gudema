import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes } from "../routes";
import * as authActions from './../actions/auth'


const AppRouter = props => {


    
  useEffect(() => {
    props.autoLogin()
  }, [])
    
    return (
        <Switch>
            {authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={'/'} />
        </Switch>
    )
}




const mapStateToProps = state => ({
    formIsOpen: state.header.formIsOpen,
    isAuth:  !!state.auth.authUserName
  });
    
    const mapDispatchToProps = dispatch => ({
      ...bindActionCreators(authActions, dispatch),
    });
    
    export default connect (
      mapStateToProps,
      mapDispatchToProps,
    )(AppRouter);