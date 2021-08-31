import { render, screen } from "@testing-library/react";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("on initial render, the pay button is disabled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: 5 }} />);

  // check if the screen has a button with the name of pay is enabled
  // Add async/await because Formik is used in the component
  // expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();

  // check if the screen has a button with the name of pay is enabled
  // Add async/await because Formik is used in the component
  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
});
