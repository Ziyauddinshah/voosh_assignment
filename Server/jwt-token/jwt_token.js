const jwt = require("jsonwebtoken");

const secret_key = "secret-key";
// generating jwt token
const generateToken = (data) => {
  const payload = {
    user_name: data.user_name,
    phone_no: data.phone_no,
  };
  return jwt.sign(payload, secret_key, { expiresIn: "2h" });
};

// verifying jwt token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const auth = authHeader.split(" ");
  const token = auth[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }
  console.log("token ", token);
  try {
    console.log("JWT Token For verification: ", token);
    const decoded = jwt.verify(token, secret_key);
    //console.log("decoded: ",decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
};
module.exports = { generateToken, verifyToken };
