/* Storybook snapshot tests
 *
 * @group storybook/storyshots
 */

import registerRequireContextHook from "babel-plugin-require-context-hook/register";
import initStoryshots from "@storybook/addon-storyshots";

registerRequireContextHook();
initStoryshots({ configPath: "./config/storybook" });
