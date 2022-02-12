<script>
    export let data = {}
    export let uuid = ""
</script>

<div>
    <meter value={data[uuid]?.analog ?? 0} max="1023" min="0"></meter>
</div>
