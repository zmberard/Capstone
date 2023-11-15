//Check if User is Advisor
async function advisorOnly(req, res, next) {
    if (req.is_admin) {
      next()
    } else {
      res.status(403)
      res.json({ error: 'Advisors Only' })
    }
  }
  
  module.exports = advisorOnly