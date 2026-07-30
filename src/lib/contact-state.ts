/**
 * Shape of the contact form result.
 * Lives outside the "use server" module, which may only export async functions.
 */

export type ContactFieldName = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Message shown next to the submit button. */
  message?: string;
  errors?: Partial<Record<ContactFieldName, string>>;
  /**
   * Echoed back on failure and fed to the inputs as defaultValue.
   * React resets an uncontrolled form after every action, so without this the
   * visitor would lose what they typed whenever the send fails.
   */
  values?: Record<ContactFieldName, string>;
};

export const initialContactState: ContactState = { status: "idle" };
