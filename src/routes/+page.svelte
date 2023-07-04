<script lang="ts">
	import type { PageData } from './$types';
	import type { SuggestData } from './types';

	export let data: PageData;

	let provinceSelected: number | null;

	let districts: { id: number; name: string }[] = [];
	let districtSelected: number | null;

	let wards: { id: number; name: string }[] = [];
	let wardSelected: number | null;

	let address: string | null;

	$: if (provinceSelected) {
		fetchDistrict();
	}
	const fetchDistrict = async () => {
		const res = await fetch(`/api/district/${provinceSelected}`);
		const data = await res.json();
		districts = data;
		clearDistrict();
	};
	const clearDistrict = () => {
		districtSelected = null;
		wards = [];
		clearWard();
	};

	$: if (districtSelected) {
		fetchWard();
	}
	const fetchWard = async () => {
		const res = await fetch(`/api/ward/${districtSelected}`);
		const data = await res.json();
		wards = data;
		clearWard();
	};
	const clearWard = () => {
		wardSelected = null;
	};

	let q = '';
	let suggest: string[] = [];

	const fetchSuggest = async () => {
		q = q.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
		const res = await fetch(`/api/search?q=${q}`);
		const data = (await res.json()) as SuggestData;
		const { wards, districts, provinces } = data;
		suggest = [
			...wards.map((o) => [o.name, o.district.name, o.province.name].join(', ')),
			...districts.map((o) => [o.name, o.province.name].join(', ')),
			...provinces.map((o) => o.name)
		];
	};
</script>

<div class="flex flex-col w-80 space-y-2 m-auto mt-5">
	<form class="flex flex-col space-y-2">
		<label for="provinceId">Province</label>
		<select id="provinceId" name="provinceId" bind:value={provinceSelected} class="p-2">
			{#each data.provinces as province}
				<option value={province.id}>
					{province.name}
				</option>
			{/each}
		</select>

		<label for="districtId">District</label>
		<select id="districtId" name="districtId" bind:value={districtSelected} class="p-2">
			{#each districts as district}
				<option value={district.id}>
					{district.name}
				</option>
			{/each}
		</select>

		<label for="wardId">Ward</label>
		<select id="wardId" name="wardId" bind:value={wardSelected} class="p-2">
			{#each wards as ward}
				<option value={ward.id}>
					{ward.name}
				</option>
			{/each}
		</select>

		<label for="address">Address</label>
		<input type="text" name="address" id="address" class="p-2 bg-slate-100" bind:value={address} />
	</form>

	<address>
		{[provinceSelected, districtSelected, wardSelected, address].filter((v) => !!v).join(', ')}
	</address>

	<label for="search">search</label>
	<input
		type="search"
		id="search"
		bind:value={q}
		on:input={fetchSuggest}
		class="p-2 bg-slate-100"
	/>
	<ul id="wardId" class="p-2">
		{#each suggest as s}
			<li>
				{s}
			</li>
		{/each}
	</ul>
</div>
