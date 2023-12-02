import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set the view engine to EJS

let itemList = [];

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    const date = today.toLocaleDateString("en-US", options);
    const hour = today.getHours();
    let greet;

    if (hour < 12) {
        greet = `Good morning!`;
    } else if (hour >= 12 && hour <= 17) {
        greet = `Good afternoon!`;
    } else {
        greet = `Good evening!`;
    }

    res.render("index.ejs", {
        currentDate: date,
        greeting: greet,
        itemList: itemList,
    });
});

app.post("/", (req, res) => {
    const newTask = req.body.taskName;
    itemList.push(newTask); 
    res.redirect("/");
});

app.delete("/delete/:index", (req, res) => {
    const index = req.params.index;
    
    if (index >= 0 && index < itemList.length) {
        itemList.splice(index, 1);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

