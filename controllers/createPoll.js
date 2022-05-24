const Poll = require("../models/polls");

exports.createPollGetController = (req, res, next) => {
  res.render("create");
};
exports.createPollPostController = async (req, res, next) => {
  let { title, description, options } = req.body;
  options = options.reduce((acc, curr) => {
    if (curr) {
      acc.push({
        name: curr,
        vote: 0,
      });
    }
    return acc;
  }, []);
  const poll = new Poll({
    title,
    description,
    options,
  });
  try {
    await poll.save();
    res.redirect("/polls");
  } catch (error) {
    console.log(error);
  }
};
