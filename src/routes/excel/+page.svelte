<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<form action="" method="post" use:enhance>
	<input
		type="file"
		name="file"
		accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
	/>
	<button type="submit">Upload</button>
</form>

{#if form}
	<pre>{JSON.stringify(form)}</pre>
{/if}
