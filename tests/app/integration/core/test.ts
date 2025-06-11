import { mergeTests } from "@playwright/test";

import { testWithMockedNetwork } from "./fixtures";

import { test as coreTest } from "@/tests/app/core";

export const test = mergeTests(coreTest, testWithMockedNetwork);
