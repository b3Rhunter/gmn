const ethers = require("ethers");

const getProvider = () => {
  return new ethers.providers.StaticJsonRpcProvider(process.env.PROVIDER);
};

const userHasToken = async (address) => {
  const tokenAddress = process.env.TOKEN;
  const abi = [
    "function balanceOf(address _owner) external view returns (uint256)",
  ];

  const tokenContract = new ethers.Contract(tokenAddress, abi, getProvider());

  const balance = await tokenContract.balanceOf(address);

  return balance.gt(0);
};



const verifyUser = async (req, res, next) => {

  try {
    const hasToken = await userHasToken(address);

    if (!hasToken) {
      throw new Error(`You're not a GMN holder`);
    }
  } catch (err) {
    console.log(err);

    return res
      .status(401)
      .send(err.message || "Try Again");
  }
  return next();
};

module.exports = {
  userHasToken,
  verifyUser,
};
