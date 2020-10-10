<template>
    <div class="vue-messenger-template">
        <div id="vue-messenger-copyright">
            <!--
                Copyright (c) 2020 Mike Erickson / Codedungeon.  All rights reserved.
                Licensed under the MIT license.  See LICENSE in the project root for license information.
            -->
        </div>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet" />
        <div v-bind="$attrs" v-on="$listeners" v-if="msgOpen && (msgText.length > 0 || msgTitle.length > 0)">
            <transition name="fade" appear>
                <div class="vue-messenger-header-message" :class="msgTypeClass">
                    <span class="vue-messenger-header-message-close" @click="closeMessage">&times;</span>
                    <slot>
                        <div class="vue-messenger-header-message-title">
                            <span v-if="msgTitle.length > 0" :class="msgIconClass"></span>
                            <span class="vue-messenger-header-message-title">{{ msgTitle }}</span>
                        </div>
                        <div class="vue-messenger-header-message-text">
                            <span v-if="msgTitle.length === 0" :class="msgIconClass"></span>
                            <span v-html="msgText"></span>
                            <span v-if="moreMessageText.length > 0">
                                <span v-show="showMoreMessageLink" @click="showMoreMessage">
                                    &nbsp;
                                    <span class="vue-messenger-header-message-more" v-html="msgMoreLinkText"></span>
                                </span>
                                <transition name="fade">
                                    <span v-show="moreMessageOpen" v-html="moreMessageText"></span>
                                </transition>
                            </span>
                        </div>
                    </slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
