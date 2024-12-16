import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";


 export default class UserController{
    getregister(req,res){
        res.render('register' );
    }
    loginuser(req,res){
        res.render('login' , {errorMessage : null ,  userEmail : req.session.userEmail});
    }
    postregister(req,res){
        const {name , email , password} = req.body;
        UserModel.add(name  , email , password);
        res.render('login' , {errorMessage : null ,  userEmail : req.session.userEmail});
    }
    postlogin(req,res){
        const{email , password} = req.body;
        const user = UserModel.isvalidate(email,password);
        if (!user) {
            res.render('login' , {
                errorMessage : "Invalid Credentials"
            });
        }
         req.session.userEmail = email;
         var products = ProductModel.getAll();
         return res.render('index', { products ,  userEmail : req.session.userEmail });
    }

    logout(req,res){
        req.session.destroy((err) =>{
        if (err) {
            console.log(err);
        }else{
            res.redirect('/login')
        }
    });
    res.clearCookie('lastVisit');
    }
 
}