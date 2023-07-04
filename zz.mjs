import { read, utils } from 'xlsx';
const wb = read('Addresses.xlsx', { type: 'file' });

const ws1 = wb.Sheets[wb.SheetNames[1]];
const districtIDs = utils.sheet_to_json(ws1).map((e) => e['ID quận huyện']);

const ws2 = wb.Sheets[wb.SheetNames[2]];
const ward = utils.sheet_to_json(ws2);

for (let i = 0; i < ward.length - 1; i++) {
	if (!districtIDs.includes(ward[i]['ID Quận huyện'])) {
		console.log(ward[i]);
	}
}
