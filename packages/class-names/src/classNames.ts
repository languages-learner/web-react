import { withNaming } from "@bem-react/classname";

import classnames from "classnames";
import type { ArgumentArray } from "classnames";

export const classNames: (...args: ArgumentArray) => string = classnames;

export const block = withNaming({ e: "__", m: "_" });
