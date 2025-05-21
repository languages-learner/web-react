import { skipContext } from "@gravity-ui/data-source";

import { getNextPageToken, makeInfiniteQuery } from "@/shared/data-source";
import { sdk } from "@/shared/services/api";

const fetchWords = skipContext(sdk.words.fetchWords);

export const wordsDataSource = makeInfiniteQuery({
    name: "words",
    fetch: fetchWords,
    transformResponse: (response) => {
        return response.words ?? [];
    },
    next: getNextPageToken,
});
