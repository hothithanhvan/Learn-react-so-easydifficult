// Import React 
import React, { useEffect, useState } from "react";
import Nav from "./Components/Navigation/Nav";

// Import Bootstrap 
// import { Nav, Navbar, Container, Row, Col } 
// 		from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Custom CSS 
import "./App.scss";

// Import from react-router-dom 
import {
	BrowserRouter, Switch,
	Route, Link
} from "react-router-dom";

// // Import other React Component 
// import CreateStudent from
// 	"./Components/create-student.component";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import User from "./Components/User/User";

import AppRoute from "./routes/AppRoute";
import _ from "lodash";
// import EditStudent from 
// 	"./Components/edit-student.component"; 
// import StudentList from 
// 	"./Components/student-list.component"; 

// App Component 
const App = () => {


	const [account, setAccount] = useState();
	useEffect(() => {
		let session = sessionStorage.getItem('account')
		if (session) {
			setAccount(JSON.parse(session))
		}
	}, [])
	return (
		<>
			<BrowserRouter>
				<div className="app-header">
					<Nav />
				</div>
				<div className="app-container">
					{/* {account && !_.isEmpty(account) && account.isAuthenticated 
				&& <Nav /> } */}
					<AppRoute />
				</div>
				<ToastContainer
					position="bottom-left"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>

			</BrowserRouter>

		</>



		// <Router> 
		// <div className="App"> 
		// 	<header className="App-header"> 
		// 	<Navbar bg="dark" variant="dark"> 
		// 		<Container> 
		// 		<Navbar.Brand> 
		// 			<Link to={"/create-student"} 
		// 			className="nav-link"> 
		// 			React MERN Stack App 
		// 			</Link> 
		// 		</Navbar.Brand> 

		// 		<Nav className="justify-content-end"> 
		// 			<Nav> 
		// 			<Link to={"/create-student"} 
		// 				className="nav-link"> 
		// 				Create Student 
		// 			</Link> 
		// 			</Nav> 

		// 			<Nav> 
		// 			<Link to={"/student-list"} 
		// 				className="nav-link"> 
		// 				Student List 
		// 			</Link> 
		// 			</Nav> 
		// 		</Nav> 
		// 		</Container> 
		// 	</Navbar> 
		// 	</header> 

		// 	<Container> 
		// 	<Row> 
		// 		<Col md={12}> 
		// 		<div className="wrapper"> 
		// 			<Routes> 
		// 			<Route exact path="/"
		// 				element={<CreateStudent />} /> 
		// 			<Route path="/create-student"
		// 				element={<CreateStudent />} /> 
		// 			<Route path="/edit-student/:id"
		// 				element={<EditStudent />} /> 
		// 			<Route path="/student-list"
		// 				element={<StudentList />} /> 
		// 			</Routes> 
		// 		</div> 
		// 		</Col> 
		// 	</Row> 
		// 	</Container> 
		// </div> 
		// </Router> 
	);
};

export default App;
