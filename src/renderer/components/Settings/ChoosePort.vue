<template lang="pug">
md-list.choose-port
  md-subheader Serial Port: {{PortName}}
  md-list-item(v-for="port in port_list", :key='port.comName')
    md-radio(v-model='PortName', :value='port.comName')
      span.md-list-item-text {{port.comName}}
</template>

<script>
import SerialPort from "serialport";
import { mapActions, mapState } from "vuex";

export default {
  name: "PortList",
  data() {
    return {
      port_list: []
    };
  },
  computed: {
    ...mapState({
      port_name: state => state.Settings.port_name
    }),
    PortName: {
      get() {
        return this.port_name;
      },
      set(val) {
        return this.changePort(val);
      }
    }
  },
  methods: {
    ...mapActions(["changePort"])
  },
  async mounted() {
    this.port_list = await SerialPort.list();
  }
};
</script>
