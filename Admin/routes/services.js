const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
const { ensureAuthenticated } = require("../helper/auth");

require("../model/Admin");
require("../model/Employee");
require("../model/Notice");
require("../model/Reviews");
require("../model/Leaves");
const Clients = require("../model/Clients");
const Pro = require("../model/Projects");
const Leaves = mongoose.model("leaves");
const Admin = mongoose.model("admin");
const Emp = mongoose.model("emp");
const Rev = mongoose.model("rev");
const Note = mongoose.model("notice");
var alp = /^[a-zA-Z]+$/;
var email = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;

router.get("/dash", ensureAuthenticated, (req, res) => {
  Emp.find({})
    .then(async emp => {
     await Leaves.find({}).then(async leaves => {
       await Client.find({})
        .then(async cli => {
       await   Pro.find({})
             .then(async pro => {
             await  Client.countDocuments({},async function (cli) {
               await  Pro.countDocuments({}, async p => {
                  await Emp.countDocuments({}, async function (err, c) {
                    await Rev.find({})
                            .then(reviews => {
                              res.render("admin/dash", {
                                count: c,
                                emp: emp,
                                leaves: leaves,
                                pro: p,
                                cli: cli,
                                reviews:reviews
                              });
                            })
                     
                   });
                 });
               });
           })
        })
        
      });
    })
    .catch(err => console.log(err));
});
router.put('/leaves/:id',ensureAuthenticated,(req,res) => {

     Leaves.findByIdAndUpdate(req.params.id, {
       $set: {
         status:true
       }
     })
     .then(() => {
       res.redirect('/dash')
     })
      
   })
router.get("/addemployee", ensureAuthenticated, (req, res) => {
  res.render("admin/employeereg");
});
router.post("/addemployee", (req, res) => {
  let errors = [];
  if (alp.test(req.body.firstname) === false) {
    errors.test({ text: "please enter correct Name" });
  }
  if (alp.test(req.body.lastname) === false) {
    errors.test({ text: "please enter correct LastName" });
  }
  if (email.test(req.body.email) === false) {
    errors.test({ text: "please enter correct email" });
  }
  console.log(errors);
  if (errors.length > 0) {
    res.render("employeereg", {
      errors: errors
    });
  } else {
    Emp.findOne({ email: req.body.email }).then(emp => {
      if (emp) {
        req.flash("error_msg", "email id already exist");
      } else {
        const emp = new Emp({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          age: req.body.age,
          Designation: req.body.Designation,
          salary: req.body.salary,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(emp.password, salt, (err, hash) => {
            if (err) throw err;
            emp.password = hash;
            emp.save().then(() => {
              req.flash("success_msg", "Registered successfully");
              res.redirect("/dash");
            });
            console.log(`registered success`);
          });
        });
      }
    });
  }
});
router.delete("/addemployee/:id", ensureAuthenticated, (req, res) => {
  Emp.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "idea has been removed ");
    res.redirect("/dash");
  });
});

router.get("/recruitment", (req, res) => {
  res.render("admin/rec");
});

router.post("/recruitment", (req, res) => {
  let receiver = req.body.email;
  let description = req.body.description;
  let subject = "recruitment";
  require("../api/mail")(receiver, description, subject);
  res.redirect("/dash");
});

router.get("/notice", ensureAuthenticated, (req, res) => {
  res.render("admin/notice");
});

router.post("/notice", ensureAuthenticated, (req, res) => {
  let errors = [];
  if (alp.test(req.body.title) === false) {
    errors.push({ text: "please enter correct title" });
  }
  if (alp.test(req.body.description) === false) {
    errors.push({ text: "please enter description" });
  }
  if (errors.length > 0) {
    res.render("admin/notice", {
      errors: errors
    });
  } else {
    const note = new Note({
      title: req.body.title,
      description: req.body.description
    });

    note.save().then(not => {
      res.redirect("/dash");
    });
  }
});

router.get("/holidays", ensureAuthenticated, (req, res) => {
  Holiday.find({}).then(holi => {
    res.render("admin/holidays", {
      holi
    });
  });
});

const Holiday = require("../model/Holidays");
router.post("/holidays", ensureAuthenticated, (req, res) => {
  let errors = [];
  if (alp.test(req.body.title) === false) {
    errors.push({ text: "please enter collect title" });
  }
  if (errors.length > 0) {
    res.render("admin/holidays", {
      errors: errors
    });
  } else {
    const holi = new Holiday({
      title: req.body.title,
      holidayDate: req.body.holidayDate
    });
    holi
      .save()
      .then(() => {
        res.redirect("holidays");
      })
      .catch(err => console.log(err));
  }
});

const Project = require("../model/Projects");

router.get("/projects", ensureAuthenticated, (req, res) => {
  Project.find({})
    .then(pro => {
      res.render("admin/projects", {
        pro: pro
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/projects", ensureAuthenticated, (req, res) => {
  let errors = [];
  if (alp.test(req.body.projectName)) {
    errors.push({ text: "please enter projectName correctly" });
  }
  if (errors.length > 0) {
    res.render("admin/projects", {
      errors: errors
    });
  } else {
    const pro = new Project({
      projectName: req.body.projectName,
      Rate: req.body.Rate,
      priority: req.body.priority,
      projectLeader: req.body.projectLeader,
      description: req.body.description
    });
    pro.save().then(() => {
      res.redirect("projects");
    });
  }
});

router.delete("/projects/:id", ensureAuthenticated, (req, res) => {
  Project.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "idea has been removed ");
    res.redirect("/projects");
  });
});

const Client = require("../model/Clients");

router.get("/clients", ensureAuthenticated, (req, res) => {
  Client.find({}).then(cli => {
    res.render("admin/clients", {
      cli: cli
    });
  });
});

router.post("/clients", ensureAuthenticated, (req, res) => {
  // let errors = [];
  // if (alp.test(req.body.firstname)) {
  //   errors.push({ text: "please enter firstname correctly" });
  // }
  // if (alp.test(req.body.lastname)) {
  //   errors.push({ text: "please enter lastname correctly" });
  // }

  // if (email.test(req.body.email)) {
  //   errors.push({ text: "please enter email correctly" });
  // }
  // console.log(errors);
  // if (errors.length > 0) {
  //   res.render("admin/clients", {
  //     errors: errors
  //   });
  // } else {
  const cli = new Client({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    Phone: req.body.Phone,
    companyName: req.body.companyName
  });
  cli.save().then(() => {
    res.redirect("clients");
  });
  // }
});
router.delete("/clients/:id", ensureAuthenticated, (req, res) => {
  Client.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "idea has been removed ");
    res.redirect("/clients");
  });
});

router.get("/promotion", ensureAuthenticated, (req, res) => {
  res.render("admin/promotion");
});

module.exports = router;
