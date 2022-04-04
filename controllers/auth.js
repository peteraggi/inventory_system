const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");



exports.login = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
      // return res.status(400).render("login", {
      //   message: "Please provide an email and password",
      // });
      const message = "Please provide a username and password"; 
      res.cookie("msg", message, { httpOnly: true });
      return res.status(400).redirect('/login');

    } else {

      // http://localhost/APIs/apiInventorySystem/lukard/api/loginUser.php?user_name=lukard&password=1
      // http://localhost/APIs/apiInventorySystem/lukard/api/users/loginUser.php
      const url = `http://localhost/APIs/apiInventorySystem/lukard/api/users/loginUser.php?user_name=${user_name}&password=${password}`;
      const result = await fetch(url);
      const apiResponse = await result.json();

      if(apiResponse.success==0){
        console.log("Error..");
        const results = null;
        // return res.render("returns", {
        //     results
        // });
        const message = apiResponse.message; 
        res.cookie("msg", message, { httpOnly: true });
        return res.status(400).redirect('/login');
        
    }
    else{
        console.log("Successful..");
        const results = apiResponse.data;
        // console.log(results);

        const id = results.user_id;
      
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
      
        console.log("The token is: " + token);
      
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
      
        res.cookie("jwt", token, cookieOptions);
        res.status(200).redirect("/dashboard");
      }
        
      }


  } catch (error) {
    console.log(error);
  }
};

exports.register = async (req, res) => {
  console.log(req.body);

  const { full_name, user_name, password, passwordConfirm } = req.body;

  if (!full_name || !user_name || !password || !passwordConfirm) {
    const message = "Please fill all fields!"; 
    res.cookie("msg", message, { httpOnly: true });
    return res.status(400).redirect('/register');

  } else{
    // if all fields are entered, then continue
    // http://localhost/APIs/apiInventorySystem/lukard/api/users/registerUser.php
    const url =  `http://localhost/APIs/apiInventorySystem/lukard/api/users/registerUser.php?full_name=${full_name}&user_name=${user_name}&password=${password}&passwordConfirm=${passwordConfirm}`;

    // const url = `http://localhost/APIs/apiInventorySystem/lukard/api/users/loginUser.php?user_name=${user_name}&password=${password}`;

      const result = await fetch(url);
      const apiResponse = await result.json();

      if(apiResponse.success==0){
        console.log("Error..");
        const results = null;
        const message = apiResponse.message; 
        res.cookie("msg", message, { httpOnly: true });
        return res.status(400).redirect('/register');
      } 
      else if (apiResponse.success==1) {
        console.log("Successfull..");
        // const results = null;
        const message = apiResponse.message; 
        res.cookie("msg", message, { httpOnly: true });
        return res.status(200).redirect('/login');
        
      }else{
        // unknown error

      }

  }


  // db.query(
  //   "SELECT email FROM users WHERE email = ?",
  //   [email],
  //   async (error, results) => {

  //     if (error) {
  //       console.log(error);
  //     }

  //     if (results.length > 0) {
  //       return res.render("register", {
  //         message: "That email is already in use",
  //       });
  //     } 
      
  //     else if (password !== passwordConfirm) {
  //       return res.render("register", {
  //         message: "Passwords do not match",
  //       });
  //     }

  //     let hashedPassword = await bcrypt.hash(password, 8);
  //     console.log(hashedPassword);

  //     db.query(
  //       "INSERT INTO users SET ?",
  //       { name: name, email: email, password: hashedPassword },
  //       (error, results) => {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log(results);
  //           return res.render("register", {
  //             message: "User registered",
  //           });
  //         }
  //       }
  //     );
  //   }


  // );
};
