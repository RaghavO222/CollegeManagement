require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const markRoutes = require('./routes/markRoute')
const attRoutes = require('./routes/attendenceRoute')
const userRoutes = require('./routes/userRoute')
const subRoutes = require('./routes/subjectRoute')
const tempRoutes = require('./routes/tempRoute')

const app = express()

app.use(express.json())

app.use('/api/marks',markRoutes)
app.use('/api/attendence',attRoutes)
app.use('/api/user',userRoutes)
app.use('/api/subs',subRoutes)
app.use('/api/temp/',tempRoutes)

mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log('Listening on port ',process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error)
})
