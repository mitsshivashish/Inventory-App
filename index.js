import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';


const app = express();
app.use(express.static('public'));
app.use(cookieParser());
app.use(setLastVisit);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
const usercontroller = new UserController();

const productsController =
  new ProductsController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

app.get('/register' , usercontroller.getregister);
app.get('/login' , usercontroller.loginuser);
app.post('/login' , usercontroller.postlogin);
app.post('/register' , usercontroller.postregister);
app.get('/',auth, productsController.getProducts);
app.get('/logout' , usercontroller.logout);
app.get(
  '/add-product',auth,
  productsController.getAddProduct
);

app.get(
  '/update-product/:id',auth,
  productsController.getUpdateProductView
);

app.post(
  '/delete-product/:id',auth,
  productsController.deleteProduct
);

app.post(
  '/',
  uploadFile.single('imageUrl'),auth,
  validationMiddleware,
  productsController.postAddProduct
);

app.post(
  '/update-product',auth,
  productsController.postUpdateProduct
);

app.post("/search", productsController.search);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
