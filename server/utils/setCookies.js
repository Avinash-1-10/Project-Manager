const setCookies = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
    });
}


export default setCookies;