const espress = require("espress");
const router = exress.Router();

router.get("/test/", (req, res) => {
  res.json({ msg: "This is the quotes route" });
});

module.exports = router;
