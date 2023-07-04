import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '../../../libs/server';
import type { Prisma } from '@prisma/client';

export const GET: RequestHandler = async ({ url }) => {
	let q = url.searchParams.get('q') ?? '';
	q = q.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

	const name = {
		contains: q,
		mode: 'insensitive'
	} satisfies Prisma.StringFilter;

	const select = { id: true, name: true };

	const take = 5;

	let [wards, districts, provinces] = await Promise.all([
		prisma.ward.findMany({
			where: { name },
			select: {
				...select,
				district: { select },
				province: { select }
			},
			take
		}),
		prisma.district.findMany({
			where: { name },
			select: {
				...select,
				province: { select }
			},
			take
		}),
		prisma.province.findMany({
			where: { name },
			select,
			take
		})
	]);

	return json({ wards, districts, provinces });
};
