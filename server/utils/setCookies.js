const setCookies = (res, token) => {
    res.cookie("projex_token", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
}


export default setCookies;