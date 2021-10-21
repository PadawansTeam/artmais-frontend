export class Publicacao {
    constructor(
      public name: string,
      public username: string,
      public userPicture: string,
      public backgroundPicture: string,
      public category: string,
      public subcategory: string,
      public userFacebook: string,
      public userInstagram: string,
      public userTwitter: string,
      public publicationFacebook: string,
      public publicationTwitter: string,
      public publicationWhatsapp: string,
      public s3UrlMedia: string,
      public description: string,
      public publicationDate: Date,
      public comments: [
        {
          name?: string,
          username?: string,
          description?: string,
          commentDate?: Date,
        }
      ],
      public commentsAmount: number,
      public likesAmount: number,
      public isLiked: boolean
      ) {}
}
