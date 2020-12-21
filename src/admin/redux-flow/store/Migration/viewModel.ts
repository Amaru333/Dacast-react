import { GetJobsListOutput } from "../../../../DacastSdk/admin";
import { JobInfo } from "./types";

export const formatGetJobsListOutput = (data: GetJobsListOutput): JobInfo[] => data.jobs