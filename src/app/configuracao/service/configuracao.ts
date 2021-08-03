export class Configuracao {
    constructor(
        public name?: string,
        public username?: string,
        public userPicture?: string,
        public backgroundPicture?: string,
        public birthDate?: Date,
        public mainPhone?: string,
        public secundaryPhone?: string,
        public thirdPhone?: string,
        public oldPassword?: string,
        public newPassword?: string,
        public password?: string,
        public description?: string,
        public userFacebook?: string,
        public userInstagram?: string,
        public userTwitter?: string
    ) { }
}
