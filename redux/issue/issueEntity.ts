export class IssueEntity {
  id?: number;
  constructor(public subject: string, public description: string, public imageUrl: string) {}
}
