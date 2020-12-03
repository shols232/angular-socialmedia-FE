export class Post{
    constructor(public content: string, public image_content?:File){
    
    }
}

export class PostContent{
    owner: string;
    id: number;
    content: string;
    posted: Date;
    first_three_pics: string[];
    country:string;
    state:string;
    comments_count: number;
    image_content: string;
    likes: string;
    loves: string;
    likes_post: boolean;
    loves_post:boolean;
    parent: any;
    username: string;
    author_pic:string
}