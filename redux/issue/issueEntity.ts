export class IssueEntity {
  constructor(
    public subject: string,
    public description: string,
    public imageUrl?: string,
    public userId?: number,
    public categoryId?: number,
    public id?: number
  ) {}
}
