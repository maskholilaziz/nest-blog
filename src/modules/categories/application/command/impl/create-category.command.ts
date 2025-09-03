export class CreateCategoryCommand {
  constructor(
    readonly payload: {
      name: string;
      description?: string | null;
    },
  ) {}
}
