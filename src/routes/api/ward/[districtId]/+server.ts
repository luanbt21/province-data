import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '../../../../libs/server';

export const GET: RequestHandler = async ({ params }) => {
	const { districtId } = params;
	const wards = await prisma.ward.findMany({
		where: {
			districtId: parseInt(districtId as string)
		},
		select: {
			id: true,
			name: true
		}
	});
	return json(wards.map(({ id, name }) => ({ id: Number(id), name })));
};
