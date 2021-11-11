export class Recommendation {
    constructor(
        public userId: number,
        public username: string,
        public userPicture: string,
        public backgroundPicture: string,
        public category: string,
        public subcategory: string,
        public name: string,
        public isPremium: boolean
    ) { }
}
