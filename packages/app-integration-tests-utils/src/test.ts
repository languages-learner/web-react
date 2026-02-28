import { test as coreTest } from "@languages-learner/app-core-tests-utils";
import { mergeTests } from "@playwright/test";

import { testWithMockedNetwork } from "./fixtures";

export const test = mergeTests(coreTest, testWithMockedNetwork);
