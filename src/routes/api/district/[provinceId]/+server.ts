import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '../../../../libs/server';

export const GET: RequestHandler = async ({ params }) => {
	const { provinceId } = params;
	const districts = await prisma.district.findMany({
		where: {
			provinceId: parseInt(provinceId as string)
		},
		select: {
			id: true,
			name: true
		}
	});
	return json(districts.map(({ id, name }) => ({ id: Number(id), name })));
};
