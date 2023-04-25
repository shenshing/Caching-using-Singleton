import firstCache from "./first-consumer.js";
import secondCache from "./second-consumer.js";

await firstCache();
await secondCache();