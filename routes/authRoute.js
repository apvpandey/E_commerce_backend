import express from "express"
import {
    registerController,
    loginController,
    testController,
    adminController,
    admiLoginController,
    sellerRegister,
    sellerLogin,
    getAllUserData,
    productController,
    getAllProductData,
    deleteProductSeller,
    searchProductData,
    selectProductCategory,
    addToCart,
    getAllSellerData,
    editUserData,
    singleProductData,


} from '../controllers/authController.js'
import { isAdmin, requireSingIn } from "../middlewares/authMiddleware.js"


//router object

const router = express.Router()
//USER LOGIN AND REGISTRATION
//routing 
//REGISTER || METHOD POST
router.post('/register', registerController)
//LOGIN || POST METHOD
router.post('/login', loginController)

// test route
router.get('/test', requireSingIn, isAdmin, testController)


//ADMIN LOGIN AND REGISTRATION
router.post('/adminRegister', adminController)

router.post('/adminLogin', admiLoginController)


//SELLER REGISTRATION and LOGIN

router.post('/sellerRegister', sellerRegister)

router.post('/sellerLogin', sellerLogin)


// User Data Fetch
router.get('/getAllUser', getAllUserData)


//Seller Data Fetch
router.get('/getAllSeller', getAllSellerData)

// PRODUCT ADD BY SELLER
router.post('/productAdding', productController)

// PRODUCT GET by database
router.get('/getAllProductData', getAllProductData)


// Add to cart
router.post('/addToCart', addToCart)

// SEARCH PRODUCT
router.get("/serchProduct/:key", searchProductData)

// SINGLE PRODUCT
router.get("/singleProduct/:id", singleProductData)

// Edit user data
router.put('/update/:id', editUserData)

// SEARCH PRODUCT CATEGORY
router.get("/searchProductCategory/:category", selectProductCategory)

// PRODUCT DELETE by SELLER
router.post('/deleteProduct', deleteProductSeller)

// Protected Route for USER
router.get('/user-auth', requireSingIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// Protected Route for ADMIN
router.get('/admin-auth', requireSingIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// Protected Route for SELLER
router.get('/seller-auth', requireSingIn, (req, res) => {
    res.status(200).send({ ok: true });
})



export default router