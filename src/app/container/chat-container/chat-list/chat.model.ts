

export class Chat{

    constructor(
        public id: string,
        public last_message_sent: {
            content: string,
            sender_username: string,
            timestamp: Date
        },
        public user: {
            first_name: string,
            last_name: string,
            image_url: string,
            username: string
        }
    ){}

}