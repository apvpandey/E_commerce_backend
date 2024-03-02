import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
import adminModel from "../models/adminModel.js";
import sellerModel from "../models/sellerModel.js";
import productModel from "../models/productModel.js";



//registration controll
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, city, state, zip } = req.body;

        //validation
        if (!name) {
            return res.send({ message: "Name is Required..." });
        }
        if (!email) {
            return res.send({ message: "Email is Required..." });
        }
        if (!password) {
            return res.send({ message: "password is Required..." });
        }
        if (!phone) {
            return res.send({ message: "Phone number is Required..." });
        }
        if (!address) {
            return res.send({ message: "Address is Required..." });
        }
        if (!city) {
            return res.send({ message: "City is Required..." });
        }
        if (!state) {
            return res.send({ message: "State is Required..." });
        }
        if (!zip) {
            return res.send({ message: "Zip Code is Required..." });
        }

        // check user
        const existinguser = await userModel.findOne({ email });

        // existing user
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please login",
            });
        };

        //register user
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            city,
            state,
            zip,
            password: hashedPassword,
        }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};


//POST LOGIN 
//USER

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        // cheak User
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Register"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "100d",
        });
        res.status(200).send({
            success: true,
            message: "Login Succesfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
};

// test controller  

export const testController = (req, res) => {
    res.send("Protected Route")
}

// ADMIN LOGIN
export const admiLoginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        // cheak User
        const user = await adminModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Register"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "100d",
        });
        res.status(200).send({
            success: true,
            message: "Login Succesfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
};


// Admin register controll
export const adminController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validation
        if (!name) {
            return res.send({ message: "Name is Required..." });
        }
        if (!email) {
            return res.send({ message: "Email is Required..." });
        }
        if (!password) {
            return res.send({ message: "password is Required..." });
        }

        // check user
        const existinguser = await adminModel.findOne({ email });

        // existing user
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please login",
            });
        };

        //register user
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new adminModel({
            name,
            email,
            password: hashedPassword,
        }).save();
        res.status(201).send({
            success: true,
            message: "Admim Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

//SELLER register control

export const sellerRegister = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        //validation
        if (!name) {
            return res.send({ message: "Name is Required..." });
        }
        if (!email) {
            return res.send({ message: "Email is Required..." });
        }
        if (!password) {
            return res.send({ message: "Password is Required..." });
        }
        if (!phone) {
            return res.send({ message: "Phone number is Required..." });
        }

        // check user
        const existinguser = await sellerModel.findOne({ phone });

        // existing user
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please login",
            });
        };

        //register user
        const hashedPassword = await hashPassword(password);

        // save
        const user = await new sellerModel({
            name,
            email,
            phone,
            password: hashedPassword,
        }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

// seller login

export const sellerLogin = async (req, res) => {
    try {
        const { phone, password } = req.body

        //validation
        if (!phone || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid phone or Password"
            })
        }

        // cheak User
        const user = await sellerModel.findOne({ phone })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Phone is not Register"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "100d",
        });
        res.status(200).send({
            success: true,
            message: "Login Succesfully",
            seller: {
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
};

// User data fetch by admin....

export const getAllUserData = async (req, res) => {
    try {
        const allUser = await userModel.find({});
        res.send({ status: "ok", data: allUser })
    } catch (error) {
        console.log(error);
    }
}
// SELLER data fetch by admin....

export const getAllSellerData = async (req, res) => {
    try {
        const allSeller = await sellerModel.find({});
        res.send({ status: "ok", data: allSeller })
    } catch (error) {
        console.log(error);
    }
}

// update

export const editUserData = async (req, res) => {
    const itemId = req.params.id;
    const { name, email, phone, address, city, state, zip } = req.body;
    try {
        const item = await userModel.findByIdAndUpdate(itemId, { name, email, phone, address, city, state, zip }, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Product Add by seller.....
//Product Control

export const productController = async (req, res) => {
    try {
        const { image, name, model, description, price, category, stocks } = req.body;

        //validation
        if (!image) {
            return res.send({ message: "Product Image is Required..." });
        }
        if (!name) {
            return res.send({ message: "Product Name is Required..." });
        }
        if (!model) {
            return res.send({ message: "Product ModelNo is Required..." });
        }
        if (!description) {
            return res.send({ message: "Description is Required..." });
        }
        if (!price) {
            return res.send({ message: "Price is Required..." });
        }
        if (!category) {
            return res.send({ message: "Category is Required..." });
        }
        if (!stocks) {
            return res.send({ message: "Stock Details is Required..." });
        }
        // save
        const prod = await new productModel({
            image,
            name,
            model,
            description,
            price,
            category,
            stocks,
        }).save();
        res.status(201).send({
            success: true,
            message: "Product Add Successfully",
            prod,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Product Adding",
            error,
        });
    }
};

// DATA get in Display from database

export const getAllProductData = async (req, res) => {
    try {
        const allUser = await productModel.find({});
        res.send({ status: "ok", data: allUser })
    } catch (error) {
        console.log(error);
    }
}

// SEARCH product data
export const searchProductData = async (req, res) => {
    try {
        const result = await productModel.find({
            "$or": [
                {
                    category: { $regex: req.params.key }
                },
            ]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

// SINGEL PRODUCT by Id
export const singleProductData = async (req, res) => {
    try {
        const result = await productModel.findOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        res.send({ result: " ERROR " });
        console.log(error);
    }
}


// SEARCH PRODUCT by Select category.......

export const selectProductCategory = async (req, res) => {
    try {
        const result = await productModel.find({
            "$or": [
                {
                    category: { $regex: req.params.category }
                }
            ]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}


// DELETE Product By Seller

export const deleteProductSeller = async (req, res) => {
    const { userid } = req.body;
    try {
        const del = await productModel.deleteOne({ _id: userid });
        res.send({ status: "ok", data: "Deleted", del });

    } catch (error) {
        console.log(error);
    }
}


// ADD to CART
export const addToCart = async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await userModel.findById(userId);
        user.cart.push({
            name: product.name,
            product: product._id,
            price: product.price
        });
        await user.save();
        res.json({ message: 'Product Add to cart' })
    } catch (error) {
        console.log(error);
    }
}

// export const userAddToCart = async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const user = await userModel.findById(userId);
//         user.cart.push({
//             name: product.name,

//             price: product.price
//         });
//         await user.save();
//         res.json({ message: 'Product Add to cart' })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error ",
//             error,
//         });
//     }
// }