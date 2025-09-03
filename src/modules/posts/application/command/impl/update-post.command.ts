export class UpdatePostCommand {
  constructor(
    readonly id: string,
    readonly payload: Partial<{
      title: string;
      slug: string;
      content: string;
      categoryId: string;
      tagIds: string[];
    }>,
  ) {}
}
