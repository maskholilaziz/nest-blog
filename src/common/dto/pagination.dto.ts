export class PaginationDto {
  constructor(
    readonly current: number,
    readonly total: number,
  ) {}
}