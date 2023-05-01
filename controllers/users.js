const { User } = require("../database/models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw HttpError(400, "Invalid subscription");
  }

  const user = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );

  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  updateSubscription: ctrlWrapper(updateSubscription),
};
