import userDb from "./users.json";
// const obj = JSON.parse(userDb);
export const authUser = ({ body }, res, next) => {
  const userNamePost = body.username;
  const passwordPost = body.password;
  // console.log(userNamePost, ":", passwordPost);
  // console.log(userDb[userNamePost]);
  if (userDb[userNamePost] == passwordPost) {
    console.log("User authenticated", userDb[userNamePost]);
    return res.status(202);
  } else {
    console.log("User not authenticated");
    return res.status(403);
  }
};

export const show = ({ params }, res, next) => res.status(200).json({});
