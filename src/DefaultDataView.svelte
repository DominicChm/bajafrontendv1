<script>
    export let data = {};
    export let uuid = "";
</script>

<div>
    <pre>{JSON.stringify(data[uuid], null, 2)}</pre>
</div>
