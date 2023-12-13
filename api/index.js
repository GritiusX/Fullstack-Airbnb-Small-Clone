const express = require("express"); //always use nodemon index.js - easier way
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "sdfjk453089sdvnm78978ynd680f";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", function (req, res) {
	res.json("test ok");
});

app.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const userDoc = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptSalt),
		});

		res.json(userDoc);
	} catch (err) {
		res.status(422).json(err);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const userDoc = await User.findOne({ email });
	if (userDoc) {
		const passOk = bcrypt.compareSync(password, userDoc.password);

		if (passOk) {
			jwt.sign(
				{
					email: userDoc.email,
					id: userDoc._id,
				},
				jwtSecret,
				{},
				(err, token) => {
					if (err) throw err;
					res.cookie("token", token).json(userDoc);
				}
			);
		} else {
			res.status(422).json("WRONG PASS");
		}
	} else {
		res.json("user NOT found");
	}
});

app.post("/logout", (req, res) => {
	res.cookie("token", "").json(true);
});

app.get("/profile", (req, res) => {
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err;
			const { email, name, _id } = await User.findById(userData.id);
			res.json({ email, name, _id });
		});
	} else {
		res.json(null);
	}
});

app.post("/upload-by-link", async (req, res) => {
	const { link } = req.body;
	const newName = "photo" + Date.now() + ".jpg";

	await imageDownloader
		.image({
			url: link,
			dest: __dirname + "/uploads/" + newName,
		})
		.catch((err) => console.error(err));
	res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
	const uploadedFiles = [];
	for (let i = 0; i < req.files.length; i++) {
		const { path, originalname } = req.files[i];
		const urlParts = originalname.split(".");
		const ext = urlParts[urlParts.length - 1];
		const newPath = path + "." + ext;
		fs.renameSync(path, newPath);
		uploadedFiles.push(newPath.replace("uploads\\", ""));
	}
	res.json(uploadedFiles);
});

app.get("/user-only-places", (req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;

		const { id } = userData;

		res.json(await Place.find({ owner: id }));
	});
});

app.get("/user-only-places/:id", async (req, res) => {
	const { id } = req.params;

	res.json(await Place.findById(id));
});

app.post("/user-only-places", async (req, res) => {
	const { token } = req.cookies;
	const {
		title,
		address,
		price,
		photos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
	} = req.body;

	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) {
			throw err;
		}

		const placeDoc = await Place.create({
			owner: userData.id,
			title,
			price,
			address,
			photos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
		});

		res.status(200).json(placeDoc);
	});
});

app.put("/user-only-places", async (req, res) => {
	const { token } = req.cookies;
	const {
		id,
		title,
		address,
		price,
		photos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
	} = req.body;

	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		const placeDoc = await Place.findById(id);

		if (userData.id === placeDoc.owner.toString()) {
			placeDoc.set({
				title,
				address,
				price,
				photos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
			});
			await placeDoc.save();
			res.status(202).json(placeDoc);
		}
	});
});

app.get("/all-places", async (req, res) => {
	res.json(await Place.find());
});

app.get("/place-by-id/:id", async (req, res) => {
	const { id } = req.params;
	const selectedPlaceById = await Place.findById(id);
	res.status(200).json(selectedPlaceById);
});

app.post("/bookings", async (req, res) => {
	const { token } = req.cookies;
	const { place, checkIn, checkOut, guests, name, phone, price } = req.body;
	const userData = jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) {
			return err;
		}
		return userData;
	});
	console.log(userData);
	await Booking.create({
		place,
		checkIn,
		checkOut,
		guests,
		name,
		phone,
		price,
	});
	console.log(place, checkIn, checkOut, guests, name, phone, price);
	res.json("Booking successfully created");
});

app.get("/bookings", async (req, res) => {
	const { token } = req.cookies;

	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		try {
			const bookingsDoc = await Booking.find({}).populate("place");

			res.status(202).json(bookingsDoc);
		} catch (err) {
			res
				.status(500)
				.json({ error: "An error occurred while fetching bookings." });
		}
	});
});

app.listen(4000, () => {
	console.log("listening on port 4000");
});
