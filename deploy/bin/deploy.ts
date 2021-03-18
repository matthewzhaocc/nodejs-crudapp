#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { Database } from "../lib/db";

const app = new cdk.App();
new Database(app, "DeployStack", process.env.TABLE_NAME as string);
