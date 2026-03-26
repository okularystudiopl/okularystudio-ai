export default function handler(req, res) {
  res.status(200).json({
    status: "OK",
    service: "okularystudio-ai",
    time: new Date()
  });
}
