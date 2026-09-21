import 'dotenv/config'

import express from 'express'

import session from 'express-session'

import path from  'path'

import {fileURLToPath} from 'url'

import authRoutes from './routes/authRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:'secret', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}))

app.set('view engine', 'ejs')

app.use('/', authRoutes)

app.set('views', path.join(__dirname,  'views'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  
  console.log(`Server running on port ${PORT}`);
});


app.get('/Dashboard',(req,res)=>{

  if(!req.session.UserId) {

    return res.redirect.apply('/login')
  }else{

    res.render('auth/dashboard')
  }
})