import type { Actions } from '@sveltejs/kit';
import { read, utils } from 'xlsx';
import { prisma } from '../../libs/server';
import { writeFileSync } from 'fs';

export interface Province {
	'ID Tỉnh thành': number;
	'Tên tỉnh thành': string;
}

export interface District {
	'ID quận huyện': number;
	'ID tỉnh thành': number;
	'Đơn vị': string;
	'Tên Quận huyện': string;
	'Tên đầy đủ': string;
}

export interface Ward {
	'ID Phường xã': number;
	'ID tỉnh thành': number;
	'ID Quận huyện': number;
	'Đơn vị': string;
	'Tên Phường xã': string;
}

export const actions: Actions = {
	default: async ({ request }) => {
		const body = await request.formData();
		const file = body.get('file') as File;

		const wb = read(await file.arrayBuffer(), {});

		const province = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) as Province[];
		const district = utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]]) as District[];
		const ward = utils.sheet_to_json(wb.Sheets[wb.SheetNames[2]]) as Ward[];

		const [provinceCount, districtCount, wardCount] = await prisma.$transaction([
			prisma.province.createMany({
				data: province.map((p) => ({
					id: p['ID Tỉnh thành'],
					name: p['Tên tỉnh thành']
				})),
				skipDuplicates: true
			}),

			prisma.district.createMany({
				data: district.map((d) => ({
					id: d['ID quận huyện'],
					provinceId: d['ID tỉnh thành'],
					name: d['Tên Quận huyện'],
					fullName: d['Tên đầy đủ'],
					unit: d['Đơn vị']
				})),
				skipDuplicates: true
			}),

			prisma.ward.createMany({
				data: ward.map((w) => ({
					id: w['ID Phường xã'],
					provinceId: w['ID tỉnh thành'],
					districtId: w['ID Quận huyện'],
					name: String(w['Tên Phường xã']),
					unit: w['Đơn vị']
				})),
				skipDuplicates: true
			})
		]);

		return { provinceCount, districtCount, wardCount };
	}
};
