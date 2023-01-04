import { Tigris } from "@tigrisdata/core";
import { VideoModel} from "./db/models/video";
import { User } from "./db/models/user";

async function main() {
  // setup client
  const tigrisClient = new Tigris();

  // create collections
  await tigrisClient.registerSchemas([Video, User]);
}

main()
  .then(async () => {
    console.log("Setup complete ...");
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });