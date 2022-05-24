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
exports.getAllPolls = async (req, res, next) => {
  try {
    let polls = await Poll.find();
    res.render("polls", { polls });
  } catch (error) {
    console.log(e);
  }
};

exports.viewPollGetController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const poll = await Poll.findById(id);
    const options = [...poll.options];
    let result = [];
    options.forEach((option) => {
      let percentage = (option.vote * 100) / poll.totalVote;
      result.push({
        ...option._doc,
        percentage: percentage ? percentage.toFixed(2) : 0,
      });
    });
    res.render("viewPoll", { poll, result });
  } catch (error) {
    console.log(error);
  }
};
exports.viewPollPostController = async (req, res, next) => {
  const id = req.params.id;
  const optionID = req.body.option;
  try {
    const poll = await Poll.findById(id);
    let options = [...poll.options];
    const index = options.findIndex((o) => o.id == optionID);

    options[index].vote = options[index].vote + 1;

    const totalVote = poll.totalVote + 1;

    await Poll.findOneAndUpdate(
      { _id: poll._id },
      {
        $set: { options, totalVote },
      }
    );
    res.redirect(`/polls/${poll._id}`);
  } catch (error) {
    console.log(error);
  }
};
