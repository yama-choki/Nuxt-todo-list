<template>
  <v-app>
    <div class="page mx-16">
      <form @submit.prevent="submitTodo">
        <v-text-field
          v-model="todo"
          :counter="10"
          label="Task"
          required
        />
        <v-btn
          class="mb-5"
          type="submit"
        >
          submit
        </v-btn>
      </form>
      <ul>
        <li
          v-for="(todo, index) in todos"
          :key="todo.id"
          @click="deleteTodo(index)"
        >
          {{ todo.todo }}
        </li>
      </ul>
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      todo: ''
    }
  },
  async fetch ({ store }) {
    await store.dispatch('getTodos')
  },
  computed: {
    todos () {
      return this.$store.getters.todos
    }
  },
  methods: {
    submitTodo () {
      if (this.todo) {
        this.$store.dispatch('submitTodo', this.todo)
        this.todo = ''
      }
    },
    deleteTodo (index) {
      this.$store.dispatch('deleteTodo', this.todos[index].id)
      console.log(index)// eslint-disable-line
    }
  }
}
</script>
