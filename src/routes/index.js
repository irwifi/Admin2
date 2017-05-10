var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  admin_dashboard(null, {req, res, next});
});

router.get('/last_invoice', (req, res, next) => {
  invoice_page(null, {req, res, next});
});

const admin_dashboard = (err, params) => {
  const params_out = {
    page: "dashboard",
    title: "Admin 2.0 Dashbard",
    widgets: ["text", "calendar", "map"]
  };

  params.res.render('index', params_out);
}

const invoice_page = (err, params) => {
  const params_out = {
    page: "invoice",
    title: "Admin 2.0 Dashbard"
  };
  params.res.render('index', params_out);
}

module.exports = router;
