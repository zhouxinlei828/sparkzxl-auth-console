<template>
  <div>
    <JobFrame :url="url" />
  </div>
</template>
<script>
  import JobFrame from './modules/jobFrame'
  export default {
    components: {
      JobFrame,
    },
    data() {
      return {
        url: '/xxl-job-admin/joblog',
      }
    },
    methods: {},
  }
</script>
