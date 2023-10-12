import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LabelInput } from "../components/LabelInput";
import { SubmitButton } from "../components/submitButton";

export function AdminLogin() {
	const { t } = useTranslation();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			window.location.href = "/AdminPage";
		}
	}, []);

	async function loginValidation() {
		const loginApi = "http://localhost:1234/api/login/user/validation";

		try {
			const response = await fetch(loginApi, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user: username, password: password }),
			});

			if (response.status === 200) {
				setError(null);

				localStorage.setItem("token", "your-token-value");
				window.location.href = "/AdminPage";
			} else {
				let errorMessage = await response.text();
				setError(errorMessage || "Usuario o contraseña incorrectos");
				if (response.body) {
					errorMessage = await response.text();
				}

				setError(errorMessage);
			}
		} catch (error) {
			setError("Usuario o contraseña incorrectos");
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		await loginValidation();
	};

	return (
		<section className="login-Container flex flex-col justify-center items-center bg-sky p-5 h-screen">
			<div className="bg-gray rounded-2xl p-5">
				<h2 className="text-2xl mb-5 font-bold text-center">
					{t("loginMessage")}
				</h2>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-3 justify-center items-center"
				>
					<LabelInput
						id="userInput"
						placeholder={t("username")}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						value={username}
					/>
					<LabelInput
						id="passwordInput"
						type="password"
						placeholder={t("password")}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						value={password}
					/>
					{error && <p className="text-red-500">{error}</p>}

					<SubmitButton />
				</form>
			</div>
		</section>
	);
}
