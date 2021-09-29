interface Cast {
  actor: string;
  actor_id: string;
  character: string;
}
export class Film {
  constructor(
    public id: string,
    public title: string,
    public year: number,
    public length: string,
    public rating: number,
    public rating_votes: number,
    public poster: string,
    public plot: string,
    public cast: Cast[]
  ) {}
}
