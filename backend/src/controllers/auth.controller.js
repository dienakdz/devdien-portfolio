import {
  login,
  getCurrentUser,
  refresh,
  logout,
  updateCurrentUser,
  changeCurrentUserPassword,
} from '../services/auth.service.js';
import { buildRequestMetadata } from '../utils/request-metadata.js';

export const loginController = async (req, res) => {
    const result = await login({
        email: req.body?.email,
        password: req.body?.password,
        metadata: buildRequestMetadata(req)
    });

    res.json(result);
};

export const meController = async (req, res) => {
    const user = await getCurrentUser({
        userId: Number(req.user.id),
    });

    res.json({ user });
};

export const updateMeController = async (req, res) => {
  const user = await updateCurrentUser({
    userId: Number(req.user.id),
    email: req.body?.email,
    fullName: req.body?.fullName,
  });

  res.json({ user });
};

export const changePasswordController = async (req, res) => {
  const result = await changeCurrentUserPassword({
    userId: Number(req.user.id),
    currentPassword: req.body?.currentPassword,
    newPassword: req.body?.newPassword,
  });

  res.json(result);
};

export const refreshController = async (req, res) => {
  const result = await refresh({
    refreshToken: req.body?.refreshToken,
  });

  res.json(result);
};

export const logoutController = async (req, res) => {
  const result = await logout({
    refreshToken: req.body?.refreshToken,
  });

  res.json(result);
};
