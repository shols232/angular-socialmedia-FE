export class Comment{
    constructor(
        public id: string,
        public replies: number,
        public author: {
            username:string,
            first_name: string,
            last_name:string,
            id: string,
            image_url: string
        },
        public content: string,
        public created: Date
    ){}
}