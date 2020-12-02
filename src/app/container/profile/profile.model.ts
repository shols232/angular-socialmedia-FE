export class Profile{
    constructor(
        public address: string,
        public bio: string,
        public owner:boolean,
        public first_name:string,
        public last_name: string,
        public username: string,
        public country: string,
        public follows: boolean,
        public post_counts: string,
        public date_of_birth: Date,
        public extra_info: string,
        public followers: number,
        public following: number,
        public id: number,
        public image: string,
        public phone_number: string,
        public state: string,
        public user: number,
        public work_exp: number){}

        public get full_image_url() : string {
            return this.image
        }
}