<template>
  <section>
    <v-app>
      <main>
        <div class="form mx-16">
          <form @submit.prevent="add">
            <v-text-field
              v-model="name"
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
          <!-- <form @submit.prevent="add">
            <input v-model="name" type="text">
            <button>Add</button>
          </form> -->
          <ul>
            <li v-for="todo in todos" :key="todo.id">
              <v-card
                v-if="todo.created"
                max-width="600"
                outlined
                class="mb-3"
              >
                <div class="task">
                  <div class="checkbox">
                    <v-card-actions>
                      <v-checkbox
                        v-bind="todo.done"
                        @change="toggle(todo)"
                      />
                    </v-card-actions>
                  </div>
                  <div class="text">
                    {{ todo.name }}:{{ todo.created.toDate() | dateFilter }}
                  </div>
                  <div class="remove">
                    <v-card-actions>
                      <v-btn
                        color="primary lighten-2"
                        @click="remove(todo.id)"
                      >
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </div>
                </div>
              </v-card>
            </li>
          </ul>
        </div>
      </main>
    </v-app>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      name: '',
      done: false
    }
  },
  created () {
    this.$store.dispatch('todos/init')
  },
  methods: {
    add () {
      this.$store.dispatch('todos/add', this.name)
      this.name = ''
    },
    remove (id) {
      this.$store.dispatch('todos/remove', id)
    },
    toggle (todo) {
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    todos () {
      // return this.$store.state.todos.todos
      return this.$store.getters['todos/sortedTodos']
    }
  },
  // eslint-disable-next-line vue/order-in-components
  filters: {
    dateFilter (date) {
      // eslint-disable-next-line no-undef
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>
main{
  margin-top: 64px;
}
.task {
  display:flex
}

.remove{
  margin-left: auto;
}

ul > li {
  list-style: none;
}
</style>
