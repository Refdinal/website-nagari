const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModels = require("../models/authModels");
const register = async (req, res) => {
  try {
    const { username, email, password, pin, role } = req.body;
    const existingUser = await authModels.findByUsername(username);
    const existingEmail = await authModels.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Username already exists",
      });
    }
    if (existingEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email already used",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(pin, 10);
    await authModels.createUser(username, email, hashedPassword, hashedPin, role);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authModels.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Email",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.TOKEN_SECRET, {
      expiresIn: "3d",
    });

    const expiresAt = new Date();

    expiresAt.setHours(expiresAt.getHours() + 3);

    const activeToken = await authModels.findTokenById(user.id);

    if (!activeToken) {
      await authModels.createToken(user.id, token, expiresAt);
    } else {
      await authModels.updateToken(user.id, token, expiresAt);
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(204).json({
        status: "error",
        message: "No Content",
      });
    }

    const tokenData = await authModels.findTokenByToken(token);

    if (!tokenData) {
      return res.status(204).json({
        status: "error",
        message: "No Content",
      });
    }
    const userId = tokenData.user_id;

    await authModels.deleteTokenByUserId(userId);
    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};
// middleware
const verifyToken = async (req, res) => {
  try {
    const currentToken = req.cookies.token;
    if (!currentToken) {
      return res.status(403).json({ message: "Access Denied" });
    }
    const verified = jwt.verify(currentToken, process.env.TOKEN_SECRET);
    const user = await authModels.findTokenById(verified.id);

    if (!user || user.token !== currentToken) {
      await authModels.deleteTokenByUserId(verified.id);
      res.clearCookie("token");
      return res.status(401).json({ message: "Invalid token" });
    }
    if (user.expires_at < new Date()) {
      await authModels.deleteTokenByUserId(verified.id);
      res.clearCookie("token");
      return res.status(401).json({
        status: "error",
        message: "Token Expired",
      });
    }

    return res.status(200).json({ status: "success", token: user.token });
  } catch (error) {
    res.clearCookie("token");
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await authModels.getAllUsers();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authModels.findUserById(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    await authModels.deleteUserById(id);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyToken,
  getAllUsers,
  deleteUserById,
};
