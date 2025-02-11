import type { CancelablePromise } from "./core/CancelablePromise"
import { OpenAPI } from "./core/OpenAPI"
import { request as __request } from "./core/request"

import type {
  Body_login_login_access_token,
  Token,
  UserPublic,
  UserRegister,
  Card,
  CardCreate,
  CardList,
  Collection,
  CollectionCreate,
  CollectionList,
  CollectionUpdate,
} from "./models"

export type LoginData = {
  LoginLoginAccessToken: {
    formData: Body_login_login_access_token
  }
}

export type UsersData = {
  UsersRegisterUser: {
    requestBody: UserRegister
  }
}

export type FlashcardsData = {
  FlashcardsReadCollections: {
    limit?: number
    skip?: number
  }
  FlashcardsCreateCollection: {
    requestBody: CollectionCreate
  }
  FlashcardsReadCollection: {
    collectionId: string
  }
  FlashcardsUpdateCollection: {
    collectionId: string
    requestBody: CollectionUpdate
  }
  FlashcardsReadCards: {
    collectionId: string
    limit?: number
    skip?: number
  }
  FlashcardsCreateCard: {
    collectionId: string
    requestBody: CardCreate
  }
  FlashcardsReadCard: {
    cardId: string
    collectionId: string
  }
}

export class LoginService {
  /**
   * Login Access Token
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginLoginAccessToken(
    data: LoginData["LoginLoginAccessToken"],
  ): CancelablePromise<Token> {
    const { formData } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/access-token",
      formData: formData,
      mediaType: "application/x-www-form-urlencoded",
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export class UsersService {
  /**
   * Read User Me
   * Get current user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static usersReadUserMe(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Register User
   * Create new user without the need to be logged in.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static usersRegisterUser(
    data: UsersData["UsersRegisterUser"],
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/signup",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export class FlashcardsService {
  /**
   * Read Collections
   * @returns CollectionList Successful Response
   * @throws ApiError
   */
  public static flashcardsReadCollections(
    data: FlashcardsData["FlashcardsReadCollections"] = {},
  ): CancelablePromise<CollectionList> {
    const { skip = 0, limit = 100 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/flashcards/collections/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Collection
   * @returns Collection Successful Response
   * @throws ApiError
   */
  public static flashcardsCreateCollection(
    data: FlashcardsData["FlashcardsCreateCollection"],
  ): CancelablePromise<Collection> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/flashcards/collections/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Collection
   * @returns Collection Successful Response
   * @throws ApiError
   */
  public static flashcardsReadCollection(
    data: FlashcardsData["FlashcardsReadCollection"],
  ): CancelablePromise<Collection> {
    const { collectionId } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/flashcards/collections/{collection_id}",
      path: {
        collection_id: collectionId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Collection
   * @returns Collection Successful Response
   * @throws ApiError
   */
  public static flashcardsUpdateCollection(
    data: FlashcardsData["FlashcardsUpdateCollection"],
  ): CancelablePromise<Collection> {
    const { collectionId, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/flashcards/collections/{collection_id}",
      path: {
        collection_id: collectionId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Cards
   * @returns CardList Successful Response
   * @throws ApiError
   */
  public static flashcardsReadCards(
    data: FlashcardsData["FlashcardsReadCards"],
  ): CancelablePromise<CardList> {
    const { collectionId, skip = 0, limit = 100 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/flashcards/collections/{collection_id}/cards/",
      path: {
        collection_id: collectionId,
      },
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Card
   * @returns Card Successful Response
   * @throws ApiError
   */
  public static flashcardsCreateCard(
    data: FlashcardsData["FlashcardsCreateCard"],
  ): CancelablePromise<Card> {
    const { collectionId, requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/flashcards/collections/{collection_id}/cards/",
      path: {
        collection_id: collectionId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Card
   * @returns Card Successful Response
   * @throws ApiError
   */
  public static flashcardsReadCard(
    data: FlashcardsData["FlashcardsReadCard"],
  ): CancelablePromise<Card> {
    const { collectionId, cardId } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/flashcards/collections/{collection_id}/cards/{card_id}",
      path: {
        collection_id: collectionId,
        card_id: cardId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
