<template>
  <table class="w-full mt-8">
    <thead>
      <tr>
        <th
          v-for="(column, index) in columns"
          :key="index"
          :class="
            `${
              column.styleHead
            } font-semibold bg-gray-300 text-14px px-4 py-4 text-gray-700 ${index ===
              0 && 'rounded-l-lg'} ${index === columns.length - 1 &&
              'rounded-r-lg'}`
          "
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody v-if="data.length > 0">
      <tr
        v-for="(item, index) in data"
        :key="index"
        @click="(isDetailable) ? onClick(item): () => {}"
        :class="`${isDetailable && 'cursor-pointer'} hover:bg-gray-100 justify-start items-start`"
      >
        <td
          v-for="(column, indexColumn) in columns"
          :key="indexColumn"
          class="px-4 py-6 xl:py-6 text-14px border-b border-gray-300"
        >
          <div v-html="column.render(item, index)"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { PropType } from "vue";
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    columns: {
      default: [],
      type: Array
    },
    data: {
      default: [],
      type: Array
    },
    onClick: {
      default: Function as PropType<() => void>,
      type: Function
    },
    isDetailable: {
      type: Boolean,
      default: false
    }
  }
})
export default class Table extends Vue {
}
</script>