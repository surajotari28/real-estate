import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../containers/Home";
import Listing from "../containers/Listing";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import ListingDetail from "../containers/ListingDetail";
import Buy from "../containers/Buy";
import NotFound from "../containers/NotFound";
import Brought from "../containers/Brought";

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/listing" component={Listing} />
                <Route exact path="/listing/:id" component={ListingDetail} />
                <Route exact path="/listing/:id/buy" component={Buy} />
                <Route exact path="/brought/:id/" component={Brought} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route component={NotFound} />
            </Switch>
        </>
    );
};

export default Routes;
