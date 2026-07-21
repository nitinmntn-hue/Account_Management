const checkPermission = (permission) => {
  return (req, res, next) => {
    const role = req.user.role;
    const permissions = {
      SUPER_ADMIN: {
        dashboard: true,
        users: true,
        companies: true,
        sessions: true,
        accounts: true,
        accountHeads: true,
        parties: true,
        transactions: true,
        reports: true,
        settings: true,
      },

      ADMIN: {
        dashboard: true,
        users: true,
        sessions: true,
        accounts: true,
        accountHeads: true,
        parties: true,
        transactions: true,
        reports: true,
      },

      MANAGER: {
        dashboard: true,
        accounts: true,
        accountHeads: true,
        parties: true,
        transactions: true,
        reports: true,
      },

      STAFF: {
        dashboard: true,
        parties: true,
        transactions: true,
      },
    };

    if (!permissions[role]?.[permission]) {
      return res.status(403).json({
        success: false,
        message: "Permission denied",
      });
    }

    next();
  };
};

module.exports = checkPermission;
