export interface SuggestData {
	wards: Ward[];
	districts: District[];
	provinces: Province[];
}

export interface Ward {
	id: number;
	name: string;
	district: District;
	province: Province;
}

export interface District {
	id: number;
	name: string;
	province: Province;
}

export interface Province {
	id: number;
	name: string;
}
