import { composeStories } from "@storybook/react";

import * as basePlaceholderContainerStoriesStories from "../__stories__/BasePlaceholderContainer.stories";
import * as placeholderContainerStoriesStories from "../__stories__/PlaceholderContainer.stories";

export const BasePlaceholderContainerStories = composeStories(
    basePlaceholderContainerStoriesStories,
);

export const PlaceholderContainerStories = composeStories(placeholderContainerStoriesStories);
