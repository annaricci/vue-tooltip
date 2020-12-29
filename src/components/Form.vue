<template>
    <b-form class="text-left">
        <TooltipInput
            ref="password"
            :typeVal="'password'"
            :idVal="'field-password'"
            :fldLabel="'Password *'"
            :vModel="password"
            :autocompleteVal="'off'"
            :maxlengthVal="'24'"
            :tooltipText="tooltip.password.TooltipAttributes.text"
            :tooltipRules="tooltip.password.TooltipAttributes.rules"
            @changeModelValue="password=$event"            
        />
    </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import TooltipInput from '@/components/TooltipInput.vue';
//import TooltipInputData from '@/components/TooltipData.json';

@Component({
    components: {
        TooltipInput
    }
})

export default class FormComponent extends Vue {
    private password = "";
    private tooltip = {
        "password": {
            "TooltipAttributes": {
                "text": {
                    "headertxt": "Password Requirements",
                    "footertxt": "Please note that passwords are case sensitive"
                },
                "rules": [
                    {
                        "isValid": false,
                        "rule": "Between 8 and 25 characters"
                    },
                    {
                        "isValid": false,
                        "rule": "Contains atleast 3 of the following:",
                        "subRule": [
                            {
                                "rule": "uppercase letter"
                            },
                            {
                                "rule": "lowercase letter"
                            },
                            {
                                "rule": "number"
                            },
                            {
                                "rule": "special character (@, #, etc)"
                            }
                        ]
                    },
                    {
                        "isValid": false,
                        "rule": "Does not contain spaces"
                    }
                ]
            }
        }
    };
    private regexForSpace = /\s/;

    @Watch('password')
        onPasswordChange(value:string) {
            if(value.length > 7 && value.length < 25) {
                this.tooltip.password.TooltipAttributes.rules[0].isValid = true;
            } else {
                this.tooltip.password.TooltipAttributes.rules[0].isValid = false;
            }

            const regexForNumber = /^(?:(?=.*\d).*)$/;
            const regexForUppercase = /^(?:(?=.*[A-Z]).*)$/;
            const regexForLowercase = /^(?:(?=.*[a-z]).*)$/;
            const regexForSpecialChar = /^(?:(?=.*\W).*)$/;
            let regexCounter = 0;

            if(value.length>0) {
                if(regexForNumber.test(value)) {
                    regexCounter++;
                }
                if(regexForUppercase.test(value)) {
                    regexCounter++;
                }               
                if(regexForLowercase.test(value)) {
                    regexCounter++;
                }               
                if(regexForSpecialChar.test(value)) {
                    regexCounter++;
                }

                if(regexCounter>2) {
                    this.tooltip.password.TooltipAttributes.rules[1].isValid = true;
                } else {
                    this.tooltip.password.TooltipAttributes.rules[1].isValid = false;
                }
            }

            if(value.length > 0 && !this.regexForSpace.test(value)) {
                this.tooltip.password.TooltipAttributes.rules[2].isValid = true;
            } else {
                this.tooltip.password.TooltipAttributes.rules[2].isValid = false;
            }

            if(value === '') {
                this.tooltip.password.TooltipAttributes.rules[0].isValid = false;
                this.tooltip.password.TooltipAttributes.rules[1].isValid = false;
                this.tooltip.password.TooltipAttributes.rules[2].isValid = false;
            }
        }
    }
</script>   