// import Name from "./Name.vue"
export default {
    name: "vue-messenger",
    components: {},
    props: {
        type: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        text: { type: String, default: "" },
        autoClose: { type: Boolean, default: false },
        autoCloseDelay: { type: [Number, String], default: 7500 },
        more: { type: [Array, String], default: "" },
        moreLinkText: { type: String, default: "show more" },
        icon: { type: [Boolean, String], default: false },
        debug: { type: Boolean, default: false },
    },
    data() {
        return {
            msgTypeOptions: ["alert", "danger", "error", "info", "success", "warning"],
            msgOpen: false,
            msgTitle: "",
            msgType: "",
            msgTypeClass: "",
            msgText: "",
            msgAutoClose: false,
            msgAutoCloseDelay: 7500,
            msgMore: [],
            moreMessage: false,
            moreMessageText: "",
            moreMessageOpen: false,
            showMoreMessageLink: true,
            msgMoreLinkText: "show more",
            msgIcon: false,
            msgIconClass: "",
        }
    },
    methods: {
        updateMessage(data = {}) {
            this.closeMessage()

            this.$nextTick(function () {
                let defaultParams = {
                    type: "info",
                    title: "",
                    text: "",
                    more: "",
                    moreLinkText: "show more",
                    autoClose: false,
                    autoCloseDelay: 7500,
                    icon: false,
                }
                let msgInfo = Object.assign(defaultParams, data)

                if (msgInfo.debug) {
                    console.log("====== VUE MESSENGER DEBUG =====")
                    console.log(this)
                    console.log("====== VUE MESSENGER DEBUG =====")
                }

                if (this.msgType === "default") {
                    this.msgType = "info"
                }

                this.msgType = this.msgTypeOptions.includes(msgInfo.type) ? msgInfo.type : "info"

                this.msgTitle = msgInfo.title
                this.msgText = msgInfo.text

                // if we have only supplied message title, move it to message text
                if (this.msgText.length === 0) {
                    this.msgText = this.msgTitle
                    this.msgTitle = ""
                }
                this.msgMore = msgInfo.more
                this.msgMoreLinkText = msgInfo.moreLinkText
                this.moreMessageText = ""
                this.msgAutoClose = msgInfo.autoClose
                this.msgAutoCloseDelay = parseInt(msgInfo.autoCloseDelay)
                this.msgTypeClass = `vue-messenger-header-message-${this.msgType}`

                this.moreMessage = false
                this.moreMessageText = ""
                if (Array.isArray(this.msgMore)) {
                    if (this.msgMore.length > 0) {
                        this.moreMessageText = "<br/>"
                        let marker = this.getMarker(this.msgType)
                        this.moreMessageText += `<ul class="vue-messenger-more-message-text-list" style="list-style: none; margin-left: 0; padding-left: 0;">`
                        this.msgMore.forEach((item) => {
                            this.moreMessageText += `<li>${marker} ${item}</li>`
                        })
                        this.moreMessageText += "</ul>"
                    }
                } else {
                    if (this.msgMore === null) {
                        this.moreMessageText = ""
                    } else {
                        if (this.msgMore.length > 0) {
                            this.moreMessageText = "<br/><br/>" + this.msgMore
                        }
                        if (this.msgText.length === 0) {
                            this.msgText = this.msgMore
                            this.moreMessageText = ""
                        }
                    }
                }

                this.moreMessage = this.moreMessageText.length > 0
                this.moreMessageOpen = false
                this.showMoreMessageLink = this.moreMessageText.length > 0
                this.msgIcon = msgInfo.icon
                this.msgIconClass = this.msgIcon ? `icon icon-${this.msgType}` : ""

                // all variables set, show the message
                this.msgOpen = true

                if (this.msgAutoClose) {
                    setTimeout(() => {
                        this.closeMessage()
                    }, this.msgAutoCloseDelay)
                }
            })
        },
        showMoreMessage() {
            this.showMoreMessageLink = false
            this.moreMessageOpen = true
        },
        closeMessage() {
            // only toggle if the message is already open
            // simple toggling caused issues with autoClose enabled (for obvious reasons)
            if (this.msgOpen) {
                this.msgOpen = false
            }
        },
        getMarker(type = "info") {
            let marker = "‣"
            switch (type) {
                case "danger":
                case "error":
                    marker = "✖︎"
                    break
                case "success":
                    marker = "✓"
                    break
                case "warning":
                    marker = "﹅"
                    break
                default:
                    marker = "‣"
            }
            return marker
        },
    },
    mounted() {
        if (this.title === "" && this.text === "") {
            this.closeMessage()
        }

        this.msgText = this.text
        this.msgType = this.msgTypeOptions.includes(this.type) ? this.type : "info"
        this.msgTitle = this.title
        this.msgTypeClass = `vue-messenger-header-message-${this.type}`
        this.msgMore = this.more
        this.msgAutoClose = this.autoClose
        this.msgAutoCloseDelay = parseInt(this.autoCloseDelay)

        this.msgOpen = this.msgTitle.length > 0 || this.msgText.length > 0

        if (this.msgAutoClose) {
            setTimeout(() => {
                this.closeMessage()
            }, this.msgAutoCloseDelay)
        }

        this.$on("vue-messenger_MESSAGE_UPDATE", (data) => {
            console.log(data)
        })
    },
}
</script>

<style scoped lang="scss">
.vue-messenger-template {
    font-size: inherit;
    line-height: inherit;
}
.vue-messenger-header-message {
    background-color: #f2f2f3;
    padding: 10px;
    margin: 0;
    color: #85888e;

    &-error {
        background-color: #fceeee;
        color: #ec8b86;
    }

    &-danger {
        background-color: #fceeee;
        color: #ec8b86;
    }

    &-success {
        background-color: #eff7e9;
        color: #80bf5e;
    }
    &-warning {
        background-color: #fcf5ea;
        color: #e4b06e;
    }
}

.vue-messenger-header-message-close {
    float: right;
    color: #c7c7cd;
    padding-top: 2px;
    padding-right: 10px;
    font-size: 15px;
    cursor: pointer;
    opacity: 1;
}

.vue-messenger-header-message-title {
    font-weight: bold;
    padding-bottom: 5px;
}

.vue-messenger-header-message-text {
    line-height: 20px;
}

.vue-messenger-header-message-more {
    text-decoration: underline;
    cursor: pointer;
}

.vue-messenger-more-message-text {
    ul {
        list-style: none;
        line-height: 60px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.icon {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    padding-right: 4px;
}

.icon-warning::before {
    content: "\f06a";
}
.icon-danger::before,
.icon-error::before {
    content: "\f057";
}
.icon-info::before {
    content: "\f05a";
}
.icon-success::before {
    content: "\f058";
}
</style>
