export type Result =
  | {
      success: false;
      errors?: Record<string, string>;
      message?: string;
    }
  | {
      success: true;
    };
