import type { PageServerLoad } from './$types';
import { prisma } from '../libs/server';

export const load: PageServerLoad = async () => {
	const provinces = await prisma.province.findMany({
		select: {
			id: true,
			name: true
		}
	});
	return { provinces };
};
