exports.isManager = (req, res, next) => {
  if (req.session.role !== "manager") {
    return res
      .status(403)
      .redirect(`/login?message=You may not perform this action`);
  }

  next();
};
