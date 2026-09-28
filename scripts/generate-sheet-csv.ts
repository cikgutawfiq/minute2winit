import { writeFileSync } from "fs";
import { ACTIVITIES } from "../src/data/activities";
import { activitiesToCsv } from "../src/lib/sheet";

const csv = activitiesToCsv(ACTIVITIES);
writeFileSync("minute2winit-seed.csv", csv, "utf-8");
console.log(`Wrote ${ACTIVITIES.length} activities to minute2winit-seed.csv`);
