import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static("public"));
//app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
let blogPosts = [];
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
    res.render("index.ejs", {blogPosts: blogPosts});
});

app.post("/add", (req, res) => {
    console.log("adding:",req.body);
    blogPosts.push(req.body.blogPost);
    res.redirect("/");
});

app.get("/delete/:i", (req, res) => {
    console.log("deleting:",req.params.i, blogPosts[req.params.i]);
    blogPosts.splice(req.params.i, 1); 
    res.redirect("/");
})

app.get("/edit/:i", (req, res) => {
    console.log("editing:",req.params.i, blogPosts[req.params.i]);
    res.render("edit.ejs", {blogPosts: blogPosts, i: req.params.i});
})

app.post("/edit_submit/:i", (req, res) => {
    console.log("edited to:",req.params.i, req.body.blogPost);
    blogPosts[req.params.i] = req.body.blogPost;
    res.redirect("/");
})
