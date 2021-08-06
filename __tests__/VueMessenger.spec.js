// import { expect } from "chai"
// import { shallowMount } from "@vue/test-utils"
// import VueMessenger from "@/src/VueMessenger.vue"

const { expect } = require("chai")
const { shallowMount } = require("@vue/test-utils")
const VueMessenger = require("./../dist/vue-messenger.js")

describe("VueMessenger.vue", () => {
    it("renders props.msg when passed", () => {
        const msg = "Hello World"
        const wrapper = shallowMount(VueMessenger, {
            propsData: { description: msg },
        })
        expect(wrapper.text()).to.include(msg)
    })
})
