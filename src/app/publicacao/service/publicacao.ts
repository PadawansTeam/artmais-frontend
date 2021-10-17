export class Publicacao {
    constructor(
      public userID?: number,
      public publicationID?: number,
      public mediaID?: number,
      public mediaTypeID?: number,
      public s3UrlMedia?: string,
      public description?: string,
      public publicationDate?: Date
      ) {}
}
