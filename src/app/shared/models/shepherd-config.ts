export const STEPS_BUTTONS = {
  back: {
    classes: "back-button",
    secondary: true,
    text: "Back",
    type: "back",
  },
  cancel: {
    classes: "cancel-button",
    secondary: true,
    text: "Exit",
    type: "cancel",
  },
  next: {
    classes: "next-button",
    text: "Next",
    type: "next",
  },
};

export const defaultStepOptions = {
  classes: "shepherd-theme-arrows custom-default-class",
  scrollTo: { inline: "center", block: "center" },
  // scrollTo: true,
  cancelIcon: {
    enabled: true,
  },
};
