export class CreatePostCommand {
  constructor(
    readonly payload: {
      title: string;
      slug?: string; // opsional; jika kosong, handler akan slugify(title)
      content: string;
      categoryId: string;
      tagIds?: string[]; // opsional
    },
  ) {}
}
