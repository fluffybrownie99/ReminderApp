let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    console.log(req.user)
    let reminder = {
      id: req.user.reminders.length+1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToupdate = req.params.id;
    console.log(req.body.completed == true);
    console.log(Boolean(req.body.completed), "test for bool")
    req.user.reminders.find(function (reminder) {
      if (reminder.id == reminderToupdate) {
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.completed = (req.body.completed === "true")
      }
    });    
    res.redirect("/reminders"); 
  },

  delete: (req, res) => {
    let reminderToDelete = req.params.id;
    let searchResult = req.user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToDelete;
    });
    req.user.reminders.splice(searchResult, 1); // will have to be changed from cindy to whatever user is in session
    res.redirect("/reminders");
  }
};

module.exports = remindersController;
