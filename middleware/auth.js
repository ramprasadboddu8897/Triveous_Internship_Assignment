import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Use optional chaining to handle undefined header

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Token verification failed" });
  }
};

export default auth;
