import express from "express"
import bodyParser from "body-parser";



const app= express();
const port=4000;

 let blogs=[
    {
        id:1,
        title:"Web Development Bootcamp",
        content:"The web development bootcamp from Angela YU, teaches web development more than 1million students. In the course there are a lot of topics. HTML,CSS,JS,NODE.JS,BOOTSTRAP,JQUERY,EJS,REACT,API,DATABASES and ect. I recommend this course those who is interested in software. You create an infrastructure. ",
        author:"Emincan TETİK",
        date:new Date(),
    },
    {
        id:2,
        title:"Learning from past shocks to scale up disaster and climate resilience in Algeria",
        content:"Unfortunately, disasters like these are far from rare in Algeria. Be it earthquakes, forest fires, or floods, Algeria has had its share of disasters over the years and has learned valuable lessons from them. The Algerian government estimates that annual spending over the past 15 years to respond to floods, earthquakes, and forest fires averages around USD 255 million (DZD 35,14 billion), with about 70% allocated to floods. Aware of the country’s growing disaster risks in the context of urbanization and climate change, the government has adopted numerous policies, regulations, and plans that demonstrate its commitment to better prepare for, manage, and mitigate the impacts of disasters. It is equally aware that the journey to disaster resilience is far from over and much remains to be done. ",
        author:"Emincan TETİK",
        date:new Date(),
    },
    {
        id:3,
        title:"Which team will win the championship ?",
        content:"The first league games in Turkey were held in Istanbul in 1904. This league was called Istanbul Football League originally. The teams participating were called Cadi-Keuy FC, Moda FC, Elpis FC and HMS Imogene. These teams were made up of the English, Greek, and Armenian minorities living in Turkey. Galatasaray SK joined the league in 1906–07 and Fenerbahçe SK in 1909–10. Galatasaray SK did not participate in the 1911–12 season and the club suggested to loan Emin Bülent Serdaroğlu, Celal Ibrahim and two other Galatasaray SK players to Fenerbahçe SK for the match against Strugglers FC. But Fenerbahçe SK did not accept this offer. In 1912 Galatasaray SK president Ali Sami Yen and Fenerbahçe SK president Galip Kulaksızoğlu made a meeting. They arranged a protocol and agreed to form a strong Turkish team against the non-Turkish teams in the league. According to this agreement the new club would have been called Türkkulübü (The Turkish Club), full white kit with a red star. Additionally they also agreed to set up a museum. On 23 August 1912 they presented the petition to the International Olympic Committee – Ottoman section. Due to the Balkan Wars in 1913, this agreement could not be enforced. ",
        author:"Emincan TETİK",
        date:new Date(),
    }
]

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let lastId=3;

// get all blogs 

app.get("/blogs",(req,res)=>{
    console.log(blogs)
    res.json(blogs)
})

// get specific blog 

app.get("/blogs/:id", (req,res)=>{
    const requestedId= parseInt(req.params.id);
    const requestedIndex= blogs.find((blog)=> blog.id===requestedId)
    console.log(requestedIndex);
    res.json(requestedIndex);
})

// post a new blog

app.post("/blogs", (req,res)=>{

    const newId=lastId+=1;
    const blog={
        id: newId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };
    lastId= newId;
    blogs.push(blog);
    res.status(201).json(blog);
})

//edit a blog

app.patch("/blogs/edit/:id",(req,res)=>{

    let requestedId= parseInt(req.params.id);
    let replacementIndex=blogs.find((blog)=> blog.id=== requestedId);
    let newIndex={
        id:requestedId,
        title: req.body.title||replacementIndex.title,
        content: req.body.content||replacementIndex.content,
        author: req.body.author||replacementIndex.author,
        date: new Date(),
    };
    let requestedIndex=blogs.findIndex((blog)=> blog.id=== requestedId);
    blogs[requestedIndex]=newIndex;

    res.status(201).json(newIndex);
})


// delete a blog
app.delete("/blogs/delete/:id",(req,res)=>{
    const requestedId= parseInt(req.params.id)
    const requestedIndex=blogs.findIndex((blog)=> blog.id===requestedId)

    if(requestedIndex!==-1){
        blogs.splice(requestedIndex,1);
        console.log("Succesfully deleted.")
        res.status(201).json(requestedIndex);
    }else{
        res.status(404).json({ message: "Blog not found" });
    }
   

})

app.listen(port,()=>{
    console.log("Api runnig on "+port)
})