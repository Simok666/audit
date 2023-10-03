<template>
  <th v-if="isHeader">{{title}}</th>
  <td v-else class="custom-actions">
    <b-btn v-if="rowField.isShow" class="btn btn-outline-info btn-sm mr-1 mt-1"
      @click="onAction('view-item', rowData, rowField)">
      <i class="ion ion-ios-eye"></i> Show
    </b-btn>
    <b-btn v-if="rowField.isEdit" class="btn btn-outline-secondary btn-sm mr-1 mt-1"
      @click="onAction('edit-item', rowData, rowField)">
      <i class="ion ion-md-create"></i> Edit
    </b-btn>
    <b-btn v-if="rowField.isDelete" class="btn btn-outline-danger btn-sm mr-1 mt-1"
      @click="onAction('delete-item', rowData, rowField)">
      <i class="ion ion-md-trash"></i> Delete
    </b-btn>
  </td>
</template>

<script>

import VuetableFieldMixin from 'vuetable-2/src/components/VuetableFieldMixin'

export default {
  name: 'button-actions',
  mixins: [VuetableFieldMixin],
  methods: {
    onAction (action, data, field) {
      // console.log('slot) action: ' + action, data, field)
      if(action=='view-item'){
        this.$router.push({
          name: field.showUrl,
          params: {
            Id: data.id,
          }
        })
      }

      if(action=='edit-item'){
        this.$router.push({
          name: field.editUrl,
          params: {
            isFormEdit: true,
            Id: data.id,
          }
        })
      }

      if(action=='delete-item'){
        this.deleteData(field.deleteUrl, data.id, this.vuetable)
      }
    },
  }
}
</script>