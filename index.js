const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const cors = require('cors')
const sequelize = require('./util/database')

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const Product = require("./models/products")
const User = require("./models/user")

console.log('start express node server....')

app.use(bodyparser.urlencoded({extended:false}))
app.use(cors())


Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"})
User.hasMany(Product)

app.use((req, res, next) => {
    // untuk semua halaman akan menampilkan console.log
    console.log("middle 1:", Date.now())
    User.findByPk(2).then(userfound => {
        req.user = userfound
        next()
    }).catch(err => console.log(err))
})
// segala url yg berisi "/admin" akan memanggil admin Routes
app.use('/admin',adminRoutes)
// segala url yg berisi "/shop" akan memanggil admin Routes
app.use('/shop',shopRoutes)


router.use("/user/:id", function(req, res, next){
    console.log("middle user", req.params.id)
    next()
})


router.get("/user/:id", function(req, res){
    res.send(req.method+"-"+req.params.id)
})

router.get("/print", function(req, res){
    res.send(req.method+"-"+req.query.text+"-"+req.query.name)
})

app.use("/", router);


app.use((req, res, next) => {
    res.status(404).send("<h1>Halaman Tidak Ditemukan</h1>")
})

const koneksi = async() => {
    try{
        await sequelize.authenticate()
        console.log('database terhubung')
    }catch(error){
        console.log('error koneksi database', error)
    }
}

koneksi()
sequelize.sync()
.then(result => {
    console.log(result)
    return User.findByPk()
}).then(userfound => {
    if(!userfound) {
        return User.create({
            name: "tono",
            email: "tono@gmail.com"
        })
    }
    return userfound
}).then(myuser => {
    app.listen(8000)
})
.catch(err => {
    console.log(err)
})



