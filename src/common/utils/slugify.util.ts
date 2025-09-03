/**
 * Buat slug:
 * - trim whitespace
 * - lowercase
 * - ganti spasi/underscore/beruntun menjadi satu '-'
 * - hapus non alphanumeric kecuali '-'
 * - hapus '-' di awal/akhir
 */
export function slugify(input: string): string {
  if (!input) return '';
  return input
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFKD') // pecah diakritik
    .replace(/[\u0300-\u036f]/g, '') // hapus diakritik
    .replace(/[_\s]+/g, '-') // spasi/underscore -> '-'
    .replace(/[^a-z0-9-]/g, '') // buang selain a-z0-9-
    .replace(/-+/g, '-') // gabung '--' jadi '-'
    .replace(/^-+|-+$/g, ''); // trim '-' pinggir
}
