export class UpdateCategoryCommand {
  constructor(
    readonly id: string,
    readonly payload: {
      name?: string;
      slug?: string;
      description?: string | null;
    },
  ) {}
}
