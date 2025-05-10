export const HTTP_WRONG_METHOD = (req, res) => {
    res.status(405).json({
        message: 'HTTP METHOD NOT ALLOWED'
    })
}