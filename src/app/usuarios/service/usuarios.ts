export class Usuarios {
    constructor(
        public userId: number,
        public name: string,
        public username: string,
        public userPicture: string,
        public backgroundPicture: string,
        public category: string,
        public subcategory: string
    ) { }
}
