import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="bg-blue-950 py-6">
			<div className="container mx-auto flex justify-between">
				<span className="text-3xl text-amber-500 font-bold tracking-tight">
					<Link to="/">Air Force Booking</Link>
				</span>
				<span className="flex space-x-2">
					<Link to="/sign-in" className="flex items-center text-amber-500 px-3 font-bold hover:bg-gray-600 hover:text-white">
						Sign-In
					</Link>
					<Link to="/Register" className="flex items-center text-amber-500 px-3 font-bold hover:bg-gray-600  hover:text-white">
						Register
					</Link>
					<Link to="/Vendor" className="flex items-center text-amber-500 px-3 font-bold hover:bg-gray-600  hover:text-white">
						Vendor
					</Link>
				</span>
			</div>
		</div>
	)
};

export default Header;