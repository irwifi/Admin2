"use strict";
module.exports = ( params ) => {
	const router = params.express.Router();

	router.all("*", (req, res, next) => {
		// reset the authentication session in case of any session issue
		// req.authen.reset();

		// position of /authen in request url to check if it is the route for /authen
		const authen_index = req.url.indexOf("/authen");

		// check if user has logged in or not
		if (req.authen !== undefined && req.authen.user_id !== undefined && req.authen.locked === undefined) {
			// user has logged in
			// checks if the request url begins with /authen; that is route for /authen
			if(authen_index === 0 &&  !(["/authen/signout", "/authen/lock", "/authen/change_password"].includes(req.url))) {
				// redirect the authentication page to home page if the user is already logged in
				res.redirect("/");
			} else {
				next();
			}
		} else if (req.authen !== undefined && req.authen.locked === true) {
			// user is locked
			// checks if the request url begins with /authen; that is route for /authen
			if(authen_index === 0 &&  !(["/authen/lock_screen"].includes(req.url))) {
				next();
			} else {
				// res.redirect("/authen/lock_screen");
				next();
			}
		} else	{
			// user has not logged in
			// checks if the request url begins with /authen; that is route for /authen
			if(authen_index === 0) {
				next();
			} else {
				// redirect to authentication page if user is not logged in
				res.redirect('/authen');
			}
		}
	});

	return router;
};
