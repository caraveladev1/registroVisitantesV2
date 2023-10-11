import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../i18n.js";
import { AdminLogin } from "./Pages/AdminLogin";
import { AdminPage } from "./Pages/AdminPage.jsx";
import App from "./Pages/App";
import { EditEmployee } from "./Pages/EditEmployee";
import { EditTransport } from "./Pages/EditTransport";
import { EditVisitor } from "./Pages/EditVisitor";
import { EmployeeForm } from "./Pages/EmployeeForm";
import { TransportForm } from "./Pages/TransportForm";
import { VisitorForm } from "./Pages/VisitorForm";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/EmployeeForm" element={<EmployeeForm />} />
			<Route path="/VisitorForm" element={<VisitorForm />} />
			<Route path="/TransportForm" element={<TransportForm />} />
			<Route path="/Login" element={<AdminLogin />} />
			<Route path="/AdminPage" element={<AdminPage />} />
			<Route path="/edit/employee/:id" element={<EditEmployee />} />
			<Route path="/edit/transport/:id" element={<EditTransport />} />
			<Route path="/edit/visitor/:id" element={<EditVisitor />} />
		</Routes>
	</BrowserRouter>,
);
