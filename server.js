import express from "express";
import axios from "axios";
import bodyParser from "body-parser";



const app = express();
const port=3000;
const apiUrl="http://localhost:4000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));


// GET ALL BLOGS FROM API
app.get("/",async (req,res)=>{
    const response= await axios.get(apiUrl+"/blogs");

    try {
        res.render("index.ejs",{
            blogs:response.data
        })
    } catch (error) {
        res.status(500).send(error.message())
    }
})

// READ THE ARTİCLES 



// GET THE NEW PAGE

app.get("/new", (req,res)=>{
    res.render("new.ejs",{
        heading:"Create a Blog",
        
    })
})

app.get("/blogs/edit/:id", async (req,res)=>{
    try {
    const response= await axios.get(apiUrl+"/blogs/"+req.params.id);
        res.render("new.ejs",{
            heading:"Edit the Blog",
            blog:response.data
        })
    } catch (error) {
        res.status(500).json({message:"Error getting new page. "})
    }
})

// POST A NEW BLOG

app.post("/api/blogs", async (req, res) => {
    const response = await axios.post(apiUrl+"/blogs", req.body);
    try {
      console.log(response.data);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error creating post" });
    }
  });


  //EDİT A BLOG

  app.post("/api/blogs/edit/:id", async (req,res)=>{
    const response= await axios.patch(apiUrl+"/blogs/edit/"+req.params.id, req.body);
    try {
        console.log(response.data)
        res.redirect("/")
    } catch (error) {
        res.status(500).json({message:"Error editing blog"})
    }
  })

  // DELETE A BLOG

  app.post("/api/blogs/delete/:id", async (req,res)=>{
    const response= await axios.delete(apiUrl+"/blogs/delete/"+req.params.id)
    try {
        console.log("Succesfully deleted."+ response.data)
        res.redirect("/")
    } catch (error) {
        res.status(500).json({message: "Error deleting post"})
    }
  })




app.listen(port,()=>{
    console.log("Server running on "+port);
})