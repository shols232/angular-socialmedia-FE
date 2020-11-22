export class User{
    constructor(
        public id:string,
        public username:string,
        public profile_picture:string,
        public first_name: string,
        public last_name: string,
        public token:string,
    ){}
}

export class ChatUser{
    constructor(
        public id: string,
        public username:string,
        public image_url:string,
        public first_name: string,
        public last_name: string,
        public bio:string,
    ){}
}