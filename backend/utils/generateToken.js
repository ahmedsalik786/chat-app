import jwt from "jsonwebtoken"; // Corrected import statement

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true, // Prevents client-side script from accessing the cookie, mitigating XSS attacks
    sameSite: "strict", // Strict same-site policy to mitigate CSRF attacks
    // Consider using secure: true if you're serving your site over HTTPS
    secure: process.env.NODE_ENV !== "development", // Only send the cookie over https
  });
};

export default generateTokenAndSetCookie;
