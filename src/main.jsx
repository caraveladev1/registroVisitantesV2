import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
	HashRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import "../i18n.js";
import { AdminLogin } from "./Pages/AdminLogin";
import { AdminPage } from "./Pages/AdminPage";
import App from "./Pages/App";
import { EditEmployee } from "./Pages/EditEmployee";
import { EditTransport } from "./Pages/EditTransport";
import { EditVisitor } from "./Pages/EditVisitor";
import { EmployeeForm } from "./Pages/EmployeeForm";
import { TransportForm } from "./Pages/TransportForm";
import { VisitorForm } from "./Pages/VisitorForm";
import { PrivateRoute } from "./components/PrivateRoute";
import { ExitForm } from "./Pages/ExitForm.jsx";
import ReactGA from "react-ga4";

import "./index.css";

ReactGA.initialize("G-01J5FZCB2Y");

const TrackPageView = () => {
	const location = useLocation();

	useEffect(() => {
		ReactGA.send({ hitType: "pageview", page: location.pathname });
	}, [location]);

	return null;
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<HashRouter basename="/">
		<TrackPageView />
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/EmployeeForm" element={<EmployeeForm />} />
			<Route path="/VisitorForm" element={<VisitorForm />} />
			<Route path="/TransportForm" element={<TransportForm />} />
			<Route path="/Login" element={<AdminLogin />} />
			<Route path="/Exit-format" element={<ExitForm />} />
			<Route element={<PrivateRoute />}>
				<Route path="/AdminPage" element={<AdminPage />} />
				<Route path="/edit/employee/:id" element={<EditEmployee />} />
				<Route path="/edit/transport/:id" element={<EditTransport />} />
				<Route path="/edit/visitor/:id" element={<EditVisitor />} />
			</Route>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	</HashRouter>,
);
