<template>
    <div class="container">
        <div class="col-6 offset-3">
            <h1>Tooltip Component with Accessibility</h1>
            <FormComponent />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormComponent from "@/components/Form.vue";

@Component({
    components: {
        FormComponent
    }
})

export default class Registration extends Vue {}
</script>