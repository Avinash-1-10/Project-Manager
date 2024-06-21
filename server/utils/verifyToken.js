const verifyToken = async(token)=> {
    return await jwt.verify(token, process.env.JWT_SECRET);
  }

  export default verifyToken;