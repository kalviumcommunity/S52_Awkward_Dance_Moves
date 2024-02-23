const express = require("express");
const multer = require("multer");
const router = express.Router();
const { UserModel, dataModel } = require("./Data"); // Only UserModel is needed
const { validateSignup } = require("./JoiSchema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to parse form data
// router.use(express.urlencoded({ extended: true }));

// Route for creating a new user
router.post("/createUser", upload.single("profile"), async (req, res) => {  try {
    const { userName, password, email, firstName, lastName, location, bio } =
      req.body;

    const mailData = await UserModel.findOne({ email: email });

    if (mailData) {
      return res.status(401).send("mailid already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user data object
    const userData = {
      userName,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      location,
      bio,
      profile: { data: req.file.buffer, contentType: req.file.mimetype },
    };

    // Create new user instance
    const newUser = new UserModel(userData);
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.TokenSecuriteCode,
      {
        expiresIn: "7d",
      }
    );

    // Save user to the database
    // await newUser.save();

    // Send success response
    // console.log(newUser)
    return res.status(201).send(token);
  } catch (error) {
    // Log error
    console.error("Error during signup:", error);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
});

// Other routes for CRUD operations
// Ensure to include only necessary routes

router.post("/postEntities", (req, res) => {
  dataModel
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/getEntities", (req, res) => {
  dataModel
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.delete("/deleteEntities/:id", (req, res) => {
  const id = req.params.id;
  dataModel
    .findByIdAndDelete(id)
    .then((deletedEntity) => res.json(deletedEntity))
    .catch((err) => res.json(err));
});

router.get("/getEntities/:id", (req, res) => {
  const id = req.params.id;
  dataModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/getAllUser", async (req, res) => {
  const userDetails = await UserModel.find();
  res.status(201).json(userDetails);
  // console.log(userDetails);
});

//geting user data

router.post("/getUserDetails", async (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.TokenSecuriteCode, async (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    // console.log(data.id)
    const userData = await UserModel.findOne({ _id: data.id });

    // console.log(dataa)
    return res.status(201).send(userData);
  });
  // console.log(_id)
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.TokenSecuriteCode,
      {
        expiresIn: "7d",
      }
    );
    // At this point, login is successful
    res.status(201).send(token);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/updateEntities/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);
  dataModel
    .findByIdAndUpdate(
      id,
      {
        $set:{
          dance_gif: req.body.dance_gif,
          comments: req.body.comments,
        }
      }

    )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "GET a post request" });
});

router.put("/", (req, res) => {
  res.status(200).json({ message: "GET a put request" });
});

router.delete("/", (req, res) => {
  res.status(200).json({ message: "Delete a request" });
});

module.exports = router;
