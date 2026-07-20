import { parse, isBefore } from 'date-fns';

export function getBlogPosts() {
	return Object.values(import.meta.glob('/src/pages/blog/posts/*.mdx', { eager: true }))
		.map(({ frontmatter, url }) => ({
			...frontmatter,
			publishDate: parse(frontmatter.publishDate, 'MMMM d, yyyy', new Date()),
			url,
		}))
		.sort((a, b) => {
			if (isBefore(a.publishDate, b.publishDate)) return 1;
			if (isBefore(b.publishDate, a.publishDate)) return -1;
			return 0;
		});
}
