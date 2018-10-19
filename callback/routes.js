const router = require("express").Router();

router.post("/webhook", (req, res, next) => {
  console.log("webhook/POST");

  // payload received at body
  if (req.body) {
    console.log("webhook/POST body =>", req.body);
    res.end();
    next();
    return;
  }

  // payload received as stream
  let incoming = "";
  req.on("data", data => {
    const texto = data.toString();
    incoming += texto;
  });

  req.on("end", () => {
    try {
      console.log("webhook/POST received =>", incoming);
      res.end();
      next();
      return;
    } catch (e) {
      console.log("webhook/ERROR =>", e.message);
      res.status(500).send(e.message);
    }
  });

  req.on("error", error => {
    console.error("webhook/Error =>", error);
  });
});

module.exports = router;
