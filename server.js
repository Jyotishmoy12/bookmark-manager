const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require("dotenv").config()

const app = express()
const PORT=process.env.PORT || 5000;
app.use(cors())

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("MongoDB connceted"))
.catch(err=>console.log("MongoDB connected error", err));


app.get('/', (req, res)=>{
    res.send("Bookmark manager API");
})

app.use('/api/bookmarks', require('./routes/bookmarks'))

app.listen(PORT, ()=>{
   console.log(`Server is running on port ${PORT}`)
})