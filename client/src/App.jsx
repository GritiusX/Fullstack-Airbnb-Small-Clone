import { Route, Routes } from "react-router";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import DefaultLayout from "./layouts/DefaultLayout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { FrontContextProvider } from "./context/FrontContext";
import AccountPage from "./pages/AccountPages/AccountPage";
import PlacesPage from "./pages/AccountPages/PlacesPage";
import PlacesFormPage from "./pages/AccountPages/PlacesFormPage";
import BookingsPage from "./pages/AccountPages/BookingsPage";
import DetailsPlacePage from "./pages/AccountPages/DetailsPlacePage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
	return (
		<FrontContextProvider>
			<Routes>
				<Route path="/" element={<DefaultLayout />}>
					<Route index element={<IndexPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/account" element={<AccountPage />} />
					<Route path="/account/bookings" element={<BookingsPage />} />
					<Route path="/account/places" element={<PlacesPage />} />
					<Route path="/account/places/new" element={<PlacesFormPage />} />
					<Route path="/account/places/:id" element={<PlacesFormPage />} />
					<Route path="/place/:id" element={<DetailsPlacePage />} />
				</Route>
			</Routes>
		</FrontContextProvider>
	);
}

export default App;
