<template>
  <div>
    <KafkaFrame :url="url" />
  </div>
</template>
<script>
  import KafkaFrame from '../modules/kafkaFrame'

  export default {
    components: {
      KafkaFrame,
    },
    data() {
      return {
        url: `${process.env.VUE_APP_KAFKA_IFRAME_URL}/kafka/admin/app`,
      }
    },
    methods: {},
  }
</script>
