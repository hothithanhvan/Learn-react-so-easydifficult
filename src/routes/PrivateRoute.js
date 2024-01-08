import { useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import { useHistory } from "react-router-dom"

const PrivateRoute = (props) => {
    console.log(props);
const history = useHistory()
    useEffect(() => {
        let session = sessionStorage.getItem('account')
        if (!session) {
            history.push("/login")
        }
    },[])
    return (
        <>
        <Switch>
            <Route path={props.path} component={props.component} />
        </Switch>
        </>
    )
}

export default PrivateRoute