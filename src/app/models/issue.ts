
export class Issue {
    title: string;
    labels: string[];

    constructor(data){
        this.title = data.title;
        this.labels = data.labels;
    }
}