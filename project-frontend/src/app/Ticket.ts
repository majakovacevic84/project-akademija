
export class Ticket {
    _id: string;
    title:string;
    body:string;
    status:string;
    datum: Date;
    dodijeljen:string;
    documentPath:string;
    akcija:string='Tiket';
    komentar: [{}];

    constructor( _id: string, title:string, body:string, akcija:string,documentPath:string){
        this._id=_id;
        this.title=title;
        this.body=body;
        this.akcija=akcija;
        this.documentPath=documentPath;

    }
}



