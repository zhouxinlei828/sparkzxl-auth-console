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
        url: `${process.env.VUE_APP_JOB_IFRAME_URL}/xxl-job-admin/joblog`,
      }
    },
    methods: {},
  }
</script>
