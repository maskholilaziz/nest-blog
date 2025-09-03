export class CreateTagCommand {
  constructor(
    readonly payload: {
      name: string;
    },
  ) {}
}
