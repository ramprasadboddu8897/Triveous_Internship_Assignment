import productModel from "../models/product.js";
import adminModel from "../models/admin.js";
import path from "path";

export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const oldUser = await adminModel.findOne({ email });
  
      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
  
    try {
      const oldUser = await adminModel.findOne({ email });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
  
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };

  export const addProduct = async (req, res) => {
    const { title, price, description, availability, imageurls } = req.body;
  
    try {
      const imagesBaseUrl = "D:\Internshala_Assignments\Trievous\server\images"; // Replace with your actual base URL
      const imageUrlsWithFullPaths = imageurls.map(filename => path.join(imagesBaseUrl, filename));
  
      const newProduct = await productModel.create({
        title,
        price,
        description,
        availability,
        imageurls: imageUrlsWithFullPaths,
      });
  
      if (!newProduct) {
        return res.status(404).json({ message: 'Product not added' });
      }
  
      res.json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: 'Error adding product' });
    }
  };