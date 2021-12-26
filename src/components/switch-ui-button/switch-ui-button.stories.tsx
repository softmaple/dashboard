import { useState } from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SwitchUIButton } from "./switch-ui-button";

export default {
  component: SwitchUIButton,
} as ComponentMeta<typeof SwitchUIButton>;

export const Primary: ComponentStory<typeof SwitchUIButton> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <SwitchUIButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
  );
};
