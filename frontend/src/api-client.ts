import { RegisterFormData } from "./pages/register";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
	const response = await fetch(`http://localhost:7000/api/users/register`, {
	  method: "POST",
	  credentials: "include",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(formData),
	});
  
	const responseBody = await response.json();
  
	if (!response.ok) {
	  throw new Error(responseBody.message);
	}
  };