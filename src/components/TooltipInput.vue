<template>
    <div>
        <b-form-group
            :label="fldLabel"
            :label-for="fldId"
            :class="(fldId + '-wrapper')"
        >
            <b-form-input
                :type="fldType"
                :id="fldId"
                required
                v-model="modelData"
                :placeholder="placeholderVal"
                :autocomplete="autocompleteVal"
                :maxlength="maxlengthVal"
            ></b-form-input>
            <b-tooltip :target="fldId" triggers="focus" no-fade placement="bottom">
                <p v-if="tooltipRules !== '' && tooltipRulesObj === ''">{{tooltipRules}}</p>
                <template v-if="tooltipRulesObj !== ''">
                    <h3 v-if="tooltipText && tooltipText.headertxt">{{tooltipText.headertxt}}</h3>
                    <ul class="validation">
                        <li v-for="list in tooltipRulesObj" :key="list.rule" :class="{'valid': list.isValid}"  >
                            <span class="sr-only" v-if="modelData.length>0 && list.isValid">Passed rule, </span>
                            <span class="sr-only" v-if="modelData.length>0 && !list.isValid">Failed rule, </span>
                            {{list.rule}}
                            <ul v-if="list.subRule && list.subRule.length>0">
                                <li v-for="subList in list.subRule" :key="subList.rule" >
                                    {{subList.rule}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p class="tooltip-info" v-if="tooltipText && tooltipText.footertxt">{{tooltipText.footertxt}}</p>
                </template>
            </b-tooltip>
        </b-form-group>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

    @Component

    export default class TooltipInput extends Vue {
        @Prop(String) readonly typeVal!: string;
        @Prop(String) readonly idVal!: string;
        @Prop(String) readonly fldLabel!: string;
        @Prop() vModel!: string;
        @Prop(String) readonly placeholderVal!: string;
        @Prop(String) readonly autocompleteVal!: string;
        @Prop(String) readonly maxlengthVal!: string;
        @Prop() readonly tooltipRules!: string;
        @Prop(String) readonly validRules!: string;
        @Prop(String) readonly validName!: string;
        @Prop() readonly tooltipText!: string;

        private fldType: any = this.typeVal? this.typeVal : "text";
        private fldId: any = this.idVal? this.idVal : "fieldId";
        public modelData: any = this.vModel? this.vModel : "";
        private tooltipRulesObj = typeof this.tooltipRules === "object"? this.tooltipRules : "";

        @Watch('modelData')
            onModelDataChange(value:string){
                this.$emit('changeModelValue', value);
            }
    }
</script>

<style lang="scss" >
    .tooltip {
        .tooltip-inner {
            background: #fff !important;
            border: 1px solid #ccc !important;
            color: #000 !important;
            h3 {
                font-size: 1.25rem;
            }
            ul {
                padding-left: 15px;
                text-align: left;
            }
            .valid {
                color: green;
            }
        }
    }
</style>