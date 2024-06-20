const setCookies = (res, token) => {
    res.cookie("projex_token", token, {
        httpOnly: true,
        secure: true,
    });
}


export default setCookies;