const jwt = require("jsonwebtoken");

const secret = "secret-key";
// generating jwt token
const generateToken = (data) => {
  const payload = {
    userId: data.id,
    phoneNo: data.phoneNo,
  };
  return jwt.sign(payload, secret, { expiresIn: "2h" });
};

// verifying jwt token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const auth = authHeader.split(" ");
  const token = auth[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }
  try {
    console.log("JWT Token For verification: ", token);
    const decoded = jwt.verify(token, secret);
    //console.log("decoded: ",decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
};
module.exports = { generateToken, verifyToken };
