<template>
    <div id="app">
        <div class="header">
            <vue-messenger
                ref="vue-messenger"
                :debug="true"
                type="error"
                :icon="true"
                title="title"
                description="message description"
                :more="['item 1', 'item 2']"
                @closeMessage="handleCloseMessage"
            ></vue-messenger>
        </div>
        <div id="vue-messenger-demo">
            <br />
            <span class="toolbar">
                <input type="checkbox" v-model="icon" />
                Icon
                <input type="checkbox" v-model="debug" />
                Debug (view console)
                <br />
                <br />
                <button @click="titleMessageOnly('info')">Title Message Only</button>
                <button @click="textMessageOnly('info')">Text Message Only</button>
                <button @click="updateMessage('info')">Info Message</button>
                <button @click="updateMessage('success')">Success Message</button>
                <button @click="updateMessage('warning')">Warning Message</button>
                <button @click="updateMessage('error')">Error Message</button>
                <button @click="updateMessage('danger')">Danger Message</button>
                <br />
                <br />
                <button @click="updateMessage('success', 'more message terxt')">Success Message w/ More Text</button>
                <button @click="updateMessage('success', ['item 1', 'item 2'])">Success Message w/ More</button>
                <button @click="updateMessage('danger', ['item 1', 'item 2'])">Danger Message w/ More</button>
                <button @click="updateMessage('error', ['item 1', 'item 2'])">Error Message w/ More</button>
                <button @click="updateMessage('info', ['item 1', 'item 2'])">Info Message w/ More</button>
                <button @click="updateMessage('warning', ['item 1', 'item 2'])">Warning Message w/ More</button>
            </span>
        </div>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    </div>
</template>

<script>
import VueMessenger from "./components/VueMessenger.vue"

export default {
    name: "App",
    components: { VueMessenger },
    data() {
        return {
            icon: false,
            debug: false,
        }
    },
    methods: {
        handleCloseMessage() {
            console.log("close messasge event")
        },
        titleMessageOnly(type = "default") {
            this.$refs["vue-messenger"].updateMessage({ type, title: "Title", icon: this.icon, debug: this.debug })
        },
        textMessageOnly(type = "default") {
            this.$refs["vue-messenger"].updateMessage({ type, description: "Text Only", icon: this.icon, debug: this.debug })
        },
        updateMessage(type = "info", more = null) {
            this.$refs["vue-messenger"].updateMessage({
                type,
                title: "Message Title",
                description: "Message Description",
                more,
                moreLinkdescription: "click me",
                icon: this.icon,
                debug: this.debug,
            })
        },
    },
}
</script>

<style lang="scss">
body,
html {
    padding: 0;
    margin: 0;
    font-size: 12px;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 1.5rem;
    // margin-top: 60px;
}

.header {
    padding: 0;
    font-size: 1.2rem;
    margin-top: 0px;
    text-align: left;
}

.toolbar {
}

button {
    margin-right: 10px;
    // width: 120px;
}
</style>
