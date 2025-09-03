export class UpdateTagCommand {
  constructor(
    readonly id: string,
    readonly payload: {
      name?: string;
      slug?: string;
    },
  ) {}
}
