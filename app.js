const express = require("express");
const app = express();
const port = 3000;
const {postRoute, profileRoute, tagRoute, userRoute} = require('./routes')

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// app.use(postRoute);
// app.use(profileRoute);
// app.use(tagRoute);
// app.use(userRoute);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
