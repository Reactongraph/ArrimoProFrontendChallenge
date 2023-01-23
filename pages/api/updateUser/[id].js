import connectMongo from "../../../database/connectMongo";
import { updateUser } from "../../../database/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "error in connection" })
  );

  const { method } = req;
  switch (method) {
    case "PATCH":
      updateUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} not allowed`);
  }
}
