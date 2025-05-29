const axios = require('axios');

const register = async () => {
  try {
    // const regRes = await axios.post('http://20.244.56.144/evaluation-service/register', {
    //   email: "shubham.sy004@gmail.com",
    //   name: "Shubham Yadav",
    //   mobileNo: "6306935254",
    //   githubUsername: "sshubham248",
    //   rollNo: "2200460100106",
    //   collegeName: "Maharana Pratap Engineering College",
    //   accessCode: "nrmvBN"
    // });

    // const { clientID, clientSecret } = regRes.data;
    // console.log("Registered Successfully!");
    // console.log("Client ID:", clientID);
    // console.log("Client Secret:", clientSecret);
    const clientID = "3e3cc1eb-ee70-4255-882f-da019dd3ede5";
    const clientSecret = "XzMhcHpzrzPPUSjJ";
    const authRes = await axios.post('http://20.244.56.144/evaluation-service/auth', {
        email : "shubham.sy004@gmail.com",
        name : "Shubham Yadav",
        rollno : "2200460100106",
        accessCode : "nrmvBN",
      clientID,
      clientSecret
    });

    const token_type = authRes.data.token_type;
    const access_Token = authRes.data.access_Token;
    console.log("Auth Token:", token);

    return { token_type, access_Token };
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

// Call register inside an async wrapper
(async () => {
  const creds = await register();
  if (creds) {
    console.log("Returned Credentials:", creds);
  }
})();

module.exports = {creds.token_type, creds.access_Token};
