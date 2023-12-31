/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/institutions": {
    /**
     * Read Institutions
     * @description Read all available institutions for user to connect into
     */
    get: operations["read_institutions_api_institutions_get"];
  };
  "/api/users/{user_id}": {
    /**
     * Read User
     * @description Read all available institutions for user to connect into
     */
    get: operations["read_user_api_users__user_id__get"];
  };
  "/api/users/{user_id}/connected_institutions": {
    /**
     * Read User Connected Institutions
     * @description Read all institutions the user is associated into
     */
    get: operations["read_user_connected_institutions_api_users__user_id__connected_institutions_get"];
  };
  "/": {
    /** Read Root */
    get: operations["read_root__get"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** CodefFinancialInstitution */
    CodefFinancialInstitution: {
      /** Id */
      id: string;
      /** Name */
      name: string;
      /** Isconnected */
      isConnected: boolean;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** Institution */
    Institution: {
      /** Id */
      id: string;
      /** Name */
      name: string;
    };
    /** ReadInstitutionsResponse */
    ReadInstitutionsResponse: {
      /** Data */
      data: components["schemas"]["Institution"][];
    };
    /** ReadUserConnectedInstitutionsResponse */
    ReadUserConnectedInstitutionsResponse: {
      /** Data */
      data: components["schemas"]["CodefFinancialInstitution"][];
    };
    /** ReadUserResponse */
    ReadUserResponse: {
      data: components["schemas"]["User"];
    };
    /** User */
    User: {
      /** Credit */
      credit: number;
      /** Displayname */
      displayName?: string | null;
      /** Phonenumber */
      phoneNumber?: string | null;
      /** Profilepicture */
      profilePicture?: string | null;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /**
   * Read Institutions
   * @description Read all available institutions for user to connect into
   */
  read_institutions_api_institutions_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ReadInstitutionsResponse"];
        };
      };
    };
  };
  /**
   * Read User
   * @description Read all available institutions for user to connect into
   */
  read_user_api_users__user_id__get: {
    parameters: {
      path: {
        user_id: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ReadUserResponse"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Read User Connected Institutions
   * @description Read all institutions the user is associated into
   */
  read_user_connected_institutions_api_users__user_id__connected_institutions_get: {
    parameters: {
      path: {
        user_id: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ReadUserConnectedInstitutionsResponse"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Read Root */
  read_root__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
}
