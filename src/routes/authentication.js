"use strict";
module.exports = ( params ) => {
	const router = params.express.Router();

	router.all("*", (req, res, next) => {
		// reset the authentication session in case of any session issue
		// req.authen.reset();

		// position of /authen in request url to check if it is the route for /authen
		const authen_index = req.url.indexOf("/authen");

		const logged_authen = ["/authen/signout", "/authen/lock_screen", "/authen/lock", "/authen/change_password"];
		const locked_authen = ["/authen/lock", "/authen/change_password"];
		switch(req.authen.status) {
			case undefined:
			case false:
				if(authen_index !== 0 || logged_authen.includes(req.url)) {res.redirect('/authen');}
				else {next();}
				break;
			case "locked":
				if(authen_index !== 0 || locked_authen.includes(req.url)) {res.redirect('/authen/lock_screen');}
				else {next();}
				break;
			case true:
				if(authen_index !== 0 || (logged_authen.includes(req.url) && req.url !== "/authen/lock_screen")) {next();}
				else {res.redirect("/");}
				break;
		}
	});

	return router;
};
