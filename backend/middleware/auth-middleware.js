// const jwt = require("jsonwebtoken");

// const verifyToken = (token, secretKey) => {
//   return jwt.verify(token, secretKey);
// };

// const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log(authHeader, "authHeader");

//   if (!authHeader) {
//     return res.status(401).json({
//       success: false,
//       message: "User is not authenticated",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const payload = verifyToken(token, "JWT_SECRET");

//     req.user = payload;

//     next();
//   } catch (e) {
//     return res.status(401).json({
//       success: false,
//       message: "invalid token",
//     });
//   }
// };

// module.exports = authenticate;


const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is missing",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token is missing",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    req.user = payload; // Attach payload to request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({
      success: false,
      message: "Authorization token is invalid",
    });
  }
};

module.exports = authenticate;
