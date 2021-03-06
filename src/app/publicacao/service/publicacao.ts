export class Publicacao {
    constructor(
      public userId: number,
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
      public mediaType: string,
      public comments: [
        {
          commentID?: number,
          name?: string,
          username?: string,
          userPicture?: string,
          description?: string,
          commentDate?: Date,
          answers?: [
            {
              answerID?: number,
              name?: string,
              username?: string,
              userPicture?: string,
              description?: string,
              answerDate: Date
            }
          ]
        }
      ],
      public commentsAmount: number,
      public likesAmount: number,
      public isLiked: boolean,
      public isPremium: boolean
      ) {}
}
