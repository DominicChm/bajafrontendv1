<script>
    import {FormGroup, NumberInput} from "carbon-components-svelte";

    export let config;
</script>

<FormGroup>
    <NumberInput
            label="(CAL) Analog 0"
            bind:value={config.minVoltage}
            helperText="The analog reading that corresponds to 0 pressure"
            on:input
    />
</FormGroup>

<FormGroup>
    <NumberInput
            label="(CAL) Psi per reading"
            bind:value={config.psiPerVolt}
            helperText="Number of PSI per analog reading tick"
            on:input
    />
</FormGroup>

<FormGroup>
    <NumberInput
            label="Replicated (test)"
            bind:value={config.replicated}
            helperText="Not a real field - just here to test data replication"
            on:input
    />
</FormGroup>
