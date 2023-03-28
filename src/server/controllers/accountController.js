const Account = require('../models/accountModel');

const accountController = {};

/*
Get Matches Algorithm
- Input: logged in user, logged in user's match preference number, array of all other users

- In order to get matches for a particular user we must: 
- 1. Iterate through the users that aren't our current logged in user
- 2. For every one of those users we must iterate through our logged in user's list of top songs/artists and see if our current iteration's user's topsongs/artists include our song
- 3. keep track of how many songs match
- 4. Push users into our matches array based on both our logged in user's match preference and our comparison user's match preference
- 5. Return that array to the front end
- Output: Array of matches

*/
function getMatches(currentUser, matchPref, allOtherUsers) {
  // Intialize our array of matches
  const allMatches = [];
  // loop through our allOtherUsers (array of objects)
  for (let user of allOtherUsers) {
    // initialize count to keep track of common songs/artists
    let count = 0;
    // iterate thru our current user's top songs
    for (let song of currentUser.topSongs.split(';')) {
      // check for matches in our allOtherUsers
      if (user.topSongs.split(';').includes(song)) {
        // have match? increment count
        count += 1;
      }
    }
    // condition to add to matches array
    if (count >= matchPref && user.matchPreference <= count) {
      allMatches.push(user);
    }
  }
  // return all matches array
  return allMatches;
}

/* 
Create Account Middleware:
- 1. Receive our information from the front end
- 2. Create a new account by invoking our Account schema and passing our req information into it
- 3. Save that account
- 4. Save a success message that will be sent to our end user
*/
accountController.createAccount = async (req, res, next) => {
  try {
    console.log(req.body);
    // destructure info from req body
    const {
      profilePicUrl,
      email,
      firstName,
      lastName,
      password,
      topSongs,
      matchPreference,
      gender,
      genderPreference,
      biography,
    } = req.body;


    // create new account object invoking Account schema
    const newAccount = new Account({
      profilePicUrl,
      email,
      firstName,
      lastName,
      password,
      matchPreference,
      // join arr on a ';' to save space
      topSongs: topSongs.join(';'),
      gender,
      genderPreference,
      biography,
    });
    await newAccount.save();
    res.locals.account_creation = 'success';
    return next();
  } catch (e) {
    e.log = 'email already in use';
    return next(e);
  }
};

/* 
Verify User Middleware
- Occurances: the main occurence in which this would happen would be on account login since later authentication will most likely be based on cookies
- 1. Grab the input email and password from request body
- 2. Find an account in our accounts collection where the emails match
- 3. Validate the password by comparing it against the hashed password in the db (check accountModel.js to understand isValidPassword method)
- 4. Store our stringified user._id in locals for later middleware use
*/
accountController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // should return object with user info if user exists
    const user = await Account.findOne({ email: email });

    // if object empty, we don't have user, return an error
    if (!user) {
      return next({ error: 'Incorrect username or password' });
    }

    // validate password: return bool - true or false
    const validatedPassword = await user.isValidPassword(password);

    // if password doesn't match, return an error
    if (!validatedPassword) {
      return next({ error: 'Incorrect username or password' });
    }

    // for auth we will use the user._id as a cookie, stored for later middleware use
    res.locals.cookieID = user._id.toString();

    return next();
  } catch (e) {
    return next(e);
  }
};

/* 
Get Matches Middleware
- Occurences: This will likely be invoked on every load of a user's home page to get their newest display of matches
- 1. Grab the logged in user's cookie (remember, its the user._id)
- 2. Using that cookie, we can access the account info in the database as well as that user's top listened to songs/artists array
- 3. We also are able to access their match preference (metric used to find match based on how many common songs/artists you want your match to like)
- 4. Need to grab an array of all other accounts that aren't the current account we are logged into
- 5. Compare all other accounts against our current user to get matches for our user
- 6. Save our matches array to a locals variable (this is what will be returned to the front end)
*/
accountController.getMatches = async (req, res, next) => {
  try {
    // grab userID from cookie
    const userID = await req.cookies.cookieID;

    // grab current account data based on that cookie
    const currentAccount = await Account.findOne({ _id: userID });

    // grab all other accounts
    const allOtherAccounts = await Account.find({
      gender: currentAccount.genderPreference,
      _id: { $ne: userID },
    });
    console.log(currentAccount.firstName);
    console.log(currentAccount.matchPreference);
    const matches = getMatches(
      currentAccount,
      currentAccount.matchPreference,
      allOtherAccounts
    );

    // // save matches into a local res variable
    res.locals.allMatches = matches;
    return next();
  } catch (e) {
    return next(e);
  }
};

/*
Change Gender Controll
- 1. Grab the user's new gender from req body and the userID from the cookies
- 2. Using that cookie grab the currently logged in account from the database
- 3. Update the gender on that account with the new gender from the post body
*/
accountController.changeGender = async (req, res, next) => {
  try {
    // grab new gender
    const { newGender } = req.body;
    // grab userid from cookie
    const userID = await req.cookies.cookieID;
    // Update gender on account where _id matches our cookie
    await Account.updateOne({ _id: userID }, { $set: { gender: newGender } });

    return next();
  } catch (e) {
    return next(e);
  }
};

accountController.changeGenderPreferences = async (req, res, next) => {
  try {
    // grab new gender pref
    const { newGenderPrefs } = req.body;
    // grab userid from cookie
    const userID = await req.cookies.cookieID;
    // Update gender pref on account where _id matches our cookie
    await Account.updateOne(
      { _id: userID },
      { $set: { genderPreference: newGenderPrefs } }
    );
    return next();
  } catch (e) {
    return next(e);
  }
};
module.exports = accountController;
