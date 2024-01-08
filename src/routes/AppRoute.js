import {
    BrowserRouter as Router, Switch,
    Route, Link, BrowserRouter
} from "react-router-dom";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import User from "../Components/User/User";
import PrivateRoute from "./PrivateRoute";

const AppRoute = (props) => {
    console.log('props', props);
    const Project = () => {
        return (
            <span>project</span>
        )
    }
    return (
        <>
            <Switch>
                <PrivateRoute path="/user" component={User} />
                <PrivateRoute path="/project" component={Project} />


                <Route exact path="/" component="home">
                    home
                </Route>
                <Route path="/login" component={Login} >
                </Route>

                {/* <Route path="*" component="not found">
                </Route> */}
                <Route path="/register" component={Register}>
                </Route>
            </Switch>

        </>

    )
}

export default AppRoute