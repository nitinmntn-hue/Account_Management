const roles = {
  SUPER_ADMIN: {
    dashboard: true,
    users: true,
    company: true,
    sessions: true,
    accounts: true,
    accountHeads: true,
    parties: true,
    transaction: true,
    reports: true,
    settings: true,
  },
  ADMIN: {
    dashboard: true,
    users: true,
    company: false,
    sessions: true,
    accounts: true,
    accountHeads: true,
    parties: true,
    transaction: true,
    reports: true,
    settings: true,
  },
  MANAGER: {
    dashboard: true,
    users: false,
    company: false,
    sessions: false,
    accounts: true,
    accountHeads: true,
    parties: true,
    transaction: true,
    reports: true,
    settings: false,
  },
  STAFF: {
    dashboard: true,
    users: false,
    company: false,
    sessions: false,
    accounts: false,
    accountHeads: false,
    parties: true,
    transaction: true,
    reports: true,
    settings: false,
  },
};

const getRoles = async (req, res) => {
  res.json({
    success: true,
    data: Object.keys(roles),
  });
};

const getRolePermissions = async (req, res) => {
  const { role } = req.params;

  if (!roles[role]) {
    return res.status(404).json({
      success: false,
      message: "Role not found",
    });
  }
  res.json({
    success: true,
    data: roles[role],
  });
};

const updatedRolePermissions = async (req, res) => {
  const { role } = req.params;

  if (!roles[role]) {
    return res.status(404).json({
      success: false,
      message: "Role not found",
    });
  }
  roles[role] = {
    ...roles[role],
    ...req.body,
  };

  res.json({
    success: true,
    message: "Permission updated ",
    data: roles[role],
  });
};

module.exports = {
  getRoles,
  getRolePermissions,
  updatedRolePermissions,
};
