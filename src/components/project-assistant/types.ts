export type WizardData = {
  categories: string[];
  wishes: string;
  postalCode: string;
  city: string;
  objectType: string;
  /** Only meaningful when objectType === "haus". */
  houseSubtype: string;
  areaSqm: string;
  constructionYear: string;
  desiredStart: string;
  budgetRange: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  consent: boolean;
  /** Honeypot — must stay empty. Never rendered as a real field to users. */
  company: string;
};

export const defaultWizardData: WizardData = {
  categories: [],
  wishes: "",
  postalCode: "",
  city: "",
  objectType: "",
  houseSubtype: "",
  areaSqm: "",
  constructionYear: "",
  desiredStart: "",
  budgetRange: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "",
  consent: false,
  company: "",
};

export type LocalImage = {
  id: string;
  previewUrl: string;
  name: string;
};

export type SubmitState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<string, string>>;
    };
