var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  connection.query('SELECT * from users', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

/* GET single users details */
router.get('/users/:id', function (req, res) {
   console.log(req);
   connection.query('select * from users where id=?', [req.params.id], function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 });
});


/* GET all user's blog posts. */
router.get('/blog_posts', function(req, res, next) {
  connection.query('SELECT * from blog_posts', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

/* GET single user's blog posts. */
router.get('/blog_posts/:id/:author', function(req, res, next) {
  connection.query('SELECT * from blog_posts where id=? AND author=?', [req.params.id,req.params.author], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
});

/* GET a particular blog post using id. */
router.get('/blog_posts/:id', function(req, res, next) {
  connection.query('SELECT * from blog_posts where id=?', [req.params.id], function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});
});


/*INSERT a new blog post using id. */
router.post('/create_blog_post', function(req, res, next) {
  var postData = req.body;
  connection.query('INSERT INTO blog_posts SET ?', postData, function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
  });
});

/* EDIT a users address details */
router.put('/edit_user', function(req, res, next) {
    connection.query('UPDATE user_addresses INNER JOIN users using (id) set address=?, province=?, city=?, country=?, postal_code=? where id=?',[req.body.address,req.body.province,req.body.city, req.body.country,req.body.postal_code,req.body.id], function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

/* Change a user's permission level with id*/
router.put('/edit_user/:id', function(req, res, next) {
    connection.query('UPDATE users set user_roles_id=? where id=?', [req.params.id,req.body.user_roles_id],function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

/*Delete a users details */
router.delete('/delete', function(req, res, next) {
    connection.query('DELETE from users where id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});




module.exports = router;
